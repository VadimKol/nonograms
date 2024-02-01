export function getRandomInteger(min, max) {
  return (Math.trunc(Math.random() * 10) % (max - min + 1)) + min;
}
export function destroyModal() {
  document.querySelector('.modal-back').remove();
}
export function feedHints(rowHints, collumnHints, currentRiddle) {
  rowHints.forEach((x) => {
    x.innerText = '';
    return x;
  });
  collumnHints.forEach((x) => {
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
  const rotatedCollumnHintsArr = [];
  for (let i = 0; i < collumnHints.length; i += 1)
    for (let j = 0; j < 3; j += 1)
      rotatedCollumnHintsArr.push(collumnHints[5 * j + i]);

  for (let i = 0, k = 0; i < currentRiddle.collumnclue.length; i += 1) {
    k += 3 - currentRiddle.collumnclue[i].length;
    for (let j = 0; j < currentRiddle.collumnclue[i].length; j += 1, k += 1)
      rotatedCollumnHintsArr[k].append(currentRiddle.collumnclue[i][j]);
  }
}
