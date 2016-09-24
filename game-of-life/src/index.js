import React from 'react';
import { render } from 'react-dom';
import GameOfLife from 'components/GameOfLife';

import './styles/main.scss';

render(<GameOfLife />, document.getElementById('app-entry'));