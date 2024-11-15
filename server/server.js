// Importations
const mysql = require('mysql');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path'); // Pour gérer les chemins de fichiers
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const debugRoutes = require('./routes/debugRoutes');

// Configuration de l'application Express
const app = express();
const PORT = 3000;

// Configuration de la base de données (adresse, identification admin, ports, etc.)
const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'myshop'
});

dataBase.connect((err) => {
    if (err) {
        console.log('ERREUR DE CONNEXION A LA DATABASE');
    } else {
        console.log('BRAVO, VOUS ÊTES CONNECTE A LA DATABASE');
    }
});

var jsonParser = bodyParser.json()
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
// var urlencodedParser = bodyParser.urlencodedParser


// Routes
app.use('/auth', authRoutes); // Authentification
app.use('/admin', adminRoutes); // Routes admin
app.use('/debug', debugRoutes); // Routes de débogage

// Démarrage du serveur
app.listen(PORT, () => {
    console.log('MON SERVEUR TOURNE SUR LE PORT :', PORT);
});