import React from "react";

interface IPage {
  totalPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

function Page({ totalPage, page, onPageChange }: IPage) {
  return (
    <div>
      {Array.from({ length: totalPage }, (_, index) => (
        <button
          key={index + 1}
          className={`mx-1 px-3 py-1 rounded hover:opacity-60 ${
            page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Page;
