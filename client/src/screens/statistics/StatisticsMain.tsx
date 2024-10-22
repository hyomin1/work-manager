import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useState } from "react";
import StatisticsTab from "./StatisticsTab";
import { IStat } from "../../interfaces/interface";
import { useQuery } from "@tanstack/react-query";
import { calDate, getUserStatistics } from "../../api";
import ArrowBack from "../../components/ArrowBack";
import Logout from "../auth/Logout";

function StatisticsMain() {
  // 0: 이름 검색, 1: 방문지 검색
  const [value, setValue] = useState(0);

  const [username, setUserName] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());

  const { data: statisticsData, refetch } = useQuery<IStat[]>({
    queryKey: ["statistics", username, date],
    queryFn: () => getUserStatistics(username, date),
    enabled: false,
  });

  return (
    <div className="flex flex-col items-center w-full h-screen p-10 sm:p-2 bg-gray-50 ">
      <div className="sm:w-full w-full flex flex-col items-center">
        <div className="flex items-center justify-between w-full mt-2 mb-8 sm:mt-4">
          <ArrowBack type="" />

          <span className="font-bold  sm:text-sm md:text-3xl md:mx-8 sm:mx-1 whitespace-nowrap">
            {calDate(date)}
          </span>
          <Logout />
        </div>
      </div>

      <StatisticsTab
        value={value}
        setValue={setValue}
        username={username}
        setUserName={setUserName}
        destination={destination}
        setDestination={setDestination}
        date={date}
        setDate={setDate}
        refetch={refetch}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  fontSize: "large",
                }}
              >
                이름
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  fontSize: "large",
                }}
              >
                방문지
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  fontSize: "large",
                }}
              >
                사업명
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  fontSize: "large",
                }}
              >
                업무
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "800",
                  whiteSpace: "nowrap",
                  fontSize: "large",
                }}
              >
                차량
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 이름 검색 */}
            {value === 0 &&
              statisticsData
                ?.sort((a, b) => a.destination.localeCompare(b.destination))
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {item.username}
                    </TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.business}</TableCell>
                    <TableCell>{item.work}</TableCell>
                    <TableCell>{item.car}</TableCell>
                  </TableRow>
                ))}
            {/* 방문지 검색 */}
            {value === 1 && <></>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StatisticsMain;
