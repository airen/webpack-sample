import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App/App';

// ReactDOM.render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
  let axe = require('react-axe');
  axe(React, ReactDOM, 1000);
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
