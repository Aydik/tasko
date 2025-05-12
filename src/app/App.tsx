import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

import './styles/index.module.scss';

function App(): ReactElement {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
