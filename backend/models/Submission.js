const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['quote', 'contact', 'meeting', 'brochure', 'career', 'newsletter'],
      index: true,
    },
    // Common fields
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      default: '+91',
    },
    company: {
      type: String,
      trim: true,
    },
    // Quote & Contact specific fields
    service: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    // Meeting specific fields
    meetingDate: {
      type: String,
    },
    meetingTimeSlot: {
      type: String,
    },
    meetingTopic: {
      type: String,
    },
    meetingAgenda: {
      type: String,
    },
    // Career specific fields
    roleApplied: {
      type: String,
    },
    experience: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
    resumeUrl: {
      type: String,
    },
    // Brochure specific
    brochureVersion: {
      type: String,
      default: 'Corporate_Deck_2026',
    },
    // Management & Status
    status: {
      type: String,
      enum: ['new', 'in_review', 'contacted', 'converted', 'archived'],
      default: 'new',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    notes: [
      {
        text: String,
        author: {
          type: String,
          default: 'Admin',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for fast sorting and filtering
submissionSchema.index({ createdAt: -1 });

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
