import { TableCell, TableHead } from "@mui/material";
import React from "react";

type Props = {
  headers: string[];
};

export default function TableHeader({ headers }: Props) {
  return (
    <TableHead>
      {headers.map((header, index) => (
        <TableCell
          sx={{
            padding: "16px 20px",
            background: "white",
            borderBottom: "2px solid #E2E8F0",
            fontWeight: 600,
            fontSize: {
              xs: "14px",
              sm: "15px",
              md: "16px",
            },
            letterSpacing: "0.025em",
            color: "#334155",
            textAlign: "center",
            whiteSpace: "nowrap",
            "&:first-of-type": {
              borderTopLeftRadius: "12px",
            },
            "&:last-child": {
              borderTopRightRadius: "12px",
            },
          }}
          key={index}
        >
          {header}
        </TableCell>
      ))}
    </TableHead>
  );
}
