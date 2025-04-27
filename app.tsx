import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import { useTheme } from './hooks/useTheme';

function App() {
  const { toggleTheme, isDarkTheme } = useTheme();

  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <MainLayout toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}>
        <Home />
      </MainLayout>
    </div>
  );
}

export default App;
