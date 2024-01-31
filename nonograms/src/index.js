import { bar } from './bar'; // убираем .js из-за resolve в конфиге webpack'a
import './style.scss';

const img = require('./assets/clean code.png');

bar();
document.body.innerHTML = `
 <img src="${img}" alt="test picture">
 `;
