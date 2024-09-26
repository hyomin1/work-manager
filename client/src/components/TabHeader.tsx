interface TabHeaderProps {
  headers: string[];
}

function TabHeader({ headers }: TabHeaderProps) {
  return (
    <thead className="w-[100%]">
      <tr className="bg-gray-200 sm:text-xs">
        {headers.map((header, index) => (
          <th
            key={index}
            className="p-4 border-b border-gray-300 sm:whitespace-nowrap"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TabHeader;
