const data = require('../data');

// Middleware pour vérifier si l'utilisateur est authentifié
module.exports.isAuthenticated = (req, res, next) => {
    if (data.currentUser) {
        return next();
    }
    res.status(401).json({ error: 'Authentification requise' });
};

// Middleware pour vérifier si l'utilisateur est admin
module.exports.isAdmin = (req, res, next) => {
    if (data.currentUser && data.currentUser.role === 'admin') {
        return next();
    }
    res.status(403).json({ error: 'Accès interdit - réservé aux administrateurs' });
};
