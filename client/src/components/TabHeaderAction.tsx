import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ITabHeaderActionProps {
  isShow: boolean;
}

function TabHeaderAction() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const onClickInputInform = () => {
    navigate("/input");
  };

  const onClickAdmin = () => {
    setIsShow(true);
  };
  return (
    <div className="w-[100%] flex justify-between items-center border border-t-gray-300 rounded-t-2xl">
      <span className="sm:text-lg text-xl w-[50%] font-bold ml-3">현황</span>
      <div className="p-4 items-center flex w-[50%] justify-end">
        <button
          className="sm:whitespace-nowrap bg-[#00ab39] rounded-lg text-white py-2 px-4 button-effect mr-4 sm:mr-2"
          onClick={onClickInputInform}
        >
          입력
        </button>
        <button
          className="sm:whitespace-nowrap bg-[#007BFF] rounded-lg text-white py-2 px-4 hover:opacity-60 ml-4 sm:ml-2 button-effect"
          onClick={onClickAdmin}
        >
          관리
        </button>
        <div className="h-10 border border-gray-300 mx-4" />
        {/* <button onClick={() => refetch()}>
        <SlRefresh className="w-7 h-7 hover:opacity-60" />
      </button> */}
      </div>
    </div>
  );
}

export default TabHeaderAction;
