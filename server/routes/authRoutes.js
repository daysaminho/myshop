const express = require('express');
const bcrypt = require('bcrypt');  // Pour comparer les mots de passe hachés
const dataBase = require('../dataBase'); // Importation de la connexion à la base de données
const router = express.Router();

// Connexion
router.post('/login', (req, res) => {
    const { firstName, lastName, password } = req.body;

    // Vérifier si l'utilisateur existe
    const queryCheckUser = 'SELECT * FROM users WHERE firstName = ? AND lastName = ?';
    dataBase.query(queryCheckUser, [firstName, lastName], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'utilisateur:', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        // Comparer le mot de passe
        const user = result[0]; // Récupérer le premier utilisateur (le seul, car le prénom et nom sont uniques)

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erreur lors de la comparaison du mot de passe:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }

            if (isMatch) {
                // Si les mots de passe correspondent, l'utilisateur est authentifié
                // Stocker l'utilisateur dans la session ou générer un token (optionnel)
                return res.json({
                    message: 'Connexion réussie',
                    user: { firstName: user.firstName, lastName: user.lastName }
                });
            } else {
                return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }
        });
    });
});

module.exports = router;



// Route d'inscription
router.post('/register', async (req, res) => {
    const { firstName, lastName, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const queryCheckUser = 'SELECT * FROM users WHERE firstName = ? AND lastName = ?';
        dataBase.query(queryCheckUser, [firstName, lastName], async (err, result) => {
            if (err) {
                console.error('Erreur lors de la vérification de l\'utilisateur:', err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }

            if (result.length > 0) {
                return res.status(400).json({ error: 'Utilisateur existant' });
            }

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const queryInsertUser = 'INSERT INTO users (firstName, lastName, password, role) VALUES (?, ?, ?, ?)';
            dataBase.query(queryInsertUser, [firstName, lastName, hashedPassword, 'user'], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion de l\'utilisateur:', err);
                    return res.status(500).json({ error: 'Erreur serveur' });
                }

                // Réponse de confirmation
                res.json({
                    message: 'Inscription réussie',
                    user: { firstName, lastName }
                });
            });
        });
    } catch (err) {
        console.error('Erreur serveur:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});