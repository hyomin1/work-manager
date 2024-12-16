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

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date());
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, [currentDate]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-4">
      <div className="flex w-[90%] flex-col items-center sm:w-full">
        <div className="relative mb-8 flex w-full items-center justify-between sm:mb-6">
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
          <Table>
            <EmployeeTableHeader />
            <EmployeeTableBody refetch={refetch} />
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default EmployeePage;
