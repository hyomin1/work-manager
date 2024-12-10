import { TableCell, TableHead, TableRow } from "@mui/material";
import { dailyWorkHeaders } from "../../../constants/headers";

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        {dailyWorkHeaders.map((header, index) => (
          <TableCell
            className="border border-r"
            align="center"
            sx={{
              width: `${header === "내용" ? "80%" : "5%"}`,
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
