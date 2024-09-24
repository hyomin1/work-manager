import React from "react";

interface IAddData {
  setIsName?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDestination?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBusiness?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWork?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCar?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

function AddData({
  setIsName,
  setIsDestination,
  setIsBusiness,
  setIsWork,
  setIsCar,
  type,
}: IAddData) {
  const onSubmit = () => {};
  const handleCancel = () => {
    switch (type) {
      case "name":
        console.log(type);
        if (setIsName) setIsName(false);
        break;
      case "destination":
        if (setIsDestination) setIsDestination(false);
        break;
      case "business":
        if (setIsBusiness) setIsBusiness(false);
        break;
      case "work":
        if (setIsWork) setIsWork(false);
        break;
      case "car":
        if (setIsCar) setIsCar(false);
        break;
      default:
        console.log("Invalid type");
        break;
    }
  };
  const handleOnChange = () => {};
  return (
    <div className="w-full h-screen flex items-center justify-center absolute z-10  bg-black bg-opacity-65 top-0">
      <form
        className="flex flex-col w-96 h-80 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="text-center text-xl font-bold mb-4">{type} 등록</h2>
        <input placeholder="아이디" className="mb-4 p-2 border rounded" />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-80"
          >
            등록
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 py-2 px-4 rounded hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddData;
