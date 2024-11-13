// routes/adminRoutes.js
const express = require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const data = require('../data');
const router = express.Router();

router.get('/', isAuthenticated, isAdmin, (req, res) => {
    res.json({ message: 'Bienvenue dans la section admin', user: data.currentUser });
});

module.exports = router;
