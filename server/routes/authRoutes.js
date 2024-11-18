const express = require('express')
const bcrypt = require('bcrypt') // Pour comparer les mots de passe hachés
const dataBase = require('../database') // Importer la connexion à la base de données
const router = express.Router()

// Connexion
router.post('/login', (req, res) => {
    const { firstName, lastName, password } = req.body

    // Vérifier si l'utilisateur existe
    const queryCheckUser = 'SELECT * FROM users WHERE firstName = ? AND lastName = ?'
    dataBase.query(queryCheckUser, [firstName, lastName], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'utilisateur:', err)
            return res.status(500).json({ error: 'Erreur serveur' })
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' })
        }

        // Comparer le mot de passe
        const user = result[0]

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Erreur lors de la comparaison du mot de passe:', err)
                return res.status(500).json({ error: 'Erreur serveur' })
            }

            if (isMatch) {
                // Si les mots de passe correspondent, l'utilisateur est authentifié
                return res.json({
                    message: 'Connexion réussie',
                    user: { firstName: user.firstName, lastName: user.lastName }
                })
            } else {
                return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' })
            }
        })
    })
})

module.exports = router
