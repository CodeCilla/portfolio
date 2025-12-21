require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Erreur: MONGO_URI est undefined. Vérifie ton fichier .env.');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connexion à MongoDB réussie');

    const email = '';
    const password = '';

    // Control if email and password are provided
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Cet utilisateur existe déjà.');
      mongoose.disconnect();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('Utilisateur administrateur ajouté avec succès !');

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB', err);
  });
