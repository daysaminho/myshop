// data.js
const users = [
  { username: 'admin', password: 'admin', role: 'admin' }
];

let currentUser = null; // Variable pour l'utilisateur actuellement connecté

module.exports = { users, currentUser };
