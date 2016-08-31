import React from 'react';
import { render } from 'react-dom';
import CamperLeaderboard from 'components/camper-leaderboard';

import './styles/main.scss';

render(<CamperLeaderboard />, document.getElementById('content-entry'));