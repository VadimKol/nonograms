const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const headerText = document.createElement('h1');
headerText.classList.add('title');
headerText.append('Nonograms');

document.body.append(wrapper);

const field = document.createElement('div');
field.classList.add('field');

for (let i = 0; i < 25; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('field__item');
  field.append(cell);
}

const rowclue = document.createElement('div');
rowclue.classList.add('rowclue');

for (let i = 0; i < 15; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('rowclue__item');
  rowclue.append(cell);
}

const columnclue = document.createElement('div');
columnclue.classList.add('columnclue');

for (let i = 0; i < 15; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('columnclue__item');
  columnclue.append(cell);
}

const verticalDivider = document.createElement('div');
verticalDivider.classList.add('vdivider');

const horisontalDivider = document.createElement('div');
horisontalDivider.classList.add('hdivider');

field.append(rowclue);
field.append(columnclue);

field.append(verticalDivider);
field.append(horisontalDivider);
field.append(headerText);

wrapper.append(field);
