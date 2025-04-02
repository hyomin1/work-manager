import { Paper, TableContainer, Table } from "@mui/material";
import { WORK_STATUS_HEADERS } from "../../constants/headers";
import TableHeader from "./TableHeader";

export default function TableComponent() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      }}
      className="shadow-custom-shadow"
    >
      <Table>
        <TableHeader headers={WORK_STATUS_HEADERS} />
      </Table>
    </TableContainer>
  );
}
