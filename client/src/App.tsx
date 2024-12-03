import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";

// 프로젝트 시작 화면
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
