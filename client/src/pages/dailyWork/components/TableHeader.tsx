import { TableCell, TableHead, TableRow } from "@mui/material";
import { dailyWorkHeaders } from "../../../constants/headers";

function TableHeader() {
  return (
    <TableHead>
      <TableRow
        sx={{
          "& th:first-of-type": {
            borderTopLeftRadius: "8px",
          },
          "& th:last-child": {
            borderTopRightRadius: "8px",
          },
        }}
      >
        {dailyWorkHeaders.map((header, index) => (
          <TableCell
            key={index}
            align="center"
            className="py-4"
            sx={{
              width: `${header === "내용" ? "80%" : "5%"}`,
              fontSize: "0.95rem",

              fontWeight: 600,

              whiteSpace: "nowrap",
              "@media (max-width: 640px)": {
                fontSize: "0.875rem",
                py: 3,
              },
            }}
          >
            <div className="flex items-center justify-center">{header}</div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
