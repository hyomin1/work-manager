interface TabHeaderProps {
  headers: string[];
}

function TabHeader({ headers }: TabHeaderProps) {
  return (
    <thead className="w-[100%]">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className={'p-1 border border-black text-xs whitespace-nowrap'}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TabHeader;
