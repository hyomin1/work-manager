import { TableCell, TableHead, TableRow } from "@mui/material";
import { employeeHeaders } from "../../../constants/headers";

// 근무 현황 테이블 헤더
function TableHeader() {
  return (
    <TableHead>
      <TableRow className="bg-gray-200">
        {employeeHeaders.map((item, index) => (
          <TableCell
            sx={{
              fontWeight: "600",
              whiteSpace: "nowrap",
              fontSize: "large",
            }}
            key={index}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
