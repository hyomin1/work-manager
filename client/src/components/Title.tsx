import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ITitleProps {
  previous: () => void;
  next: () => void;
  calDate?: (arg0: Date) => string;
  calYearMonth?: (arg0: Date) => string;
}

function Title({ previous, next, calDate, calYearMonth }: ITitleProps) {
  //currentDate를 넘길지 말지 생각하기

  const [currentDate, setCurrentDate] = useState(new Date());
  const selectMonth = () => {};

  return (
    <div className="mt-4 mb-8 flex items-center justify-center w-[100%] ">
      <button onClick={previous} className="hover:opacity-60">
        <IoIosArrowBack className="w-8 h-9" />
      </button>
      <button>
        <span
          onClick={selectMonth}
          className="font-bold sm:text-xl text-3xl mx-8 hover:opacity-70"
        >
          {calYearMonth && calYearMonth(currentDate)}{" "}
          {calYearMonth && "차량운행일지"}
        </span>
      </button>

      <button onClick={next} className="hover:opacity-60">
        <IoIosArrowForward className="w-8 h-9" />
      </button>
    </div>
  );
}

export default Title;
