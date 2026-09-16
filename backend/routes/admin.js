const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Submission = require('../models/Submission');
const ContentItem = require('../models/ContentItem');
const Setting = require('../models/Setting');
const AdminUser = require('../models/AdminUser');
const { isMongoConnected, readDiskData, writeDiskData, defaultSettings } = require('../utils/storage');

const JWT_SECRET = process.env.JWT_SECRET || 'nexoralab_super_secret_jwt_key_2026';

// Middleware for Admin Token Verification
const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authorization token required.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Access denied: Admin role required.' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired admin session token.', error: err.message });
  }
};

// 1. Admin Login (Supports ID + Password, Email + Password, Master Passkey, or Quick PIN)
router.post('/login', async (req, res) => {
  try {
    const { id, username, email, password, passkey, pin } = req.body;

    const inputId = (id || username || email || '').trim().toLowerCase();
    const inputPassword = (password || '').trim();
    const inputKey = (passkey || pin || '').trim();

    let authenticatedAdmin = null;

    // A. Check ID & Password in MongoDB
    if (isMongoConnected() && inputId && inputPassword) {
      try {
        const foundUser = await AdminUser.findOne({
          $or: [{ username: inputId }, { email: inputId }],
          isActive: true,
        });

        if (foundUser) {
          const isMatch = await foundUser.matchPassword(inputPassword);
          if (isMatch) {
            foundUser.lastLogin = new Date();
            await foundUser.save();
            authenticatedAdmin = {
              id: foundUser._id.toString(),
              username: foundUser.username,
              email: foundUser.email,
              name: foundUser.name,
              role: foundUser.role,
            };
          }
        }
      } catch (err) {
        console.warn('MongoDB AdminUser lookup warning:', err.message);
      }
    }

    // B. Check Passkey or Default ID/Password if not yet authenticated
    if (!authenticatedAdmin) {
      let storedPasskey = defaultSettings.adminPasskey;
      let storedPin = defaultSettings.quickPin;

      if (isMongoConnected()) {
        try {
          const settingDoc = await Setting.findOne();
          if (settingDoc && settingDoc.adminPasskeyHash) {
            storedPasskey = settingDoc.adminPasskeyHash;
          }
        } catch (e) {
          console.warn('Could not read settings doc:', e.message);
        }
      }

      const isPasskeyMatch =
        (inputKey && (inputKey === storedPasskey || inputKey === storedPin || inputKey === 'NexoraAdmin@2026' || inputKey === '707988')) ||
        (inputPassword && (inputPassword === 'Admin@Nexora2026' || inputPassword === 'NexoraAdmin@2026' || inputPassword === 'admin123' || inputPassword === '707988'));

      const isIdMatch =
        !inputId ||
        inputId === 'admin' ||
        inputId === 'admin@nexoralab.in' ||
        inputId === 'nexoralab' ||
        inputId === 'nexora' ||
        inputId === 'nexoralabtechnologies@gmail.com';

      if (isPasskeyMatch && isIdMatch) {
        authenticatedAdmin = {
          id: 'nexora_admin_root',
          username: inputId || 'admin',
          email: 'admin@nexoralab.in',
          name: 'NexoraLab Principal Admin',
          role: 'superadmin',
        };
      }
    }

    if (!authenticatedAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin ID or Password. Access denied.',
      });
    }

    const token = jwt.sign(
      {
        id: authenticatedAdmin.id,
        username: authenticatedAdmin.username,
        email: authenticatedAdmin.email,
        role: authenticatedAdmin.role || 'admin',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Admin authentication successful! Welcome to NexoraLab Command Center.',
      token,
      admin: {
        ...authenticatedAdmin,
        authenticatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Login server error.', error: error.message });
  }
});

// 2. Admin Dashboard Stats
router.get('/dashboard-stats', verifyAdminToken, async (req, res) => {
  try {
    let submissions = [];

    if (isMongoConnected()) {
      submissions = await Submission.find().sort({ createdAt: -1 });
    } else {
      submissions = readDiskData('submissions');
    }

    const total = submissions.length;
    const quotes = submissions.filter((s) => s.type === 'quote');
    const contacts = submissions.filter((s) => s.type === 'contact');
    const meetings = submissions.filter((s) => s.type === 'meeting');
    const brochures = submissions.filter((s) => s.type === 'brochure');
    const careers = submissions.filter((s) => s.type === 'career');

    const newSubmissions = submissions.filter((s) => s.status === 'new').length;
    const contacted = submissions.filter((s) => s.status === 'contacted').length;
    const converted = submissions.filter((s) => s.status === 'converted').length;

    // Estimate total potential deal value
    const highValueQuotes = quotes.filter((q) => q.budget && (q.budget.includes('$15,000') || q.budget.includes('$35,000') || q.budget.includes('Enterprise'))).length;

    res.json({
      success: true,
      stats: {
        totalSubmissions: total,
        newLeads: newSubmissions,
        quotesCount: quotes.length,
        contactsCount: contacts.length,
        meetingsCount: meetings.length,
        brochureCount: brochures.length,
        careersCount: careers.length,
        contactedCount: contacted,
        convertedCount: converted,
        highValueQuotes,
      },
      recentActivity: submissions.slice(0, 10),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats.', error: error.message });
  }
});

// 3. Get Submissions (Filtered by type, status, search)
router.get('/submissions', verifyAdminToken, async (req, res) => {
  try {
    const { type, status, search, page = 1, limit = 50 } = req.query;

    let items = [];

    if (isMongoConnected()) {
      const query = {};
      if (type && type !== 'all') query.type = type;
      if (status && status !== 'all') query.status = status;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { service: { $regex: search, $options: 'i' } },
        ];
      }
      items = await Submission.find(query).sort({ createdAt: -1 });
    } else {
      items = readDiskData('submissions');
      if (type && type !== 'all') {
        items = items.filter((i) => i.type === type);
      }
      if (status && status !== 'all') {
        items = items.filter((i) => i.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        items = items.filter(
          (i) =>
            (i.name && i.name.toLowerCase().includes(q)) ||
            (i.email && i.email.toLowerCase().includes(q)) ||
            (i.phone && i.phone.toLowerCase().includes(q)) ||
            (i.company && i.company.toLowerCase().includes(q)) ||
            (i.service && i.service.toLowerCase().includes(q))
        );
      }
    }

    const total = items.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = items.slice(startIndex, startIndex + Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      submissions: paginatedItems,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch submissions.', error: error.message });
  }
});

// 4. Update Submission Status & Priority
router.patch('/submissions/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    if (isMongoConnected()) {
      const updated = await Submission.findByIdAndUpdate(
        id,
        {
          ...(status && { status }),
          ...(priority && { priority }),
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Status updated successfully.', data: updated });
      }
    }

    // Disk fallback
    const items = readDiskData('submissions');
    const idx = items.findIndex((i) => (i._id && i._id.toString() === id) || i.id === id);
    if (idx !== -1) {
      if (status) items[idx].status = status;
      if (priority) items[idx].priority = priority;
      items[idx].updatedAt = new Date();
      writeDiskData('submissions', items);
      return res.json({ success: true, message: 'Status updated successfully.', data: items[idx] });
    }

    res.status(404).json({ success: false, message: 'Submission not found.' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Failed to update status.', error: error.message });
  }
});

// 5. Add Internal Team Note to Submission
router.post('/submissions/:id/notes', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Note text is required.' });
    }

    const noteItem = {
      text: text.trim(),
      author: author || req.admin.username || 'Admin',
      createdAt: new Date(),
    };

    if (isMongoConnected()) {
      const updated = await Submission.findByIdAndUpdate(
        id,
        {
          $push: { notes: noteItem },
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: 'Note added successfully.', data: updated });
      }
    }

    // Disk fallback
    const items = readDiskData('submissions');
    const idx = items.findIndex((i) => (i._id && i._id.toString() === id) || i.id === id);
    if (idx !== -1) {
      if (!items[idx].notes) items[idx].notes = [];
      items[idx].notes.push(noteItem);
      items[idx].updatedAt = new Date();
      writeDiskData('submissions', items);
      return res.json({ success: true, message: 'Note added successfully.', data: items[idx] });
    }

    res.status(404).json({ success: false, message: 'Submission not found.' });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ success: false, message: 'Failed to add note.', error: error.message });
  }
});

// 6. Delete Submission
router.delete('/submissions/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      await Submission.findByIdAndDelete(id);
    }

    // Disk fallback
    const items = readDiskData('submissions');
    const filtered = items.filter((i) => i._id !== id && i.id !== id);
    writeDiskData('submissions', filtered);

    res.json({ success: true, message: 'Submission deleted successfully.' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ success: false, message: 'Failed to delete submission.', error: error.message });
  }
});

// 7. CMS Content Management (Services, Products, Portfolio, Insights)
router.get('/content/:type', verifyAdminToken, async (req, res) => {
  try {
    const { type } = req.params;
    const typeVariants = [type, type.endsWith('s') ? type.slice(0, -1) : type + 's'];
    let items = [];

    if (isMongoConnected()) {
      items = await ContentItem.find({ type: { $in: typeVariants } }).sort({ order: 1, createdAt: -1 });
    } else {
      const allContent = readDiskData('content');
      items = allContent.filter((c) => typeVariants.includes(c.type));
    }

    res.json({ success: true, type, count: items.length, items });
  } catch (error) {
    console.error(`Error fetching CMS content for ${req.params.type}:`, error);
    res.status(500).json({ success: false, message: 'Failed to fetch content.', error: error.message });
  }
});

router.post('/content/:type', verifyAdminToken, async (req, res) => {
  try {
    const { type } = req.params;
    const body = req.body;

    const payload = {
      ...body,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isMongoConnected()) {
      const doc = new ContentItem(payload);
      const saved = await doc.save();
      return res.status(201).json({ success: true, message: `${type} created successfully.`, item: saved });
    }

    // Disk fallback
    const allContent = readDiskData('content');
    const id = 'cms_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const diskItem = { _id: id, id, ...payload };
    allContent.unshift(diskItem);
    writeDiskData('content', allContent);

    res.status(201).json({ success: true, message: `${type} item created successfully.`, item: diskItem });
  } catch (error) {
    console.error('Error creating content item:', error);
    res.status(500).json({ success: false, message: 'Failed to create content item.', error: error.message });
  }
});

router.put('/content/:type/:id', verifyAdminToken, async (req, res) => {
  try {
    const { type, id } = req.params;
    const updates = req.body;

    if (isMongoConnected()) {
      const updated = await ContentItem.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, message: `${type} updated successfully.`, item: updated });
      }
    }

    // Disk fallback
    const allContent = readDiskData('content');
    const idx = allContent.findIndex((c) => (c._id && c._id.toString() === id) || c.id === id);
    if (idx !== -1) {
      allContent[idx] = { ...allContent[idx], ...updates, updatedAt: new Date() };
      writeDiskData('content', allContent);
      return res.json({ success: true, message: `${type} updated successfully.`, item: allContent[idx] });
    }

    res.status(404).json({ success: false, message: 'Item not found.' });
  } catch (error) {
    console.error('Error updating content item:', error);
    res.status(500).json({ success: false, message: 'Failed to update content item.', error: error.message });
  }
});

router.delete('/content/:type/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id, type } = req.params;

    if (isMongoConnected()) {
      await ContentItem.findByIdAndDelete(id);
    }

    const allContent = readDiskData('content');
    const filtered = allContent.filter((c) => c._id !== id && c.id !== id);
    writeDiskData('content', filtered);

    res.json({ success: true, message: `${type} item deleted successfully.` });
  } catch (error) {
    console.error('Error deleting content item:', error);
    res.status(500).json({ success: false, message: 'Failed to delete content item.', error: error.message });
  }
});

// 8. Site Settings & Admin Security Config
router.get('/settings', verifyAdminToken, async (req, res) => {
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

    // Do not expose raw passkey
    const safeSettings = {
      ...settings,
      hasCustomPasskey: !!settings.adminPasskeyHash,
    };

    res.json({ success: true, settings: safeSettings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch settings.', error: error.message });
  }
});

router.put('/settings', verifyAdminToken, async (req, res) => {
  try {
    const updates = req.body;

    if (isMongoConnected()) {
      let doc = await Setting.findOne();
      if (!doc) {
        doc = new Setting(updates);
      } else {
        Object.assign(doc, updates);
        doc.updatedAt = new Date();
      }
      const saved = await doc.save();
      return res.json({ success: true, message: 'Site settings updated successfully!', settings: saved });
    }

    // Disk fallback
    const diskSettings = [updates];
    writeDiskData('settings', diskSettings);

    res.json({ success: true, message: 'Site settings updated successfully!', settings: updates });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Failed to update settings.', error: error.message });
  }
});

// 9. Export Submissions to CSV
router.get('/export', verifyAdminToken, async (req, res) => {
  try {
    const { type } = req.query;
    let items = [];

    if (isMongoConnected()) {
      const query = type && type !== 'all' ? { type } : {};
      items = await Submission.find(query).sort({ createdAt: -1 });
    } else {
      items = readDiskData('submissions');
      if (type && type !== 'all') {
        items = items.filter((i) => i.type === type);
      }
    }

    // Convert to CSV
    const headers = ['Type', 'Name', 'Email', 'Phone', 'Company', 'Service/Role', 'Budget/Date', 'Status', 'Date Submitted', 'Message/Agenda'];
    const rows = items.map((i) => [
      i.type || '',
      `"${(i.name || '').replace(/"/g, '""')}"`,
      i.email || '',
      `'${i.countryCode || '+91'} ${i.phone || ''}'`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.service || i.roleApplied || i.meetingTopic || '').replace(/"/g, '""')}"`,
      `"${(i.budget || i.meetingDate || '').replace(/"/g, '""')}"`,
      i.status || 'new',
      new Date(i.createdAt).toISOString(),
      `"${(i.message || i.meetingAgenda || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=NexoraLab_Leads_${type || 'all'}_${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting submissions:', error);
    res.status(500).json({ success: false, message: 'Failed to export CSV.', error: error.message });
  }
});

// 10. Admin Profile & Credentials Management
router.get('/profile', verifyAdminToken, async (req, res) => {
  try {
    if (isMongoConnected()) {
      let user = await AdminUser.findOne({
        $or: [{ _id: req.admin.id }, { username: req.admin.username }, { email: req.admin.email }],
      }).select('-password');

      if (!user) {
        user = await AdminUser.findOne().select('-password');
      }

      if (user) {
        return res.json({ success: true, admin: user });
      }
    }

    res.json({
      success: true,
      admin: {
        username: req.admin.username || 'admin',
        email: req.admin.email || 'admin@nexoralab.in',
        name: 'NexoraLab Principal Admin',
        role: 'superadmin',
      },
    });
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin profile.', error: error.message });
  }
});

router.put('/credentials', verifyAdminToken, async (req, res) => {
  try {
    const { username, email, newPassword, name } = req.body;

    if (isMongoConnected()) {
      let adminUser = await AdminUser.findOne({
        $or: [{ _id: req.admin.id }, { username: req.admin.username }, { email: req.admin.email }],
      });

      if (!adminUser) {
        adminUser = await AdminUser.findOne();
      }

      if (adminUser) {
        if (username) adminUser.username = username.trim().toLowerCase();
        if (email) adminUser.email = email.trim().toLowerCase();
        if (name) adminUser.name = name.trim();
        if (newPassword && newPassword.trim().length >= 6) {
          adminUser.password = newPassword.trim();
        }
        await adminUser.save();

        return res.json({
          success: true,
          message: 'Admin credentials updated successfully in database!',
          admin: {
            username: adminUser.username,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role,
          },
        });
      } else {
        const created = await AdminUser.create({
          username: (username || 'admin').trim().toLowerCase(),
          email: (email || 'admin@nexoralab.in').trim().toLowerCase(),
          password: newPassword ? newPassword.trim() : 'Admin@Nexora2026',
          name: name || 'NexoraLab Principal Admin',
          role: 'superadmin',
        });
        return res.json({
          success: true,
          message: 'Admin credentials initialized in database!',
          admin: {
            username: created.username,
            email: created.email,
            name: created.name,
            role: created.role,
          },
        });
      }
    }

    // Disk fallback update
    const diskSettings = readDiskData('settings');
    if (diskSettings && diskSettings[0]) {
      if (newPassword) diskSettings[0].adminPasskey = newPassword;
      writeDiskData('settings', diskSettings);
    }

    res.json({
      success: true,
      message: 'Admin credentials updated successfully!',
    });
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    res.status(500).json({ success: false, message: 'Failed to update credentials.', error: error.message });
  }
});

module.exports = router;
