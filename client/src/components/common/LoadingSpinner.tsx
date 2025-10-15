import { Loader2 } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader2 />
    </div>
  );
}

export default LoadingSpinner;
