import { CircularProgress } from '@mui/material';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <CircularProgress />
    </div>
  );
}

export default LoadingSpinner;
