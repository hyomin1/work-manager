import React from "react";

interface CustomSelectProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  className?: string;
}

// 선택 박스 (사용 빈도 낮음)
function SelectBox({
  onChange,
  options,
  placeholder,
  className = "",
}: CustomSelectProps) {
  return (
    <select
      defaultValue=""
      onChange={onChange}
      className={`w-[100%] rounded-md border p-2 hover:opacity-60 ${className}`}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
