const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Pour gérer les chemins de fichiers
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dataBase = require('./database'); // Importer la connexion à la base de données

// Configuration de l'application Express
const app = express();
const PORT = 3000;

var jsonParser = bodyParser.json();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes); // Authentification
app.use('/admin', adminRoutes); // Routes admin


// Démarrage du serveur
app.listen(PORT, () => {
    console.log('MON SERVEUR TOURNE SUR LE PORT :', PORT);
});
