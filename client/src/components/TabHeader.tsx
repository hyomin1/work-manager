interface TabHeaderProps {
  headers: string[];
  category: string;
}

function TabHeader({ headers, category }: TabHeaderProps) {
  return (
    <thead className="w-[100%]">
      <tr
        className={`bg-gray-200 ${
          category === "driving" && "md:text-xs"
        } sm:text-xs  whitespace-nowrap`}
      >
        {headers.map((header, index) => (
          <th
            key={index}
            className={`${
              category === "driving" ? "p-1" : "md:p-4 sm:p-2"
            } border-b border-gray-300 sm:whitespace-nowrap`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TabHeader;
