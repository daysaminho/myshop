const express = require('express')
const data = require('../data')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Bienvenue dans la section admin', user: data.currentUser })
})


//Afficher tous les articles en mémoire
router.get('/articles', (req, res) => {
    res.json(data.articles)
})


// Création d'un article
router.post('/create', (req, res) => {
    const { name, price, description, imageUrl } = req.body

    // Vérifier si l'article existe déjà
    const articleExists = data.articles.some(u => u.name === name || u.description === description)

    if (articleExists) {
        return res.status(400).json({ error: 'Nom ou description existant' })
    }

    // Créer un nouvel article et l'ajouter à `data.articles`
    const newArticle = { name, price, description, imageUrl }
    data.articles.push(newArticle)

    // Réponse de confirmation
    res.json({ message: 'Article ajouté avec succés', articles: { name }})
})


router.delete('/delete', (req, res) => {
    const { name } = req.body
    
    const articleExists = data.articles.findIndex(u => u.name === name)

    if (articleExists === -1) {
        return res.status(400).json({ error: 'Article non trouvé' })
    }

    data.articles.splice(articleExists, 1)

    res.json({ message: 'Article supprimé avec succés', articles: { name }})

})


router.put('/update', (req, res) => {
    const { name, newName, newPrice, newDescription, newImageUrl} = req.body
    
    const articleIndex = data.articles.findIndex(u => u.name === name)

    if (articleIndex === -1) {
        return res.status(400).json({ error: 'Article non trouvé' })
    }

    if (newName && data.articles.some(u => u.name === newName)) {
        return res.status(400).json({ error: 'Le nouveau nom est déjà utilisé par un autre article' })
    }

    if (newName !== undefined) data.articles[articleIndex].name = newName
    if (newPrice !== undefined) data.articles[articleIndex].price = newPrice
    if (newDescription !== undefined) data.articles[articleIndex].description = newDescription
    if (newImageUrl !== undefined) data.articles[articleIndex].imageUrl = newImageUrl

    res.json({
        message: 'L\'Article a bien été mis à jour',
        articles: data.articles[articleIndex] 
    })
    
})


module.exports = router