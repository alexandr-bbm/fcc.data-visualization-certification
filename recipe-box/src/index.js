import React from 'react';
import { render } from 'react-dom';
import RecipeBox from 'components/RecipeBox';

import './styles/main.scss';

render(<RecipeBox />, document.getElementById('content-entry'));