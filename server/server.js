const express = require('express')
const bodyParser = require("body-parser")
const path = require('path') // Pour gérer les chemins de fichiers
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const debugRoutes = require('./routes/debugRoutes')

const app = express()
const PORT = 3000

var jsonParser = bodyParser.json()
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
// var urlencodedParser = bodyParser.urlencodedParser

//Routes
app.use('/auth', authRoutes) // Authentification
app.use('/admin', adminRoutes) // Routes admin 
app.use('/debug', debugRoutes) // Routes de débogage 

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`)
})
