import {
  getRandomInteger,
  feedHints,
  destroyModal,
  openTemplatesList,
} from './helper';

const fieldCLick = document.querySelector('.field');
const templatesClick = document.querySelector('.templates');
const resetBtn = document.querySelector('.reset-btn');

let riddles;
let currentRiddle;
let currentRiddleId;

let minutes = 0;
let seconds = 0;
let currentTimerId = 0;
const minutesDOM = document.querySelector('.timer__minutes');
const secondsDOM = document.querySelector('.timer__seconds');

const rowHints = document.querySelectorAll('.rowclue__item');
const columnHints = document.querySelectorAll('.columnclue__item');

(async () => {
  try {
    const responsePromise = await fetch('riddles.json');

    if (responsePromise.ok) riddles = await responsePromise.json();
    else throw new Error(responsePromise.status);

    currentRiddleId = getRandomInteger(0, riddles.length - 1);
    currentRiddle = riddles[currentRiddleId];

    console.log('Current Nonogram is: ');
    currentRiddle.riddle.forEach((x) => console.log(...x));

    feedHints(rowHints, columnHints, currentRiddle);

    // так, видимо тут будет генерится список с темплейтами
    const templates = document.querySelector('.templates');
    for (let i = 0; i < riddles.length; i += 1) {
      const templatesItem = document.createElement('li');
      templatesItem.classList.add('templates__item');
      templatesItem.classList.add(`templates__item-${i + 1}`);
      templatesItem.append(riddles[i].name);
      templates.append(templatesItem);
    }
  } catch (err) {
    console.log(err);
  }
})();

// интервал 1 секунда
function startTimer() {
  currentTimerId = setInterval(() => {
    if (seconds === 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }
    if (seconds < 10) secondsDOM.innerText = '0'.concat(String(seconds));
    else secondsDOM.innerText = String(seconds);

    if (minutes < 10) minutesDOM.innerText = '0'.concat(String(minutes));
    else minutesDOM.innerText = String(minutes);
  }, 1000);
}

function clearTimer() {
  // останавливаем таймер
  clearInterval(currentTimerId);

  // очищаем текущий таймер
  currentTimerId = 0;
  minutes = 0;
  seconds = 0;
  minutesDOM.innerText = '00';
  secondsDOM.innerText = '00';
}

function resetField() {
  // восстанавлием поле
  while (document.querySelector('.field__item_clicked') !== null)
    document
      .querySelector('.field__item_clicked')
      .classList.toggle('field__item_clicked');
  while (document.querySelector('.field__item_r-clicked') !== null)
    document
      .querySelector('.field__item_r-clicked')
      .classList.toggle('field__item_r-clicked');

  // останавливаем и очищаем таймер
  clearTimer();
}

function closeModal() {
  // playAgainBtn.removeEventListener("click", closeModal);// не надо я так понял, если .remove() нода
  // закрываем модалку
  destroyModal();

  // восстанавлием поле
  resetField();

  // берем новую загадку
  let newRiddleId = currentRiddleId;

  while (currentRiddleId === newRiddleId)
    newRiddleId = getRandomInteger(0, riddles.length - 1);

  currentRiddleId = newRiddleId;

  currentRiddle = riddles[currentRiddleId];

  // обновляем подсказки
  feedHints(rowHints, columnHints, currentRiddle);

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));

  document.body.classList.toggle('overflow-body');
}

function createModal() {
  // останавливаем таймер без очистки
  clearInterval(currentTimerId);

  const modalBack = document.createElement('div');
  modalBack.classList.add('modal-back');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const resultMsg = document.createElement('p');
  resultMsg.classList.add('modal__msg');
  resultMsg.append('Great! You have solved the nonogram in ');
  resultMsg.append(minutesDOM.innerText);
  resultMsg.append(':');
  resultMsg.append(secondsDOM.innerText);
  resultMsg.append(' !');
  modal.append(resultMsg);

  const playAgainBtn = document.createElement('button');
  playAgainBtn.classList.add('modal__new-btn');
  playAgainBtn.classList.add('btn');
  playAgainBtn.type = 'button';
  playAgainBtn.append('Play again');
  playAgainBtn.addEventListener('click', closeModal);
  modal.append(playAgainBtn);

  modalBack.append(modal);

  document.body.append(modalBack);
}
function mainLogic(cell) {
  // стартуем таймер при лефт клике
  if (currentTimerId === 0) startTimer();

  if (cell.classList.contains('field__item_r-clicked'))
    cell.classList.toggle('field__item_r-clicked');

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

  // победил
  if (result) {
    document.body.classList.toggle('overflow-body');
    createModal();
  }
}
function rClickLogic(cell) {
  // райт клике
  if (currentTimerId === 0) startTimer();

  if (cell.classList.contains('field__item_clicked'))
    cell.classList.toggle('field__item_clicked');

  cell.classList.toggle('field__item_r-clicked');
}

function openNewField(event) {
  const listItem = event.target;
  if (listItem.tagName !== 'LI') return;

  resetField();

  // берем загадку из списка
  currentRiddleId = listItem.classList[1].replace('templates__item-', '') - 1;
  currentRiddle = riddles[currentRiddleId];

  feedHints(rowHints, columnHints, currentRiddle);

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));

  // закрываем список
  openTemplatesList();
}
resetBtn.addEventListener('click', resetField);

fieldCLick.onclick = (event) => {
  const cell = event.target;
  if (!cell.classList.contains('field__item')) return;

  mainLogic(cell);
};

fieldCLick.addEventListener('contextmenu', (event) => {
  // я так понял, меню можно вызвать не только мышкой
  if (event.pointerType === 'mouse') {
    const cell = event.target;
    if (!cell.classList.contains('field__item')) return;

    // убираем поведение по умолчанию
    event.preventDefault();
    rClickLogic(cell);
  }
});

// хотел сделать обертку через ()=>{}, чтобы передать параметры в хэндлер
// и определять его в helpers, но проблема с аргументами
// не меняются значения аргументов
// даже объект не поменялся, вобщем небольшая проблема
templatesClick.addEventListener('click', openNewField);
