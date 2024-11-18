const express = require('express')
const dataBase = require('../database') // Importer la connexion à la base de données
const router = express.Router()

// Fonction pour vérifier si l'utilisateur est admin
function isAdmin(req, res) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Accès non autorisé, aucun token fourni' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, secretKey) // Vérification du token

        // Vérifie si le rôle est admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Accès interdit : Rôle non autorisé' })
        }

        // Stocke les infos de l'utilisateur décodé pour l'utiliser dans les routes si besoin
        req.user = decoded
        return null // Indique qu'il n'y a pas d'erreur
    } catch (err) {
        return res.status(401).json({ error: 'Token invalide ou expiré' })
    }
}

// Accueil de la section admin
router.get('/', (req, res) => {
    const error = isAdmin(req, res)
    if (error) return

    res.json({ message: 'Bienvenue dans la section admin', user: dataBase.currentUser })
})

// Affiche tous les utilisateurs depuis la base de données
router.get('/users', (req, res) => {
    const error = isAdmin(req, res)
    if (error) return

    const query = 'SELECT * FROM users'
    dataBase.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs:', err)
            return res.status(500).json({ error: 'Erreur serveur' })
        }
        res.json(result) // Renvoie les utilisateurs récupérés de la base de données
    })
})

// Affiche tous les articles depuis la base de données
router.get('/articles', (req, res) => {
    const error = isAdmin(req, res)
    if (error) return

    const query = 'SELECT * FROM articles'
    dataBase.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des articles:', err)
            return res.status(500).json({ error: 'Erreur serveur' })
        }
        res.json(result) // Renvoie les articles récupérés de la base de données
    })
})

// Création d'un article
router.post('/create', (req, res) => {
    const error = isAdmin(req, res)
    if (error) return

    const { name, price, description, imageUrl } = req.body

    const queryCheckArticle = 'SELECT * FROM articles WHERE name = ? OR description = ?'
    dataBase.query(queryCheckArticle, [name, description], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'article:', err)
            return res.status(500).json({ error: 'Erreur serveur' })
        }

        if (result.length > 0) {
            return res.status(400).json({ error: 'Nom ou description existant' })
        }

        const queryInsertArticle = 'INSERT INTO articles (name, price, description, imageUrl) VALUES (?, ?, ?, ?)'
        dataBase.query(queryInsertArticle, [name, price, description, imageUrl], (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'article:', err)
                return res.status(500).json({ error: 'Erreur serveur' })
            }

            res.json({ message: 'Article ajouté avec succès', articles: { name } })
        })
    })
})

// Suppression d'un article
router.delete('/delete', (req, res) => {
    const error = isAdmin(req, res)
    if (error) return

    const { name } = req.body

    const queryDeleteArticle = 'DELETE FROM articles WHERE name = ?'
    dataBase.query(queryDeleteArticle, [name], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'article:', err)
            return res.status(500).json({ error: 'Erreur serveur' })
        }

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'Article non trouvé' })
        }

        res.json({ message: 'Article supprimé avec succès', articles: { name } })
    })
})

// Mise à jour d'un article
router.put('/update', (req, res) => {
    const error = isAdmin(req, res)
    if (error) return

    const { name, newName, newPrice, newDescription, newImageUrl } = req.body

    const queryCheckArticle = 'SELECT * FROM articles WHERE name = ?'
    dataBase.query(queryCheckArticle, [name], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'article:', err)
            return res.status(500).json({ error: 'Erreur serveur' })
        }

        if (result.length === 0) {
            return res.status(400).json({ error: 'Article non trouvé' })
        }

        if (newName && newName !== name) {
            const queryCheckName = 'SELECT * FROM articles WHERE name = ?'
            dataBase.query(queryCheckName, [newName], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la vérification du nouveau nom:', err)
                    return res.status(500).json({ error: 'Erreur serveur' })
                }

                if (result.length > 0) {
                    return res.status(400).json({ error: 'Le nouveau nom est déjà utilisé' })
                }

                const queryUpdateArticle = 'UPDATE articles SET name = ?, price = ?, description = ?, imageUrl = ? WHERE name = ?'
                dataBase.query(queryUpdateArticle, [newName || name, newPrice || result[0].price, newDescription || result[0].description, newImageUrl || result[0].imageUrl, name], (err, result) => {
                    if (err) {
                        console.error('Erreur lors de la mise à jour de l\'article:', err)
                        return res.status(500).json({ error: 'Erreur serveur' })
                    }

                    res.json({
                        message: 'Article mis à jour avec succès',
                        articles: { name: newName || name, price: newPrice || result[0].price, description: newDescription || result[0].description, imageUrl: newImageUrl || result[0].imageUrl }
                    })
                })
            })
        }
    })
})

module.exports = router
