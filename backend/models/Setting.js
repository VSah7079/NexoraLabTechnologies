const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'NexoraLab Technologies',
    },
    tagline: {
      type: String,
      default: 'Innovate • Build • Elevate',
    },
    contactEmail: {
      type: String,
      default: 'nexoralabtechnologies@gmail.com',
    },
    contactPhone: {
      type: String,
      default: '+91 70798 84369',
    },
    whatsappNumber: {
      type: String,
      default: '+917079884369',
    },
    hqAddress: {
      type: String,
      default: 'Siwan, Bihar 841226, India',
    },
    socialLinks: {
      linkedin: {
        type: String,
        default: 'https://www.linkedin.com/company/135297535/',
      },
      instagram: {
        type: String,
        default: 'https://www.instagram.com/nexoralabtechnology/',
      },
      facebook: {
        type: String,
        default: 'https://www.facebook.com/profile.php?id=61592465423073',
      },
      youtube: {
        type: String,
        default: 'https://www.youtube.com/@NexoraLabTechnologies',
      },
      twitter: {
        type: String,
        default: 'https://x.com/nexoralab',
      },
      github: {
        type: String,
        default: 'https://github.com/NexoraLab',
      },
    },
    stats: {
      uptimeSLA: {
        type: String,
        default: '99.9%',
      },
      productionSystems: {
        type: String,
        default: '40+',
      },
      aiResumesProcessed: {
        type: String,
        default: '50K+',
      },
      supportAvailability: {
        type: String,
        default: '24/7',
      },
    },
    adminPasskeyHash: {
      type: String,
      default: '', // If empty, defaults to fallback master passkey in code
    },
    notificationEmail: {
      type: String,
      default: 'nexoralabtechnologies@gmail.com',
    },
    emailNotificationsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Setting || mongoose.model('Setting', settingSchema);
