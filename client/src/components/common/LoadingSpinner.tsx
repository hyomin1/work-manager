import { CircularProgress } from "@mui/material";

// 로딩 원형 바
function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <CircularProgress />
    </div>
  );
}

export default LoadingSpinner;
