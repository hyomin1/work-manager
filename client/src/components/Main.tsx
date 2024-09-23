import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Main() {
  const data = [
    {
      name: "이효민",
      destination: "광주 남구",
      status: "수리",
      vehicle: "아반테",
      date: "2024-02-07",
    },
    {
      name: "김철수",
      destination: "서울 강남",
      status: "정상",
      vehicle: "소나타",
      date: "2024-02-05",
    },
    {
      name: "박지민",
      destination: "부산 해운대",
      status: "대기",
      vehicle: "스포티지",
      date: "2024-02-08",
    },
    {
      name: "최영수",
      destination: "대구 중구",
      status: "완료",
      vehicle: "모닝",
      date: "2024-02-10",
    },
    {
      name: "이영희",
      destination: "제주도",
      status: "수리",
      vehicle: "티코",
      date: "2024-02-11",
    },
    {
      name: "홍길동",
      destination: "서울 용산",
      status: "정상",
      vehicle: "그랜저",
      date: "2024-02-12",
    },
    {
      name: "박상훈",
      destination: "대전 중구",
      status: "대기",
      vehicle: "K5",
      date: "2024-02-13",
    },
    {
      name: "김민재",
      destination: "인천 연수구",
      status: "완료",
      vehicle: "아반떼",
      date: "2024-02-14",
    },
    {
      name: "이수진",
      destination: "부산 사하구",
      status: "수리",
      vehicle: "모닝",
      date: "2024-02-15",
    },
    {
      name: "정우성",
      destination: "서울 강서구",
      status: "정상",
      vehicle: "소나타",
      date: "2024-02-16",
    },
    {
      name: "차은우",
      destination: "경기도 수원",
      status: "대기",
      vehicle: "스포티지",
      date: "2024-02-17",
    },
    {
      name: "이정현",
      destination: "광주 광산구",
      status: "완료",
      vehicle: "아반떼",
      date: "2024-02-18",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const today = new Date();
  const formatDate = today.toLocaleDateString("ko-KR");

  const navigate = useNavigate();

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onClickInputInform = () => {
    navigate("/input");
  };

  const onClickAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center p-10">
      <div className="w-[80%] flex flex-col items-center">
        <div className="mb-4 flex items-center justify-between w-[100%]">
          <IoIosArrowBack className="w-8 h-8 hover:opacity-60" />

          <span className="mb-4 font-bold text-3xl">{formatDate}</span>
          <IoIosArrowForward className="w-8 h-8 hover:opacity-60" />
        </div>
        <table className="w-[100%] rounded-2xl shadow-lg text-left">
          <thead className="">
            <tr className="bg-white">
              <th className="p-4 text-xl">현황</th>
              <th></th>
              <th></th>
              <th></th>
              <th className="p-4 flex justify-evenly">
                <button
                  className="bg-[#00ab39] rounded-lg text-white py-2 px-4 hover:opacity-60"
                  onClick={onClickInputInform}
                >
                  정보 입력
                </button>
                <button onClick={onClickAdmin}>관리자</button>
              </th>
            </tr>
            <tr className="bg-gray-200">
              <th className="p-4 border-b border-gray-300">이름</th>
              <th className="p-4 border-b border-gray-300">행선지</th>
              <th className="p-4 border-b border-gray-300">상태</th>
              <th className="p-4 border-b border-gray-300">차량</th>
              <th className="p-4 border-b border-gray-300">날짜</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-4 border-b border-gray-200">{item.name}</td>
                <td className="p-4 border-b border-gray-200">
                  {item.destination}
                </td>
                <td className="p-4 border-b border-gray-200">{item.status}</td>
                <td className="p-4 border-b border-gray-200">{item.vehicle}</td>
                <td className="p-4 border-b border-gray-200">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 rounded hover:opacity-60 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Main;
