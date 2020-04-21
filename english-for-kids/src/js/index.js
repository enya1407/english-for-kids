import '../styles/style.scss';
import { renderCardsCategory } from './view/renderCards.js';

import './control/initBurgerControl.js';
import './control/initMainControl.js';
import './control/initGameControl.js';

const cardContainer = document.querySelector('.card-container');

cardContainer.append(renderCardsCategory());
