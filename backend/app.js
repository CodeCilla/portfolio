require('dotenv').config();

// Main dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const projectsRoutes = require('./routes/project');

// Connect BDD MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('ECHEC Connexion à BDD MongoDB ECHEC'));

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://www.priscillarenault.fr',
      'https://api.priscillarenault.fr',
      'http://localhost:5173',
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Force https
app.set('trust proxy', 1);

// Redirect http to https
// Redirect http to https
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    next();
  });
}

// Routes
app.use('/api/projects', projectsRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Export app to server.js
module.exports = app;
