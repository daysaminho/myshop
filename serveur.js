// server.js
const express = require('express');
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = 3000;

// server.js
const debugRoutes = require('./routes/debugRoutes');
app.use('/debug', debugRoutes);  // Accès via http://localhost:3000/debug/users


// Middleware pour analyser les requêtes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
