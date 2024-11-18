const express = require('express')
const bodyParser = require('body-parser')
const path = require('path') // Pour gérer les chemins de fichiers
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const dataBase = require('./database') // Importer la connexion à la base de données


const app = express()
const PORT = 3000

var jsonParser = bodyParser.json()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)



app.listen(PORT, () => {
    console.log('MON SERVEUR TOURNE SUR LE PORT :', PORT)
})
