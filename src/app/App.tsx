import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

import './styles/index.module.scss';
import { AppProvider } from 'app/providers/app-provider.tsx';
import { ErrorBoundary } from 'shared/ui/ErrorBoundry/ErrorBoundry.tsx';

const App: FC = () => {
  return (
    <ErrorBoundary fallback={<div> Что-то пошло не так. Пожалуйста, обновите страницу.</div>}>
      <AppProvider>
        <Router>
          <AppRouter />
        </Router>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
