const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const { isMongoConnected, readDiskData, writeDiskData } = require('../utils/storage');
const { verifyHoneypot, sanitizeInput } = require('../middleware/security');

// Helper to handle validation errors uniformly
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

// Helper to save a submission to MongoDB or Disk Fallback with security metadata
const saveSubmission = async (submissionData, req) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  // Sanitize all text fields in payload
  const sanitized = {};
  for (const [key, value] of Object.entries(submissionData)) {
    sanitized[key] = typeof value === 'string' ? sanitizeInput(value) : value;
  }

  const payload = {
    ...sanitized,
    ipAddress: sanitizeInput(ipAddress.toString()),
    userAgent: sanitizeInput(userAgent.toString().substring(0, 300)),
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (isMongoConnected()) {
    try {
      const doc = new Submission(payload);
      return await doc.save();
    } catch (err) {
      console.warn('MongoDB save failed, falling back to disk storage:', err.message);
    }
  }

  // Disk fallback
  const items = readDiskData('submissions');
  const id = 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const diskItem = { _id: id, id, ...payload };
  items.unshift(diskItem);
  writeDiskData('submissions', items);
  return diskItem;
};

// 1. Submit Request Quote (with Honeypot & Strict Validation)
router.post(
  '/quote',
  verifyHoneypot,
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid business email address.')
      .normalizeEmail(),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters.')
      .escape(),
    body('fullName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters.')
      .escape(),
    body('phone')
      .optional()
      .trim()
      .isLength({ max: 25 })
      .withMessage('Phone number is too long.')
      .escape(),
    body('service').optional().trim().isLength({ max: 150 }).escape(),
    body('budget').optional().trim().isLength({ max: 100 }).escape(),
    body('timeline').optional().trim().isLength({ max: 100 }).escape(),
    body('company').optional().trim().isLength({ max: 150 }).escape(),
    body('message').optional().trim().isLength({ max: 5000 }).withMessage('Message cannot exceed 5000 characters.').escape(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, fullName, email, phone, countryCode, service, budget, message, timeline, company } = req.body;
      const clientName = (name || fullName || '').trim();

      if (!clientName) {
        return res.status(400).json({
          success: false,
          message: 'Client name is required.',
        });
      }

      const saved = await saveSubmission(
        {
          type: 'quote',
          name: clientName,
          email,
          phone: phone || '',
          countryCode: countryCode || '+91',
          service: service || 'Custom Software Development',
          budget: budget || 'Flexible',
          timeline: timeline || 'Immediate',
          company: company || '',
          message: message || 'Request for project scoping and quotation.',
          priority: budget && budget.includes('Enterprise') ? 'high' : 'medium',
        },
        req
      );

      res.status(201).json({
        success: true,
        message: 'Your project quote request has been received securely. Our principal architects will review and reach out within 4 business hours.',
        data: { id: saved._id || saved.id, name: saved.name, email: saved.email, createdAt: saved.createdAt },
      });
    } catch (error) {
      console.error('Error submitting quote:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit quote request. Please connect directly at nexoralabtechnologies@gmail.com.',
      });
    }
  }
);

// 2. Submit Contact Inquiry (with Honeypot & Strict Validation)
router.post(
  '/contact',
  verifyHoneypot,
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required.')
      .isLength({ min: 5, max: 5000 })
      .withMessage('Message must be between 5 and 5000 characters.')
      .escape(),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters.')
      .escape(),
    body('fullName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters.')
      .escape(),
    body('phone')
      .optional()
      .trim()
      .isLength({ max: 25 })
      .withMessage('Phone number is too long.')
      .escape(),
    body('company').optional().trim().isLength({ max: 150 }).escape(),
    body('service').optional().trim().isLength({ max: 150 }).escape(),
    body('budget').optional().trim().isLength({ max: 100 }).escape(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, fullName, email, phone, countryCode, company, service, budget, message } = req.body;
      const clientName = (name || fullName || '').trim();

      if (!clientName) {
        return res.status(400).json({
          success: false,
          message: 'Name is required.',
        });
      }

      const saved = await saveSubmission(
        {
          type: 'contact',
          name: clientName,
          email,
          phone: phone || '',
          countryCode: countryCode || '+91',
          company: company || '',
          service: service || 'General Inquiry',
          budget: budget || '',
          message,
        },
        req
      );

      res.status(201).json({
        success: true,
        message: 'Your message has been securely received! Our engineering leadership will get back to you shortly.',
        data: { id: saved._id || saved.id, name: saved.name, email: saved.email, createdAt: saved.createdAt },
      });
    } catch (error) {
      console.error('Error submitting contact message:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please reach out via email or phone.',
      });
    }
  }
);

// 3. Submit Meeting Booking (with Honeypot & Validation)
router.post(
  '/meeting',
  verifyHoneypot,
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2, max: 100 }).escape(),
    body('email').trim().isEmail().withMessage('Please provide a valid email.').normalizeEmail(),
    body('meetingDate').trim().notEmpty().withMessage('Meeting date is required.').isLength({ max: 50 }).escape(),
    body('meetingTimeSlot').trim().notEmpty().withMessage('Meeting time slot is required.').isLength({ max: 50 }).escape(),
    body('phone').optional().trim().isLength({ max: 25 }).escape(),
    body('company').optional().trim().isLength({ max: 150 }).escape(),
    body('meetingTopic').optional().trim().isLength({ max: 200 }).escape(),
    body('meetingAgenda').optional().trim().isLength({ max: 3000 }).escape(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, phone, countryCode, meetingDate, meetingTimeSlot, meetingTopic, meetingAgenda, company } = req.body;

      const saved = await saveSubmission(
        {
          type: 'meeting',
          name,
          email,
          phone: phone || '',
          countryCode: countryCode || '+91',
          company: company || '',
          meetingDate,
          meetingTimeSlot,
          meetingTopic: meetingTopic || '30-Min Engineering & Scope Discovery',
          meetingAgenda: meetingAgenda || '',
          priority: 'high',
        },
        req
      );

      res.status(201).json({
        success: true,
        message: 'Your 30-minute engineering discovery call has been successfully scheduled!',
        data: { id: saved._id || saved.id, name: saved.name, meetingDate: saved.meetingDate, meetingTimeSlot: saved.meetingTimeSlot },
      });
    } catch (error) {
      console.error('Error booking meeting:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to schedule meeting. Please try again or contact us directly.',
      });
    }
  }
);

// 4. Submit Brochure Download Lead (with Honeypot & Validation)
router.post(
  '/brochure',
  verifyHoneypot,
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2, max: 100 }).escape(),
    body('email').trim().isEmail().withMessage('Please provide a valid business email.').normalizeEmail(),
    body('phone').optional().trim().isLength({ max: 25 }).escape(),
    body('company').optional().trim().isLength({ max: 150 }).escape(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, phone, countryCode, company } = req.body;

      const saved = await saveSubmission(
        {
          type: 'brochure',
          name,
          email,
          phone: phone || '',
          countryCode: countryCode || '+91',
          company: company || '',
          brochureVersion: 'Corporate_Deck_2026',
        },
        req
      );

      res.status(201).json({
        success: true,
        message: 'Thank you! The official NexoraLab Corporate Brochure is ready for download.',
        downloadUrl: '/NexoraLab_Technologies_Corporate_Deck_2026.pdf',
        data: { id: saved._id || saved.id, name: saved.name },
      });
    } catch (error) {
      console.error('Error capturing brochure lead:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process download request.',
      });
    }
  }
);

// 5. Submit Career Application (with Honeypot & Validation)
router.post(
  '/career',
  verifyHoneypot,
  [
    body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2, max: 100 }).escape(),
    body('email').trim().isEmail().withMessage('Valid email is required.').normalizeEmail(),
    body('roleApplied').trim().notEmpty().withMessage('Role applied is required.').isLength({ max: 150 }).escape(),
    body('phone').optional().trim().isLength({ max: 25 }).escape(),
    body('experience').optional().trim().isLength({ max: 50 }).escape(),
    body('portfolioUrl').optional().trim().isLength({ max: 300 }).escape(),
    body('resumeUrl').optional().trim().isLength({ max: 500 }).escape(),
    body('message').optional().trim().isLength({ max: 3000 }).escape(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, phone, countryCode, roleApplied, experience, portfolioUrl, resumeUrl, message } = req.body;

      const saved = await saveSubmission(
        {
          type: 'career',
          name,
          email,
          phone: phone || '',
          countryCode: countryCode || '+91',
          roleApplied,
          experience: experience || '',
          portfolioUrl: portfolioUrl || '',
          resumeUrl: resumeUrl || '',
          message: message || '',
        },
        req
      );

      res.status(201).json({
        success: true,
        message: 'Your job application has been securely submitted to NexoraLab Talent Acquisition!',
        data: { id: saved._id || saved.id, name: saved.name, roleApplied: saved.roleApplied },
      });
    } catch (error) {
      console.error('Error submitting career application:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit application.',
      });
    }
  }
);

// 6. Submit Newsletter Subscription
router.post(
  '/newsletter',
  verifyHoneypot,
  [
    body('email').trim().isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email } = req.body;

      const saved = await saveSubmission(
        {
          type: 'newsletter',
          name: 'Subscriber',
          email,
          status: 'subscribed',
        },
        req
      );

      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to NexoraLab Engineering Insights!',
        data: { id: saved._id || saved.id, email: saved.email },
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process subscription.',
      });
    }
  }
);

module.exports = router;
