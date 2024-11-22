import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { carServiceHeader } from "../../../constants/headers";
import { serviceDay } from "../../../api";
import { ICarService } from "../../../interfaces/interface";

interface ITableBody {
  services: ICarService[];
}

function ServiceTable({ services }: ITableBody) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        height: "80%",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {carServiceHeader.map((item, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {services
            ?.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            )
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: "medium" }}>
                  {serviceDay(item.date)}
                </TableCell>
                <TableCell sx={{ fontSize: "medium" }}>{item.type}</TableCell>
                <TableCell sx={{ fontSize: "medium" }}>
                  {Number(item.mileage.base).toLocaleString()}km
                </TableCell>
                <TableCell sx={{ fontSize: "medium" }}>
                  {item.mileage.next &&
                    Number(item.mileage.next).toLocaleString()}
                  {item.mileage.next && "km"}
                </TableCell>
                <TableCell sx={{ fontSize: "medium" }}>{item.note}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ServiceTable;
