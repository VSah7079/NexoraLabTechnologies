const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'service',
        'services',
        'product',
        'products',
        'portfolio',
        'insight',
        'insights',
        'testimonial',
        'testimonials',
      ],
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    description: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    icon: {
      type: String,
    },
    emoji: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    // Portfolio / Product specific
    clientName: {
      type: String,
    },
    metrics: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    badge: {
      type: String,
    },
    author: {
      name: {
        type: String,
        default: 'NexoraLab Team',
      },
      avatar: String,
      role: String,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

contentItemSchema.index({ type: 1, order: 1 });

module.exports = mongoose.models.ContentItem || mongoose.model('ContentItem', contentItemSchema);
