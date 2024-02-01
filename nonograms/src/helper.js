export function getRandomInteger(min, max) {
  return (Math.trunc(Math.random() * 10) % (max - min + 1)) + min;
}
export function destroyModal() {
  document.querySelector('.modal-back').remove();
}
