const express = require('express');
const data = require('../data');
const router = express.Router();

// Modifie la route pour "/welcome" au lieu de la racine "/"
router.get('/', (req, res) => {
    if (data.currentUser) {
        res.json({ message: `Bienvenue ${data.currentUser.username}` });
    } else {
        res.json({ message: 'Bienvenue, visiteur!' });
    }
});

module.exports = router;
