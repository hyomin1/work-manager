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
import EmployeeTableHeader from "./components/TableHeader";
import DateInput from "./components/DateInput";
import NavigationButtons from "./components/NavigationButtons";

// 근무 현황 조회 전체 화면
function EmployeePage() {
  const { setInform } = useEmployeeStore();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const { data, refetch } = useQuery<IInform[]>({
    queryKey: ["employeeInform"],
    queryFn: () => getEmployeeInform(currentDate || new Date()),
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
            currentDate={currentDate || new Date()}
            setCurrentDate={setCurrentDate}
          />
          <Logout />
        </div>

        <DateInput
          isDatePickerOpen={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          currentDate={currentDate || new Date()}
          setCurrentDate={setCurrentDate}
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
            <EmployeeTableHeader />
            <EmployeeTableBody refetch={refetch} />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeePage;
