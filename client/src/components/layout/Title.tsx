import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ITitleProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  calDate?: (arg0: Date) => string;
  calYearMonth?: (arg0: Date) => string;
}

// 날짜 타이틀
function Title({
  calDate,
  calYearMonth,
  category,
  currentDate,
  setCurrentDate,

  setShowInput,
}: ITitleProps) {
  const previous = () => {
    const prevDate = new Date(currentDate);
    if (category === "employee") {
      prevDate.setDate(prevDate.getDate() - 1);
    } else if (category === "driving") {
      prevDate.setMonth(prevDate.getMonth() - 1);
    }
    setCurrentDate(prevDate);

    setShowInput(false);
  };

  const next = () => {
    const prevDate = new Date(currentDate);
    if (category === "employee") {
      prevDate.setDate(prevDate.getDate() + 1);
    } else if (category === "driving") {
      prevDate.setMonth(prevDate.getMonth() + 1);
    }
    setCurrentDate(prevDate);
  };

  const selectDate = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div>
      <div className="flex w-[100%] items-center justify-center">
        <button onClick={previous} className="print-hidden hover:opacity-60">
          <IoIosArrowBack className="h-8 w-8 sm:h-4 sm:w-4" />
        </button>
        <button>
          <span
            onClick={selectDate}
            className="whitespace-nowrap font-bold hover:opacity-70 sm:mx-1 md:mx-8 md:text-3xl"
          >
            {category === "driving" &&
              calYearMonth &&
              calYearMonth(currentDate)}
            {category === "driving" && " 차량운행일지"}
            {category === "employee" && calDate && calDate(currentDate)}
          </span>
        </button>

        <button onClick={next} className="print-hidden hover:opacity-60">
          <IoIosArrowForward className="h-8 w-8 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
}

export default Title;
