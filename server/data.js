const users = [
  {firstName: 'Fabien',lastName: 'Boscher', password: '123456789', role: 'admin' }
]

// Variable pour l'utilisateur actuellement connecté
let currentUser = null 

const articles = [
  {name: 'exemple', price: 1, description: 'aa', imageUrl: '' }
]

module.exports = { users, currentUser, articles }