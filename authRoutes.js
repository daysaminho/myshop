// routes/authRoutes.js
const express = require('express');
const data = require('../data');
const router = express.Router();

// Connexion
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = data.users.find(u => u.username === username && u.password === password);

    if (user) {
        data.currentUser = user;  // Stocke l'utilisateur connecté
        res.json({ message: 'Connexion réussie', user: { username: user.username, role: user.role } });
    } else {
        res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
});

// Inscription
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = data.users.some(u => u.username === username);

    if (userExists) {
        return res.status(400).json({ error: 'Nom d\'utilisateur déjà pris' });
    }

    const newUser = { username, password, role: 'user' };
    data.users.push(newUser);
    res.json({ message: 'Inscription réussie', user: { username: newUser.username, role: newUser.role } });
});

// Déconnexion
router.post('/logout', (req, res) => {
    data.currentUser = null; // Déconnecte l'utilisateur
    res.json({ message: 'Déconnexion réussie' });
});

module.exports = router;
