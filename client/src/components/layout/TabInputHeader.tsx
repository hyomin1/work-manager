interface TabInputHeaderProps {
  headers: string[];
}

// 입력 테이블 컴포넌트
function TabInputHeader({ headers }: TabInputHeaderProps) {
  return (
    <thead>
      <tr className="bg-gray-200 sm:hidden">
        {headers.map((header, index) => (
          <th key={index} className="border-b border-r border-gray-300 p-4">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TabInputHeader;
