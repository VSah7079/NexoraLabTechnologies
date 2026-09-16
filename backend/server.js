const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import security middlewares
const {
  globalLimiter,
  authLimiter,
  formsLimiter,
  aiLimiter,
} = require('./middleware/security');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const aiRoutes = require('./routes/ai');
const formsRoutes = require('./routes/forms');
const adminRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');

// Initialize express app
const app = express();

// 1. Trust proxy (Required for accurate IP rate limiting behind reverse proxies/Cloudflare/Nginx)
app.set('trust proxy', 1);

// 2. Helmet HTTP Security Headers (XSS, Clickjacking, MIME sniffing, HSTS protection)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false, // Managed by client/edge proxy
  })
);

// 3. Secure CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'https://nexoralabtechnologies.in',
  'https://www.nexoralabtechnologies.in',
  'https://nexora-lab-technologies.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman) or matched origins
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy: Unauthorized origin.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// 4. Request Body Parsers with 10mb limit for image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving
app.use('/uploads', express.static(UPLOADS_DIR));

// 5. NoSQL Injection Sanitization (Strips MongoDB operators like $gt, $ne, etc.)
app.use(mongoSanitize());

// 6. HTTP Parameter Pollution Protection
app.use(hpp());

// 7. Global API Rate Limiter
app.use('/api', globalLimiter);

const { seedInitialData } = require('./utils/seedData');

// Database connection with error tolerance
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedInitialData();
  })
  .catch((err) => {
    console.warn('MongoDB connection warning (resilient disk fallback active):', err.message);
    seedInitialData();
  });

// 8. Mount Routes with Targeted Security Limiters
app.use('/api/forms', formsLimiter, formsRoutes);
app.use('/api/admin', authLimiter, adminRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/user', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'NexoraLab Technologies Secure API Server running',
    timestamp: new Date(),
    security: {
      rateLimiter: 'Active',
      helmet: 'Active',
      noSqlSanitize: 'Active',
      hpp: 'Active',
    },
    mongoConnected: mongoose.connection.readyState === 1,
  });
});

// Production-Safe Error Handling Middleware (Zero stack trace or internal path leaks)
app.use((err, req, res, next) => {
  console.error('[API ERROR]', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected internal security or server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`NexoraLab Technologies Hardened API Server running on port ${PORT}`);
});
