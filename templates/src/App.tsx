import React, { Suspense } from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  const [count, setCount] = useState(0);

  return (
    <Suspense fallback='Loading...'>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Hello {t('projectName')}!</p>
          <p>
            <button type='button' onClick={() => setCount(count => count + 1)}>
              Count UP!
            </button>
          </p>
          <h4 data-testid='count'>{count}</h4>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
              Learn React
            </a>
            {' | '}
            <a className='App-link' href='https://vitejs.dev/guide/features.html' target='_blank' rel='noopener noreferrer'>
              Vite Docs
            </a>
          </p>
        </header>
      </div>
    </Suspense>
  );
}

export default App;
