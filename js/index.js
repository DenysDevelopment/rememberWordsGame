const btns = document.querySelectorAll('.btn__screen-next')
const screens = document.querySelectorAll('.screen')
let screen = 1

for (let i = 0; i < btns.length; i++) {
  const btn = btns[i];

  btn.addEventListener('click', () => {
    screen = +btn.dataset.screenNext;
    screenShow(btn.dataset.screenNext - 1)
    if (screen === 2) startGame()
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


//========================================================================================================================================================
// back-end

const settings = {
  words: 5,
  mode: 1,
  wordsPerSecond: 6
}

let currentWord = 0
const defaultWords = ['Корова', 'Боба', 'Авель'];


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
  setTimeout(() => {
    if (currentWord >= defaultWords.length) {
      screenShow(2)
    }
  }, settings.wordsPerSecond * 1000);

  const inputs = document.querySelectorAll('.question-screen__inputs input')
  console.log(inputs);
  document.querySelector('.btn__result').addEventListener('click', () => {
    for (let i = 0; i < defaultWords.length; i++) {
      const el = defaultWords[i];
      if (inputs[i].value.trim().toUpperCase() == el.toUpperCase()) {
        inputs[i].style.borderColor = 'green'
      } else {
        inputs[i].style.borderColor = 'red'
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
