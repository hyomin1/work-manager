import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
