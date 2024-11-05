import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Paper, Table, TableContainer } from "@mui/material";

import { REFETCH_INTERVAL } from "../../constants/constant";
import { calculateDate, getEmployeeInform } from "../../api";

import { IInform } from "../../interfaces/interface";

import useEmployeeStore from "../../stores/employeeStore";

import ArrowBack from "../../components/common/ArrowBack";
import Title from "../../components/layout/Title";
import Logout from "../auth/Logout";

import EmployeeTableBody from "./components/TableBody";
import EmployeeTableHead from "./components/TableHead";
import DateInput from "./components/DateInput";
import NavigationButtons from "./components/NavigationButtons";

function EmployeePage() {
  const { setInform, currentDate } = useEmployeeStore();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { data, refetch } = useQuery<IInform[]>({
    queryKey: ["employeeInform"],
    queryFn: () => getEmployeeInform(currentDate),
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    if (data) {
      setInform(data);
    }
  }, [data, setInform]);

  useEffect(() => {
    if (currentDate) {
      refetch();
    }
  }, [currentDate, refetch]);

  return (
    <div className="flex h-screen w-full flex-col items-center bg-gradient-to-br from-zinc-50 to-slate-100 p-10 sm:p-2">
      <div className="flex h-full w-[90%] flex-col items-center sm:w-full">
        <div className="mb-8 mt-2 flex w-full items-center justify-between sm:mt-4">
          <ArrowBack type="home" />
          <Title
            setShowInput={setIsDatePickerOpen}
            calDate={calculateDate}
            category="employee"
          />
          <Logout />
        </div>

        <DateInput
          isDatePickerOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
        />

        <NavigationButtons refetch={refetch} />

        <TableContainer
          component={Paper}
          sx={{
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          }}
          className="shadow-custom-shadow"
        >
          <Table stickyHeader>
            <EmployeeTableHead />
            <EmployeeTableBody refetch={refetch} />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeePage;
