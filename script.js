'use strict';

// selecting elements

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Ele = document.getElementById('score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.getElementById('current--0');
const current1Ele = document.getElementById('current--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

let scores, currentScore, activePlayer, playing;
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // initial condition
  diceEle.classList.add('hidden');
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1.genrate random dice number 1 to 6
    const Number = Math.trunc(Math.random() * 6) + 1;

    // 2.display dice
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${Number}.png`; // important part changing the attribute

    // 3. check for rolled 1
    if (Number !== 1) {
      currentScore += Number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // add dice to current score
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    // 1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEle.classList.add('hidden');
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// reset the game
btnNew.addEventListener('click', init);
