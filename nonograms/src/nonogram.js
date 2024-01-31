const fieldCLick = document.querySelector('.field');
fieldCLick.onclick = (event) => {
  const cell = event.target;
  if (!cell.classList.contains('field__item')) return;

  mainLogic(cell);
};

function mainLogic(cell) {
  cell.classList.toggle('field__item_clicked');
}
