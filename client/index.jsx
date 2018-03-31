/* eslint-env browser */

import React from 'react';
import { render } from 'react-dom';

// import components
import App from './components/App';

// Styles
import './styles/app.less';

render(
  <App />,
  document.getElementById('root'),
);
