import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ArrowBack() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-[15%]">
      <ArrowLeft
        onClick={goBack}
        className="w-12 h-8 hover:opacity-60 print-hidden"
      />
    </div>
  );
}

export default ArrowBack;
