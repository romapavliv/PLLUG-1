//Elements UI
const nickname = document.querySelector(".input__text");
const sbmtNickname = document.querySelector(".input__submit");
const registration = document.querySelector(".registration");
const game = document.querySelector(".game");
const cards = document.querySelectorAll(".card");
const nameValue = document.querySelector(".statistic__current-player");
const movesValue = document.querySelector(".statistic__current-moves");
const pointsValue = document.querySelector(".statistic__current-points");
const maxComboValue = document.querySelector(".statistic__current-combo");
const end = document.querySelector(".end");
const modalEnd = document.querySelector(".modal-end")
//Events
sbmtNickname.addEventListener("click", onSubmitNickname);
game.addEventListener("click", onClickGame);

//Arrays
let randomAnimals = [
  "monkey",
  "monkey",
  "mouse",
  "mouse",
  "pig",
  "pig",
  "rabbit",
  "rabbit",
  "rhino",
  "rhino",
  "squirell",
  "squirell",
  "tiger",
  "tiger",
  "zhiraf",
  "zhiraf",
];

let startGameTime;
//Functions
function onSubmitNickname(e) {
  e.preventDefault();
  if (nickname.value == "") {
    alert("You forgot to enter nickname!!! Please do this");
    return;
  }
  registration.classList.add("hide-registration");
  nameValue.textContent = nickname.value;
  game.classList.add("show-game");
  let dataAnimals = shuffle(randomAnimals);
  let k = 0;
  for (let el of cards) {
    el.setAttribute("data-image", dataAnimals[k]);
    k += 1;
  }
  startGameTime = new Date();
}

let move = 0;
let points = 0;
let combo = 0;
let maxCombo = 0;
let endGameTime;
function onClickGame(e) {
  e.stopPropagation();
  const currentCard = e.target;
  if (currentCard.classList.contains("card")) {
    move += 1;
    movesValue.textContent = move;
    currentCard.removeAttribute("class");
    currentCard.classList.add(e.target.dataset.image);
    currentCard.classList.add(`checked-${e.target.dataset.image}`);
    currentCard.classList.add("checked");
    if (
      game.querySelectorAll(`.checked-${currentCard.dataset.image}`).length == 2
    ) {
      setTimeout(function () {
        alert("Very good!");
        for (let el of game.querySelectorAll(".checked")) {
          el.remove();
        }
        combo += 1;
        points += 10 * combo;
        pointsValue.textContent = points;
        if (combo > maxCombo) {
          maxCombo = combo;
          maxComboValue.textContent = maxCombo;
        }
      }, 100);
    } else if (game.querySelectorAll(".checked").length == 2) {
      setTimeout(function () {
        alert("Try again!");
        combo = 0;
        for (let el of cards) {
          el.removeAttribute("class");
          el.classList.add("bg");
          el.classList.add("card");
        }
      }, 100);
    }
    if (game.querySelectorAll(".card").length == 0) {
      endGameTime = new Date();
      setTimeout(function () {
        alert("Congrats!");
        game.remove();
        addStatistics()
        showEnd();
      }, 100);
    }
  }
}

//Help
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

function showEnd() {
  end.classList.add("show-end");
}

function addStatistics() {
  const p = `
  <p class="modal-end__paragraph">
    <b>Nickname</b>: ${nickname.value}<br><br>
    <b>Moves</b>: ${move}<br><br>
    <b>Points</b>: ${points}<br><br>
    <b>Max combo</b>: ${combo}<br><br>
    <b>Time</b>: ${(endGameTime-startGameTime) / 1000} s
  </p>
  `;
  modalEnd.insertAdjacentHTML('beforeend', p)
}

if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((err) => console.log(`Service Worker Error: ${err}`));
  });
}
Завдання виконано
