import { TableCell, TableHead, TableRow } from "@mui/material";
import { dailyWorkHeaders } from "../../../constants/headers";

function TableHeader() {
  return (
    <TableHead>
      <TableRow className="bg-gray-200">
        {dailyWorkHeaders.map((header, index) => (
          <TableCell
            sx={{
              fontWeight: "600",
              whiteSpace: "nowrap",
              fontSize: "large",
            }}
            key={index}
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
