const mysql = require('mysql')


const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'myshop'
})


dataBase.connect((err) => {
    if (err) {
        console.error('ERREUR DE CONNEXION À LA BASE DE DONNÉES:', err)
    } else {
        console.log('BRAVO, VOUS ÊTES CONNECTÉ À LA BASE DE DONNÉES')
    }
})

// Exportation de la connexion pour l'utiliser ailleurs
module.exports = dataBase
