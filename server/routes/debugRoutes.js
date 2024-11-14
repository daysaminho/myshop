const express = require('express');
const data = require('../data');
const router = express.Router();

router.get('/users', (req, res) => {
    res.json(data.users);  // Affiche tous les utilisateurs en mémoire
});

module.exports = router;
