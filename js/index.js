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


const btns = document.querySelectorAll('.btn')
const screens = document.querySelectorAll('.screen')
let timePerSecondEl = document.querySelector('.time-per-second')
let screen = 1

new Parallax(document.querySelector('.words'))

for (let i = 0; i < btns.length; i++) {
  const btn = btns[i];

  btn.addEventListener('click', () => {
    if (!!btn.dataset.stop) return
    screen = +btn.dataset.screenNext;
    screenShow(btn.dataset.screenNext - 1)
    if (screen === 2) {
      startGame()
      firebaseRef.set({})
    }
  })
}

function screensHide() {
  for (let i = 0; i < screens.length; i++) {
    screens[i].classList.add('screen--lock')
  }
}
function screenShow(screen) {
  screensHide()
  screens[screen].classList.remove('screen--lock')
}

function reload() {
  screenShow(0)
  document.querySelector('.question-screen__inputs').innerHTML = ''
  document.querySelector('.loading').style.display = 'block';
}


//========================================================================================================================================================
// back-end
const settings = {
  words: 5,
  mode: 1,
  wordsPerSecond: 2
}
timePerSecondEl.value = +JSON.parse(localStorage.getItem('time'))

timePerSecondEl.addEventListener('change', () => {
  localStorage.setItem('time', JSON.stringify(+timePerSecondEl.value))
  if (timePerSecondEl.value !== '') {
    settings.wordsPerSecond = +JSON.parse(localStorage.getItem('time'))
  } else {
    settings.wordsPerSecond = 2
    localStorage.setItem('time', 2)
    timePerSecondEl.value = +JSON.parse(localStorage.getItem('time'))
  }

})


let defaultWords;
let startGameCheck = false
firebaseRef.on("value", function (snapshot) {
  if (snapshot.val()) {
    defaultWords = snapshot.val();
    startGameCheck = true
    document.querySelector('.first-screen__btn').disabled = false;
    document.querySelector('.loading').style.display = 'none';
  } else {
    document.querySelector('.first-screen__btn').disabled = true;
  }
});

let currentWord = 0


function startGame() {
  countDown(settings.wordsPerSecond)
  showWordNext()
  const nextWordTimer = setInterval(() => {
    showWordNext()
    if (currentWord >= defaultWords.length) {
      clearInterval(nextWordTimer)
    }
    finishGame()
  }, (settings.wordsPerSecond + 1) * 1000)
  for (let i = 0; i < defaultWords.length; i++) {
    document.querySelector('.question-screen__inputs').innerHTML += `<li><input type="text"></li>`
  }
}

function finishGame() {
  if (currentWord >= defaultWords.length) {
    setTimeout(() => {
      screenShow(2)
    }, settings.wordsPerSecond * 1000);
  }

  const inputs = document.querySelectorAll('.question-screen__inputs input')
  document.querySelector('.btn__result').addEventListener('click', () => {
    for (let i = 0; i < defaultWords.length; i++) {
      const el = defaultWords[i];
      if (inputs[i].value.trim().toUpperCase() == el.toUpperCase()) {
        inputs[i].style.borderColor = 'green'
      } else {
        inputs[i].parentNode.dataset.err = el
        inputs[i].style.borderColor = 'red'
        inputs[i].style.textDecoration = 'line-through'
        inputs[i].style.filter = 'greyscale(1)'
        inputs[i].style.textShadow = 'none'
        inputs[i].style.pointerEvents = 'none'
        inputs[i].style.textDecorationThickness = '3px'
        inputs[i].style.textDecorationColor = 'red'
        inputs[i].style.color = '#000'
      }
    }
  })
}

function showWordNext(next = false) {
  document.querySelector('.two-screen__text').innerHTML = defaultWords[currentWord]
  countDown(settings.wordsPerSecond, next)
  currentWord++
}

function countDown(timeCount, stop = false) {
  let time = +timeCount
  document.querySelector('.timer').innerHTML = time
  --time

  const timer = setInterval(() => {
    if (time < 0) {
      clearInterval(timer)
    } else {
      document.querySelector('.timer').innerHTML = time
      --time
    }

  }, 1000)

}
