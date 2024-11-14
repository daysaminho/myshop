const users = [
  { id: 1, firstName: 'Fabien',lastName: 'Boscher', password: '123456789', role: 'admin' }
]

let currentUser = null // Variable pour l'utilisateur actuellement connecté

const articles = [
  {id: 1, name: 'exemple', price: 1, description: 'aa',  }
]

module.exports = { users, currentUser, articles }
