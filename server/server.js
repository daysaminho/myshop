const express = require('express');
const path = require('path'); // Pour gérer les chemins de fichiers
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const debugRoutes = require('./routes/debugRoutes');

const app = express();
const PORT = 3000;

// Route principale pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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
