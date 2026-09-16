const express = require('express');
const router = express.Router();
const ContentItem = require('../models/ContentItem');
const Setting = require('../models/Setting');
const { isMongoConnected, readDiskData, defaultSettings } = require('../utils/storage');

// Get public content by type (services, products, portfolio, insights)
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const typeVariants = [type, type.endsWith('s') ? type.slice(0, -1) : type + 's'];
    let items = [];

    if (isMongoConnected()) {
      items = await ContentItem.find({ type: { $in: typeVariants }, isActive: true }).sort({ order: 1, createdAt: -1 });
    } else {
      const allContent = readDiskData('content');
      items = allContent.filter((c) => typeVariants.includes(c.type) && c.isActive !== false);
    }

    res.json({ success: true, type, count: items.length, items });
  } catch (error) {
    console.error(`Error reading public content for ${req.params.type}:`, error);
    res.status(500).json({ success: false, message: 'Failed to fetch content.', error: error.message });
  }
});

// Get public site settings (Phone, Email, Address, Socials, Stats)
router.get('/meta/settings', async (req, res) => {
  try {
    let settings = defaultSettings;

    if (isMongoConnected()) {
      const doc = await Setting.findOne();
      if (doc) settings = doc;
    } else {
      const diskSettings = readDiskData('settings');
      if (diskSettings && diskSettings[0]) {
        settings = diskSettings[0];
      }
    }

    // Never return security fields
    const publicSettings = {
      companyName: settings.companyName,
      tagline: settings.tagline,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      whatsappNumber: settings.whatsappNumber,
      hqAddress: settings.hqAddress,
      socialLinks: settings.socialLinks,
      stats: settings.stats,
    };

    res.json({ success: true, settings: publicSettings });
  } catch (error) {
    console.error('Error reading public settings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings.', error: error.message });
  }
});

module.exports = router;
