const firebaseConfig = {
  apiKey: "AIzaSyANTPyxVxSZnqfVVQlDx7oMHP-Y5gvC-lg",
  authDomain: "rememberwordsgame.firebaseapp.com",
  projectId: "rememberwordsgame",
  storageBucket: "rememberwordsgame.appspot.com",
  messagingSenderId: "212600408560",
  appId: "1:212600408560:web:8ff560c16f0291dc5c3535"
};

firebase.initializeApp(firebaseConfig);

const firebaseRef = firebase.database().ref('team')

// update data
// var newData = {
//   username: "anotherUsername",
//   password: "anotherPassword"
// }
// var firebaseRef = firebase.database().ref('users/' + userID)
// firebaseRef.update(newData)

// // remove data
// var firebaseRef = firebase.database().ref('users/' + userID)
// firebaseRef.remove()

//========================================================================================================================================================


const btnNextWord = document.querySelector('.btn__next')
const btnSend = document.querySelector('.btn__send')
const input = document.querySelector('input')

const data = []

function clearInput() {
  input.value = '';
}

btnSend.addEventListener('click', () => {
  firebaseRef.set(data)
})

btnNextWord.addEventListener('click', () => {
  data.push(input.value.trim());
  clearInput()
})
