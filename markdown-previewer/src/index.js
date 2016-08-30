import React from 'react';
import { render } from 'react-dom';
import MarkdownPreviewer from 'components/markdown-previewer';

import './styles/main.scss';

render(<MarkdownPreviewer />, document.getElementById('app-entry'));