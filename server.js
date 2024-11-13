const express = require('express');
const path = require('path'); // Pour gérer les chemins de fichiers
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const debugRoutes = require('./routes/debugRoutes');

const app = express();
const PORT = 3000;

// Middleware pour analyser les requêtes (JSON et URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir des fichiers statiques (index.html et autres fichiers publics)
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Importation des autres routes
app.use('/auth', authRoutes); // Authentification (connexion, inscription)
app.use('/admin', adminRoutes); // Routes admin (sécurisées)
app.use('/debug', debugRoutes); // Routes de débogage (facultatives)
app.use('/welcome', mainRoutes); // Route principale pour bienvenue (vérifie si l'utilisateur est connecté)

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
