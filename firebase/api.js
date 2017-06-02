import Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyARjc6HLsyiBKPD5zDxGDrD1Wn06aOwPx0",
  authDomain: "iceandfire-d76e1.firebaseapp.com",
  databaseURL: "https://iceandfire-d76e1.firebaseio.com",
  projectId: "iceandfire-d76e1",
  storageBucket: "iceandfire-d76e1.appspot.com",
  messagingSenderId: "568644297866"
}
Firebase.initializeApp(config)


Firebase.database().ref('/houses').once('value').then(snapshot => {
  console.log(snapshot)
})
