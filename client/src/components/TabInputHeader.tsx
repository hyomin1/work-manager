import React from "react";
interface TabInputHeaderProps {
  headers: string[];
}

function TabInputHeader({ headers }: TabInputHeaderProps) {
  return (
    <thead>
      <tr className="bg-gray-200 sm:hidden">
        {headers.map((header, index) => (
          <th key={index} className="p-4 border-b border-r border-gray-300">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TabInputHeader;
