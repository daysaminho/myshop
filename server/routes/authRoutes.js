const express = require('express')
const data = require('../data')
const router = express.Router()

// Connexion
router.post('/login', (req, res) => {
    const { firstName, lastName, password, } = req.body
    const user = data.users.find(u => u.firstName === firstName && u.lastName === lastName && u.password === password)

    if (user) {
        data.currentUser = user  // Stocke l'utilisateur connecté
        res.json({ message: 'Connexion réussie', user: { firstName: user.firstName, lastName: user.lastName } })
    } else {
        res.status(401).json({ error: 'Une ou plusieurs informations incorrect' })
    }
})


// Inscription
router.post('/register', (req, res) => {
    const { firstName, lastName, password } = req.body

    // Vérifier si l'utilisateur existe déjà
    const userExists = data.users.some(u => u.firstName === firstName && u.lastName === lastName)

    if (userExists) {
        return res.status(400).json({ error: 'Utilisateur existant' })
    }

    // Créer un nouvel utilisateur et l'ajouter à `data.users`
    const newUser = { firstName, lastName, password, role: 'user' }
    data.users.push(newUser)

    // Réponse de confirmation
    res.json({ message: 'Inscription réussie', user: { firstName: newUser.firstName, lastName: newUser.lastName} })
})

module.exports = router
