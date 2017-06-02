const admin = require('firebase-admin')


const serviceAccount = require('./admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://iceandfire-d76e1.firebaseio.com/`
})

module.exports = admin.database()