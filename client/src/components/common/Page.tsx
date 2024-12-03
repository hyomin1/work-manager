interface IPage {
  totalPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

// 페이지 버튼 (사용 빈도 낮음)
function Page({ totalPage, page, onPageChange }: IPage) {
  return (
    <div className="mt-4">
      {Array.from({ length: totalPage }, (_, index) => (
        <button
          key={index + 1}
          className={`mx-1 rounded px-3 py-1 hover:opacity-60 ${
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
