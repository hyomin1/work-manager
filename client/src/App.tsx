import { Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import { Outlet } from 'react-router-dom';
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';

function App() {
  return (
    <div>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
