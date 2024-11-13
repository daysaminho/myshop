// routes/mainRoutes.js
const express = require('express');
const data = require('../data');
const router = express.Router();

router.get('/', (req, res) => {
    if (data.currentUser) {
        res.json({ message: `Bienvenue ${data.currentUser.username}` });
    } else {
        res.json({ message: 'Bienvenue, visiteur!' });
    }
});

module.exports = router;
