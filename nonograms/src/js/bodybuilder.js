import { openTemplatesList } from './helper';

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

const resetBtn = document.createElement('button');
resetBtn.classList.add('reset-btn');
resetBtn.classList.add('btn');
resetBtn.type = 'button';
resetBtn.append('Reset');

const templatesBtn = document.createElement('button');
templatesBtn.classList.add('templates-btn');
templatesBtn.classList.add('btn');
templatesBtn.type = 'button';
templatesBtn.append('Templates');
templatesBtn.addEventListener('click', openTemplatesList);

const templatesList = document.createElement('ul');
templatesList.classList.add('templates');

const timer = document.createElement('p');
timer.classList.add('timer');
const minutes = document.createElement('span');
minutes.classList.add('timer__minutes');
minutes.append('00');
const seconds = document.createElement('span');
seconds.classList.add('timer__seconds');
seconds.append('00');
timer.append(minutes);
timer.append(':');
timer.append(seconds);

field.append(rowclue);
field.append(columnclue);

field.append(verticalDivider);
field.append(horisontalDivider);

field.append(headerText);

field.append(resetBtn);

field.append(templatesBtn);
field.append(templatesList);

field.append(timer);

wrapper.append(field);
