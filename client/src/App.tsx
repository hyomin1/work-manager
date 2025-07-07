import { Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import { Outlet } from 'react-router-dom';

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
