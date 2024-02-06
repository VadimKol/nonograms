export const LEVELS = ['easy', 'norm', 'hard'];
export const LEVELSFIVE = [5, 10, 15];

export function getRandomInteger(min, max) {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}
export function destroyModal() {
  document.querySelector('.modal-back').remove();
}
export function feedHints(rowHints, columnHints, currentRiddle) {
  rowHints.forEach((x) => {
    x.innerText = '';
    return x;
  });
  columnHints.forEach((x) => {
    x.innerText = '';
    return x;
  });

  let maximumClues;

  if (currentRiddle.rowclue.length === 5) maximumClues = 3;
  else if (currentRiddle.rowclue.length === 10) maximumClues = 5;
  else maximumClues = 8;

  for (let i = 0, k = 0; i < currentRiddle.rowclue.length; i += 1) {
    k += maximumClues - currentRiddle.rowclue[i].length;
    for (let j = 0; j < currentRiddle.rowclue[i].length; j += 1, k += 1) {
      rowHints[k].append(currentRiddle.rowclue[i][j]);
    }
  }

  // тут проблема в том, что в гриде они идут в строчку
  // надо перевернуть для удобства
  const rotatedcolumnHintsArr = [];
  for (let i = 0; i < columnHints.length; i += 1)
    for (let j = 0; j < maximumClues; j += 1)
      rotatedcolumnHintsArr.push(
        columnHints[currentRiddle.columnclue.length * j + i],
      );

  for (let i = 0, k = 0; i < currentRiddle.columnclue.length; i += 1) {
    k += maximumClues - currentRiddle.columnclue[i].length;
    for (let j = 0; j < currentRiddle.columnclue[i].length; j += 1, k += 1)
      rotatedcolumnHintsArr[k].append(currentRiddle.columnclue[i][j]);
  }
}
export function openTemplatesList() {
  document.querySelector('.templates').classList.toggle('templates_show');
}
export function switchTheme() {
  document.body.classList.toggle('body-dark-theme');
}
export function openDifficultyList() {
  document.querySelector('.difficulty').classList.toggle('difficulty_show');
}
export function feedTemplatesList(riddles, difficulty) {
  for (let i = 0, j = 0; i < riddles.length; i += 1) {
    if (riddles[i].difficulty === difficulty) {
      const templatesItem = document.querySelectorAll('.templates__item');
      templatesItem[j].innerText = riddles[i].name;
      j += 1;
    }
  }
}
