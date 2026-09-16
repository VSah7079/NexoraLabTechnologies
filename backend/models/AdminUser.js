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

// Pre-save hook to hash password if modified
adminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // If not already bcrypt hashed
  if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Match password helper
adminUserSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword) return false;
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  return this.password === enteredPassword;
};

module.exports = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
