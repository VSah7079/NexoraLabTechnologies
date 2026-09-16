const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const { isMongoConnected, readDiskData, writeDiskData } = require('../utils/storage');

// Helper to save a submission to MongoDB or Disk Fallback
const saveSubmission = async (submissionData, req) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';

  const payload = {
    ...submissionData,
    ipAddress,
    userAgent,
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

// 1. Submit Request Quote
router.post('/quote', async (req, res) => {
  try {
    const { name, fullName, email, phone, countryCode, service, budget, message, timeline, company } = req.body;
    const clientName = name || fullName;

    if (!clientName || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and Email are required fields.',
      });
    }

    const saved = await saveSubmission(
      {
        type: 'quote',
        name: clientName,
        email,
        phone,
        countryCode: countryCode || '+91',
        service: service || 'Custom Software Development',
        budget,
        timeline,
        company,
        message,
        priority: budget && budget.includes('Enterprise') ? 'high' : 'medium',
      },
      req
    );

    res.status(201).json({
      success: true,
      message: 'Your project quote request has been received. Our principal architects will review and reach out within 4 business hours.',
      data: saved,
    });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please connect directly at nexoralabtechnologies@gmail.com.',
      error: error.message,
    });
  }
});

// 2. Submit Contact Inquiry
router.post('/contact', async (req, res) => {
  try {
    const { name, fullName, email, phone, countryCode, company, service, budget, message } = req.body;
    const clientName = name || fullName;

    if (!clientName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email, and Message are required.',
      });
    }

    const saved = await saveSubmission(
      {
        type: 'contact',
        name: clientName,
        email,
        phone,
        countryCode: countryCode || '+91',
        company,
        service,
        budget,
        message,
      },
      req
    );

    res.status(201).json({
      success: true,
      message: 'Your message has been received! Our engineering leadership will get back to you shortly.',
      data: saved,
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please reach out via email or phone.',
      error: error.message,
    });
  }
});

// 3. Submit Meeting Booking
router.post('/meeting', async (req, res) => {
  try {
    const { name, email, phone, countryCode, meetingDate, meetingTimeSlot, meetingTopic, meetingAgenda, company } = req.body;

    if (!name || !email || !meetingDate || !meetingTimeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email, Meeting Date, and Time Slot are required.',
      });
    }

    const saved = await saveSubmission(
      {
        type: 'meeting',
        name,
        email,
        phone,
        countryCode: countryCode || '+91',
        company,
        meetingDate,
        meetingTimeSlot,
        meetingTopic: meetingTopic || '30-Min Engineering & Scope Discovery',
        meetingAgenda,
        priority: 'high',
      },
      req
    );

    res.status(201).json({
      success: true,
      message: 'Your 30-minute engineering discovery call has been successfully scheduled!',
      data: saved,
    });
  } catch (error) {
    console.error('Error booking meeting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule meeting. Please try again or contact us directly.',
      error: error.message,
    });
  }
});

// 4. Submit Brochure Lead
router.post('/brochure', async (req, res) => {
  try {
    const { name, email, phone, countryCode, company } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and Email are required to download the brochure.',
      });
    }

    const saved = await saveSubmission(
      {
        type: 'brochure',
        name,
        email,
        phone,
        countryCode: countryCode || '+91',
        company,
        brochureVersion: 'Corporate_Deck_2026',
      },
      req
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! The official NexoraLab Corporate Brochure is ready for download.',
      downloadUrl: '/NexoraLab_Technologies_Corporate_Deck_2026.pdf',
      data: saved,
    });
  } catch (error) {
    console.error('Error capturing brochure lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process download request.',
      error: error.message,
    });
  }
});

// 5. Submit Career / Candidate Application
router.post('/career', async (req, res) => {
  try {
    const { name, email, phone, countryCode, roleApplied, experience, portfolioUrl, resumeUrl, message } = req.body;

    if (!name || !email || !roleApplied) {
      return res.status(400).json({
        success: false,
        message: 'Name, Email, and Role Applied are required.',
      });
    }

    const saved = await saveSubmission(
      {
        type: 'career',
        name,
        email,
        phone,
        countryCode: countryCode || '+91',
        roleApplied,
        experience,
        portfolioUrl,
        resumeUrl,
        message,
      },
      req
    );

    res.status(201).json({
      success: true,
      message: 'Your job application has been submitted to NexoraLab Talent Acquisition!',
      data: saved,
    });
  } catch (error) {
    console.error('Error submitting career application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application.',
      error: error.message,
    });
  }
});

module.exports = router;
