const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'NexoraLab Principal Admin',
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor'],
      default: 'superadmin',
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Match password helper
adminUserSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword) return false;
  // If password in DB is hashed with bcrypt
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  // Plaintext match fallback
  return this.password === enteredPassword;
};

module.exports = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
