import {
  getRandomInteger,
  feedHints,
  feedTemplatesList,
  destroyModal,
  openTemplatesList,
  openDifficultyList,
  LEVELS,
  LEVELSFIVE,
} from './helper';

const fieldCLick = document.querySelector('.field');
const templatesClick = document.querySelector('.templates');
const resetBtn = document.querySelector('.reset-btn');
const randomBtn = document.querySelector('.random-btn');
const solutionBtn = document.querySelector('.solution-btn');
const saveBtn = document.querySelector('.save-btn');
const loadBtn = document.querySelector('.load-btn');

let riddles;
let currentRiddle;
let currentRiddleId;
let currentRiddleDifficulty;

let minutes = 0;
let seconds = 0;
let currentTimerId = 0;
const minutesDOM = document.querySelector('.timer__minutes');
const secondsDOM = document.querySelector('.timer__seconds');

let rowHints = document.querySelectorAll('.rowclue__item');
let columnHints = document.querySelectorAll('.columnclue__item');

const blackSound = new Audio('black.wav');
const crossSound = new Audio('cross.wav');
const whiteSound = new Audio('white.wav');
const winSound = new Audio('win.wav');

// не могу сделать потише почемуто?!
// понял, я же клонирую ноду(((
/* blackSound.volume = 0.2;
crossSound.volume = 0.2;
whiteSound.volume = 0.2; */
winSound.volume = 0.5;

let saveState = {};

let scoreTable = [];
const scoreItems = document.querySelectorAll('.score__item');

const difficultyClick = document.querySelector('.difficulty');

function changeFieldAppearance() {
  const size = LEVELSFIVE[LEVELS.indexOf(currentRiddleDifficulty)];

  const fieldItems = document.querySelectorAll('.field__item');
  fieldItems.forEach((x) => x.remove());

  const fakeItems = document.querySelectorAll('.field-divider');
  fakeItems.forEach((x) => x.remove());

  // убираем старый класс, при смене сложности
  if (fieldCLick.classList.length === 2)
    fieldCLick.classList.remove(fieldCLick.classList[1]);

  if (size === 5) {
    for (let i = 0; i < size * size; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('field__item');
      cell.classList.add('field__item_easy');
      fieldCLick.prepend(cell);
    }
  }
  // криво просто жуть
  // лишний столбец надо добавить и через стили сделать его черным
  // без класса, чтобы не учитывать его в игре
  if (size === 10) {
    for (let i = 0, j = 5; i < (size + 1) * (size + 1); i += 1) {
      const cell = document.createElement('div');
      if (i !== j) {
        if (!(i >= 55 && i <= 65)) {
          // скипаю строчку, для жирной линии
          cell.classList.add('field__item');
          cell.classList.add('field__item_norm');
        } else cell.classList.add('field-divider');
      } else {
        cell.classList.add('field-divider');
        j += size + 1;
      }
      fieldCLick.prepend(cell);
    }
  }
  if (size === 15) {
    for (let i = 0, j = 5, k = 11; i < (size + 2) * (size + 2); i += 1) {
      const cell = document.createElement('div');
      if (i !== j && i !== k) {
        if (!((i >= 85 && i <= 101) || (i >= 187 && i <= 203))) {
          // скипаю 2 строчки, для жирной линии
          cell.classList.add('field__item');
          cell.classList.add('field__item_hard');
        } else cell.classList.add('field-divider');
      } else {
        cell.classList.add('field-divider');
        if (i === j) j += size + 2;
        else k += size + 2;
      }
      fieldCLick.prepend(cell);
    }
  }
  fieldCLick.classList.toggle(`field_${currentRiddleDifficulty}`);
}
function changeHintsAppearance() {
  const size = LEVELSFIVE[LEVELS.indexOf(currentRiddleDifficulty)];

  const rowclue = document.querySelector('.rowclue');
  const columnclue = document.querySelector('.columnclue');

  rowclue.replaceChildren();
  columnclue.replaceChildren();

  if (rowclue.classList.length === 2)
    rowclue.classList.remove(rowclue.classList[1]);

  if (columnclue.classList.length === 2)
    columnclue.classList.remove(columnclue.classList[1]);

  if (size === 5) {
    for (let i = 0; i < size * 3; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('rowclue__item');
      cell.classList.add('rowclue__item_easy');
      rowclue.append(cell);
    }
    for (let i = 0; i < size * 3; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('columnclue__item');
      cell.classList.add('columnclue__item_easy');
      columnclue.append(cell);
    }
  }

  if (size === 10) {
    for (let i = 0; i < size * 5 + 5; i += 1) {
      const cell = document.createElement('div');
      if (!(i >= 25 && i <= 29)) {
        // скипаю строчку, для жирной линии
        cell.classList.add('rowclue__item');
        cell.classList.add('rowclue__item_norm');
      }
      rowclue.append(cell);
    }
    for (let i = 0, j = 5; i < size * 5 + 5; i += 1) {
      const cell = document.createElement('div');
      if (i !== j) {
        // скипаю столбец, для жирной линии
        cell.classList.add('columnclue__item');
        cell.classList.add('columnclue__item_norm');
      } else j += size + 1;
      columnclue.append(cell);
    }
  }
  if (size === 15) {
    for (let i = 0, j = 3; i < size * 8 + 15 + 18; i += 1) {
      const cell = document.createElement('div');
      if (i !== j) {
        if (!((i >= 45 && i <= 53) || (i >= 99 && i <= 107))) {
          // скипаю 2 строчки, для жирной линии
          cell.classList.add('rowclue__item');
          cell.classList.add('rowclue__item_hard');
        }
      } else j += 9;
      rowclue.append(cell);
    }
    for (let i = 0, j = 5, k = 11; i < size * 8 + 15 + 18; i += 1) {
      const cell = document.createElement('div');
      if (i !== j && i !== k) {
        if (!(i >= 51 && i <= 67)) {
          // скипаю столбец, для жирной линии
          cell.classList.add('columnclue__item');
          cell.classList.add('columnclue__item_hard');
        }
      } else if (i === j) j += size + 2;
      else k += size + 2;
      columnclue.append(cell);
    }
  }
  rowclue.classList.toggle(`rowclue_${currentRiddleDifficulty}`);
  columnclue.classList.toggle(`columnclue_${currentRiddleDifficulty}`);

  rowHints = document.querySelectorAll('.rowclue__item');
  columnHints = document.querySelectorAll('.columnclue__item');
}
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
function getRandomGame() {
  let newRiddleId = currentRiddleId;

  while (newRiddleId === currentRiddleId)
    newRiddleId = getRandomInteger(0, riddles.length - 1);

  currentRiddleId = newRiddleId;
  currentRiddle = riddles[currentRiddleId];
  currentRiddleDifficulty = currentRiddle.difficulty;

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));
  console.log(currentRiddle.name);

  changeFieldAppearance();
  changeHintsAppearance();
  feedHints(rowHints, columnHints, currentRiddle);
  feedTemplatesList(riddles, currentRiddleDifficulty);
  clearTimer();

  if (difficultyClick.classList.contains('difficulty_show'))
    openDifficultyList();
  if (templatesClick.classList.contains('templates_show')) openTemplatesList();
}

(async () => {
  try {
    const responsePromise = await fetch('riddles.json');

    if (responsePromise.ok) riddles = await responsePromise.json();
    else throw new Error(responsePromise.status);

    getRandomGame();
  } catch (err) {
    console.log(err);
  }
})();

function resetField() {
  // восстанавливаем поле
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
function writeNewScore() {
  scoreTable.push({
    name: currentRiddle.name,
    date: Date.now(),
    level: currentRiddleDifficulty,
    timer: minutesDOM.innerText.concat(':', secondsDOM.innerText),
  });

  // удаляю самый ранний элемент
  if (scoreTable.length === 6) {
    // здесь были проблемы с console.log(scoreTable), выдывал актуальный массив
    // не мог посмотреть нормально изменения до и после сорта, через цикл по элементам только смог
    scoreTable.sort((a, b) => b.date - a.date);
    scoreTable.pop();
  }

  scoreTable.sort((a, b) => {
    const [aMinutes, aSeconds] = a.timer.split(':');
    const [bMinutes, bSeconds] = b.timer.split(':');
    if (
      Number(aMinutes) > Number(bMinutes) ||
      (Number(aMinutes) === Number(bMinutes) &&
        Number(aSeconds) > Number(bSeconds))
    )
      return 1;
    if (
      Number(aMinutes) < Number(bMinutes) ||
      (Number(aMinutes) === Number(bMinutes) &&
        Number(aSeconds) < Number(bSeconds))
    )
      return -1;
    return 0;
  });

  for (let i = 0; i < scoreTable.length; i += 1) {
    scoreItems[i].innerText =
      `${scoreTable[i].name} ${scoreTable[i].level} ${scoreTable[i].timer}`;
  }

  localStorage.setItem('nonogramScoreVK', JSON.stringify(scoreTable));
}

function getRandomRiddleWithCurrentDiff(difficulty) {
  let newRiddleId = currentRiddleId;
  let i = 1;

  // бесконечный цикл
  while (i > 0) {
    newRiddleId = getRandomInteger(0, riddles.length - 1);
    if (
      difficulty === riddles[newRiddleId].difficulty &&
      currentRiddleId !== newRiddleId
    )
      break;
    i += 1;
  }

  currentRiddleId = newRiddleId;
  currentRiddle = riddles[currentRiddleId];
}

function closeModal() {
  // playAgainBtn.removeEventListener("click", closeModal);// не надо я так понял, если .remove() нода
  // закрываем модалку
  destroyModal();

  // пишем результат в таблицу
  writeNewScore();

  // восстанавливаем поле
  resetField();

  // берем новую загадку
  getRandomRiddleWithCurrentDiff(currentRiddleDifficulty);

  // обновляем подсказки
  feedHints(rowHints, columnHints, currentRiddle);

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));
  console.log(currentRiddle.name);

  // закрываем списки
  if (difficultyClick.classList.contains('difficulty_show'))
    openDifficultyList();
  if (templatesClick.classList.contains('templates_show')) openTemplatesList();

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
function checkOnWin() {
  const cellsArr = document.querySelectorAll('.field__item');
  let result = false;
  const size = LEVELSFIVE[LEVELS.indexOf(currentRiddleDifficulty)];

  for (let i = 0, j = 0; i < cellsArr.length; i += 1) {
    if (i >= size && i % size === 0) j += 1;
    if (
      (cellsArr[i].classList.contains('field__item_clicked') &&
        currentRiddle.riddle[j][i % size] === 0) ||
      (!cellsArr[i].classList.contains('field__item_clicked') &&
        currentRiddle.riddle[j][i % size] === 1)
    ) {
      break;
    }

    if (i === cellsArr.length - 1) result = true;
  }

  // победил
  if (result) {
    // два звука одновременно из-за логики поиска победы
    // и определения, когда проигрывается звук
    // приходится сделать небольшой делей
    setTimeout(() => {
      winSound.play();
    }, 250);
    document.body.classList.toggle('overflow-body');
    createModal();
  }
}

function lClickLogic(cell) {
  // клонировать ноду, может быть плохо для памяти, не пойму
  if (
    cell.classList.contains('field__item_r-clicked') ||
    !cell.classList.contains('field__item_clicked')
  )
    blackSound.cloneNode(false).play();
  else whiteSound.cloneNode(false).play();

  // стартуем таймер при лефт клике
  if (currentTimerId === 0) startTimer();

  if (cell.classList.contains('field__item_r-clicked'))
    cell.classList.toggle('field__item_r-clicked');

  cell.classList.toggle('field__item_clicked');

  checkOnWin();
}
function rClickLogic(cell) {
  if (
    cell.classList.contains('field__item_clicked') ||
    !cell.classList.contains('field__item_r-clicked')
  )
    crossSound.cloneNode(false).play();
  else whiteSound.cloneNode(false).play();

  // райт клике
  if (currentTimerId === 0) startTimer();

  if (cell.classList.contains('field__item_clicked'))
    cell.classList.toggle('field__item_clicked');

  cell.classList.toggle('field__item_r-clicked');

  // плохая ситуация, когда кликнули на кнопку Solution
  // а потом райт клик по пустой клетке, это означает победа
  checkOnWin();
}

function openNewField(event) {
  const listItem = event.target;
  if (listItem.tagName !== 'LI') return;

  resetField();

  // берем загадку из списка
  currentRiddleId =
    listItem.classList[1].replace('templates__item-', '') -
    1 +
    5 * LEVELS.indexOf(currentRiddleDifficulty);
  currentRiddle = riddles[currentRiddleId];
  currentRiddleDifficulty = currentRiddle.difficulty;

  feedHints(rowHints, columnHints, currentRiddle);

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));
  console.log(currentRiddle.name);

  // закрываем список
  openTemplatesList();
}

function changeDifficulty(event) {
  const listItem = event.target;
  if (listItem.tagName !== 'LI') return;

  // закрываем список
  openDifficultyList();

  resetField();

  currentRiddleDifficulty = listItem.innerText;

  // берем новую загадку
  getRandomRiddleWithCurrentDiff(currentRiddleDifficulty);

  // логика смены сложности
  changeFieldAppearance();
  changeHintsAppearance();
  feedHints(rowHints, columnHints, currentRiddle);
  feedTemplatesList(riddles, currentRiddleDifficulty);

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));
  console.log(currentRiddle.name);

  // надо закрыть список темплейтов при смене сложности
  if (templatesClick.classList.contains('templates_show')) openTemplatesList();
}

function save() {
  const size = LEVELSFIVE[LEVELS.indexOf(currentRiddleDifficulty)];

  saveState.timer = minutesDOM.innerText.concat(':', secondsDOM.innerText);
  saveState.currentRiddle = currentRiddle;
  saveState.currentRiddleId = currentRiddleId;
  saveState.currentRiddleDifficulty = currentRiddleDifficulty;
  saveState.field = Array.from({ length: size * size }, () => 0);

  const fieldItems = document.querySelectorAll('.field__item');
  for (let i = 0; i < saveState.field.length; i += 1) {
    if (fieldItems[i].classList.contains('field__item_clicked'))
      saveState.field[i] = 1;
    else if (fieldItems[i].classList.contains('field__item_r-clicked'))
      saveState.field[i] = 2;
  }
  localStorage.setItem('nonogramVK', JSON.stringify(saveState));
  if (!loadBtn.classList.contains('load-btn_show'))
    loadBtn.classList.toggle('load-btn_show');
}
function load() {
  resetField();

  saveState = JSON.parse(localStorage.getItem('nonogramVK'));
  currentRiddle = saveState.currentRiddle;
  currentRiddleId = saveState.currentRiddleId;
  currentRiddleDifficulty = saveState.currentRiddleDifficulty;

  // меняем поле от сложности
  changeFieldAppearance();
  changeHintsAppearance();

  const fieldItems = document.querySelectorAll('.field__item');

  for (let i = 0; i < saveState.field.length; i += 1) {
    if (saveState.field[i] === 1)
      fieldItems[i].classList.toggle('field__item_clicked');
    else if (saveState.field[i] === 2)
      fieldItems[i].classList.toggle('field__item_r-clicked');
  }

  feedHints(rowHints, columnHints, currentRiddle);

  feedTemplatesList(riddles, currentRiddleDifficulty);

  [minutesDOM.innerText, secondsDOM.innerText] = saveState.timer.split(':');
  minutes = Number(minutesDOM.innerText);
  seconds = Number(secondsDOM.innerText);

  console.log('Current Nonogram is: ');
  currentRiddle.riddle.forEach((x) => console.log(...x));
  console.log(currentRiddle.name);

  // нужно ли очищать локалсторидж?! - сказали нет
  // для разовой загрузки
}
// когда уходят со страницы, нужно показать кнопку потом при возврате
if (localStorage.getItem('nonogramVK') !== null)
  loadBtn.classList.toggle('load-btn_show');

// берем таблицу из lS, если там уже есть что-то, и юзер вернулся
if (localStorage.getItem('nonogramScoreVK') !== null) {
  scoreTable = JSON.parse(localStorage.getItem('nonogramScoreVK'));

  for (let i = 0; i < scoreTable.length; i += 1) {
    scoreItems[i].innerText =
      `${scoreTable[i].name} ${scoreTable[i].level} ${scoreTable[i].timer}`;
  }
}

function solution() {
  // восстанавливаем поле
  while (document.querySelector('.field__item_clicked') !== null)
    document
      .querySelector('.field__item_clicked')
      .classList.toggle('field__item_clicked');
  while (document.querySelector('.field__item_r-clicked') !== null)
    document
      .querySelector('.field__item_r-clicked')
      .classList.toggle('field__item_r-clicked');

  const cellsArr = document.querySelectorAll('.field__item');
  const size = LEVELSFIVE[LEVELS.indexOf(currentRiddleDifficulty)];

  for (let i = 0, j = 0; i < cellsArr.length; i += 1) {
    if (i >= size && i % size === 0) j += 1;
    if (currentRiddle.riddle[j][i % size] === 1)
      cellsArr[i].classList.toggle('field__item_clicked');
  }
}

resetBtn.addEventListener('click', resetField);
randomBtn.addEventListener('click', getRandomGame);
solutionBtn.addEventListener('click', solution);

fieldCLick.onclick = (event) => {
  const cell = event.target;
  if (!cell.classList.contains('field__item')) return;

  lClickLogic(cell);
};

fieldCLick.addEventListener('contextmenu', (event) => {
  // я так понял, меню можно вызвать не только мышкой
  if (event.pointerType === 'mouse') {
    const cell = event.target;

    // это фикс для рклика по линиям между клеток
    if (
      event.target.classList.contains('field') ||
      event.target.classList.contains('field-divider')
    )
      event.preventDefault();

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

saveBtn.addEventListener('click', save);
loadBtn.addEventListener('click', load);

difficultyClick.addEventListener('click', changeDifficulty);
