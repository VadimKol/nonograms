export function getRandomInteger(min, max) {
  return (Math.trunc(Math.random() * 10) % (max - min + 1)) + min;
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

  for (let i = 0, k = 0; i < currentRiddle.rowclue.length; i += 1) {
    k += 3 - currentRiddle.rowclue[i].length;
    for (let j = 0; j < currentRiddle.rowclue[i].length; j += 1, k += 1) {
      rowHints[k].append(currentRiddle.rowclue[i][j]);
    }
  }

  // тут проблема в том, что в гриде они идут в строчку
  // надо перевернуть для удобства
  const rotatedcolumnHintsArr = [];
  for (let i = 0; i < columnHints.length; i += 1)
    for (let j = 0; j < 3; j += 1)
      rotatedcolumnHintsArr.push(columnHints[5 * j + i]);

  for (let i = 0, k = 0; i < currentRiddle.columnclue.length; i += 1) {
    k += 3 - currentRiddle.columnclue[i].length;
    for (let j = 0; j < currentRiddle.columnclue[i].length; j += 1, k += 1)
      rotatedcolumnHintsArr[k].append(currentRiddle.columnclue[i][j]);
  }
}
