const mongoose = require('mongoose');

const contentItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
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
    features: [
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
    price: {
      type: String,
    },
    // FAQ specific
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    // Testimonial specific
    role: {
      type: String,
    },
    company: {
      type: String,
    },
    rating: {
      type: Number,
      default: 5,
    },
    avatarUrl: {
      type: String,
    },
    // Career / Job Opening specific
    department: {
      type: String,
    },
    location: {
      type: String,
    },
    jobType: {
      type: String,
    },
    experience: {
      type: String,
    },
    salary: {
      type: String,
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    perks: [
      {
        type: String,
      },
    ],
    // Resource / Guide specific
    highlights: [
      {
        type: String,
      },
    ],
    techTags: [
      {
        type: String,
      },
    ],
    linkLabel: {
      type: String,
    },
    // Hero & Section specific
    ctaText: {
      type: String,
    },
    ctaLink: {
      type: String,
    },
    secondaryCtaText: {
      type: String,
    },
    secondaryCtaLink: {
      type: String,
    },
    // Author
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
    metadata: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

contentItemSchema.index({ type: 1, order: 1 });

module.exports = mongoose.models.ContentItem || mongoose.model('ContentItem', contentItemSchema);
