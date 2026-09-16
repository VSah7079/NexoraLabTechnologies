const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
}

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readDiskData = (collection) => {
  const filePath = getFilePath(collection);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content || '[]');
    } catch (err) {
      console.error(`Error reading ${collection} disk file:`, err);
      return [];
    }
  }
  return [];
};

const writeDiskData = (collection, data) => {
  const filePath = getFilePath(collection);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${collection} disk file:`, err);
  }
};

const isMongoConnected = () => {
  return mongoose.connection && mongoose.connection.readyState === 1;
};

// Initial default CMS and Setting seeds
const defaultSettings = {
  companyName: 'NexoraLab Technologies',
  tagline: 'Innovate • Build • Elevate',
  contactEmail: 'nexoralabtechnologies@gmail.com',
  contactPhone: '+91 70798 84369',
  whatsappNumber: '+917079884369',
  hqAddress: 'Siwan, Bihar 841226, India',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/135297535/',
    instagram: 'https://www.instagram.com/nexoralabtechnology/',
    facebook: 'https://www.facebook.com/profile.php?id=61592465423073',
    youtube: 'https://www.youtube.com/@NexoraLabTechnologies',
    twitter: 'https://x.com/nexoralab',
    github: 'https://github.com/NexoraLab',
  },
  stats: {
    uptimeSLA: '99.9%',
    productionSystems: '40+',
    aiResumesProcessed: '50K+',
    supportAvailability: '24/7',
  },
  adminPasskey: 'NexoraAdmin@2026',
  quickPin: '707988',
  emailNotificationsEnabled: true,
};

module.exports = {
  isMongoConnected,
  readDiskData,
  writeDiskData,
  defaultSettings,
};
