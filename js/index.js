const btns = document.querySelectorAll('.btn')
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
  wordsPerSecond: 5
}

let currentWord = 1
const defaultWords = ['Корова', "Авель", "Авелька"];

//TODO: зробити нопку далее
function startGame() {
  countDown(settings.wordsPerSecond)
  showWordNext()
  currentWord++
  const nextWordTimer = setInterval(() => {
    showWordNext()
    if (currentWord > defaultWords.length) {
      clearInterval(nextWordTimer)
    }
  }, (settings.wordsPerSecond + 1) * 1000)


}

function showWordNext(words) {
  document.querySelector('.two-screen__text').innerHTML = defaultWords[currentWord - 1]
  countDown(settings.wordsPerSecond)
  currentWord++
}

function countDown(timeCount) {
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
