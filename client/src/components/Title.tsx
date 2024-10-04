import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ITitleProps {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  calDate?: (arg0: Date) => string;
  calYearMonth?: (arg0: Date) => string;
}

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
      <div className=" flex items-center justify-center w-[100%]">
        <button onClick={previous} className="hover:opacity-60 print-hidden">
          <IoIosArrowBack className="w-8 h-9 sm:w-6 sm:h-6" />
        </button>
        <button>
          <span
            onClick={selectDate}
            className="font-bold  md:text-3xl md:mx-8 sm:mx-2  hover:opacity-70 whitespace-nowrap"
          >
            {category === "driving" &&
              calYearMonth &&
              calYearMonth(currentDate)}
            {category === "driving" && " 차량운행일지"}
            {category === "employee" && calDate && calDate(currentDate)}
          </span>
        </button>

        <button onClick={next} className="hover:opacity-60 print-hidden">
          <IoIosArrowForward className="w-8 h-9 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}

export default Title;
