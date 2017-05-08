import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import CommentApp from './js/CommentApp';
import './index.css';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <CommentApp />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
