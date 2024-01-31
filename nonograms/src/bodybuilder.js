const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

document.body.append(wrapper);

const field = document.createElement('div');
field.classList.add('field');

for (let i = 0; i < 25; i += 1) {
  const cell = document.createElement('div');
  cell.classList.add('field__item');
  field.append(cell);
}

wrapper.append(field);
