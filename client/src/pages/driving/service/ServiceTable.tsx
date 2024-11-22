import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { carServiceHeader } from "../../../constants/headers";
import { getCars } from "../../../api";
import { ICars } from "../../../interfaces/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function ServiceTable() {
  const [car, setCar] = useState("차량 선택");

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["car", 1],
    queryFn: getCars,
  });

  const handleChangeCar = (e: SelectChangeEvent) => {
    setCar(e.target.value as string);
  };

  return (
    <div className="h-full w-full">
      <div className="flex w-full flex-col">
        <div className="print-hidden flex w-[100%] items-center rounded-t-2xl border border-t-gray-300 sm:h-auto sm:flex-col md:h-16 md:justify-between">
          <div className="flex items-center sm:w-full sm:flex-col sm:p-3 md:ml-2 md:h-full md:w-[50%] md:justify-between">
            <FormControl fullWidth>
              <InputLabel id="car">차량 선택</InputLabel>
              <Select
                id="car"
                labelId="car"
                value={car}
                label="차량 선택"
                onChange={handleChangeCar}
                className="h-10 w-[20%]"
              >
                {cars &&
                  cars
                    .sort((a, b) => a.car.localeCompare(b.car))
                    .map((car) => (
                      <MenuItem key={car._id} value={car._id}>
                        {car.car}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {carServiceHeader.map((item, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "800",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ServiceTable;
