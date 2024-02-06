import {
  openTemplatesList,
  switchTheme,
  openDifficultyList,
  LEVELS,
} from './helper';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const headerText = document.createElement('h1');
headerText.classList.add('title');
headerText.append('Nonograms');

document.body.append(wrapper);

const field = document.createElement('div');
field.classList.add('field');

const rowclue = document.createElement('div');
rowclue.classList.add('rowclue');

const columnclue = document.createElement('div');
columnclue.classList.add('columnclue');

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
templatesList.classList.add('list');

for (let i = 0; i < 5; i += 1) {
  const templatesItem = document.createElement('li');
  templatesItem.classList.add('templates__item');
  templatesItem.classList.add(`templates__item-${i + 1}`);
  templatesList.append(templatesItem);
}

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

const saveBtn = document.createElement('button');
saveBtn.classList.add('save-btn');
saveBtn.classList.add('btn');
saveBtn.type = 'button';
saveBtn.append('Save');

const loadBtn = document.createElement('button');
loadBtn.classList.add('load-btn');
loadBtn.classList.add('btn');
loadBtn.type = 'button';
loadBtn.append('Load');

const themeBtn = document.createElement('button');
themeBtn.classList.add('theme-btn');
themeBtn.type = 'button';
themeBtn.addEventListener('click', switchTheme);

const scoreTable = document.createElement('div');
scoreTable.classList.add('score');
const scoreTitle = document.createElement('p');
scoreTitle.classList.add('score__title');
scoreTitle.append('Latest 5 wins:');
const scoreList = document.createElement('ol');
scoreList.classList.add('score__list');
for (let i = 0; i < 5; i += 1) {
  const scoreListItem = document.createElement('li');
  scoreListItem.classList.add('score__item');
  scoreList.append(scoreListItem);
}
scoreTable.append(scoreTitle);
scoreTable.append(scoreList);

const difficultyBtn = document.createElement('button');
difficultyBtn.classList.add('difficulty-btn');
difficultyBtn.classList.add('btn');
difficultyBtn.type = 'button';
difficultyBtn.append('Difficulty');
difficultyBtn.addEventListener('click', openDifficultyList);

const difficultyList = document.createElement('ul');
difficultyList.classList.add('difficulty');
difficultyList.classList.add('list');

for (let i = 0; i < 3; i += 1) {
  const difficultyListItem = document.createElement('li');
  difficultyListItem.classList.add('difficulty__item');
  difficultyListItem.append(LEVELS[i]);
  difficultyList.append(difficultyListItem);
}

field.append(rowclue);
field.append(columnclue);
field.append(verticalDivider);
field.append(horisontalDivider);

field.append(headerText);

field.append(resetBtn);

field.append(templatesBtn);
field.append(templatesList);

field.append(timer);

field.append(saveBtn);
field.append(loadBtn);

field.append(themeBtn);

field.append(scoreTable);

field.append(difficultyBtn);
field.append(difficultyList);

wrapper.append(field);
