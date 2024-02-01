import { getRandomInteger, destroyModal, feedHints } from './helper';

const fieldCLick = document.querySelector('.field');

let riddles;
let currentRiddle;
const rowHints = document.querySelectorAll('.rowclue__item');
const collumnHints = document.querySelectorAll('.collumnclue__item');

(async () => {
  try {
    const responsePromise = await fetch('riddles.json');

    if (responsePromise.ok) {
      riddles = await responsePromise.json();
    } else {
      throw new Error(responsePromise.status);
    }
    currentRiddle = riddles[getRandomInteger(0, riddles.length - 1)];
    console.log(currentRiddle);

    feedHints(rowHints, collumnHints, currentRiddle);
  } catch (err) {
    console.log(err);
  }
})();

function closeModal() {
  // playAgainBtn.removeEventListener("click", closeModal);// не надо я так понял, если .remove() нода
  // закрываем модалку
  destroyModal();

  // восстанавлием поле
  while (document.querySelector('.field__item_clicked') !== null)
    document
      .querySelector('.field__item_clicked')
      .classList.toggle('field__item_clicked');

  // берем новую загадку
  riddles = riddles.filter((riddle) => riddle !== currentRiddle);

  currentRiddle = riddles[getRandomInteger(0, riddles.length - 1)];

  // обновляем подсказки
  feedHints(rowHints, collumnHints, currentRiddle);

  console.log(currentRiddle);

  document.body.classList.toggle('overflow-body');
}

function createModal() {
  const modalBack = document.createElement('div');
  modalBack.classList.add('modal-back');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const resultMsg = document.createElement('p');
  resultMsg.classList.add('modal__msg');
  resultMsg.append('Great! You have solved the nonogram!');
  modal.append(resultMsg);

  const playAgainBtn = document.createElement('button');
  playAgainBtn.classList.add('modal__new-btn');
  playAgainBtn.type = 'button';
  playAgainBtn.append('Play again');
  playAgainBtn.addEventListener('click', closeModal);
  modal.append(playAgainBtn);

  modalBack.append(modal);

  document.body.append(modalBack);
}

function mainLogic(cell) {
  cell.classList.toggle('field__item_clicked');

  const cellsArr = document.querySelectorAll('.field__item');
  let result = false;

  // сломается на 10
  for (let i = 0, j = 0; i < cellsArr.length; i += 1) {
    if (i >= 5 && i % 5 === 0) j += 1;
    if (
      (cellsArr[i].classList.contains('field__item_clicked') &&
        currentRiddle.riddle[j][i % 5] === 0) ||
      (!cellsArr[i].classList.contains('field__item_clicked') &&
        currentRiddle.riddle[j][i % 5] === 1)
    ) {
      break;
    }

    if (i === cellsArr.length - 1) result = true;
  }
  if (result) {
    document.body.classList.toggle('overflow-body');
    createModal();
  }
}

fieldCLick.onclick = (event) => {
  const cell = event.target;
  if (!cell.classList.contains('field__item')) return;

  mainLogic(cell);
};
