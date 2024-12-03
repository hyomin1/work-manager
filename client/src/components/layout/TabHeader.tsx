interface TabHeaderProps {
  headers: string[];
}

// 테이블 헤더 컴포넌트
function TabHeader({ headers }: TabHeaderProps) {
  return (
    <thead className="w-[100%]">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className={"whitespace-nowrap border border-black p-1 text-xs"}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TabHeader;
