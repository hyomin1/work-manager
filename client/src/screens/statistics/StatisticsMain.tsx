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
import { getUserStatistics } from "../../api";

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

  console.log(statisticsData);

  return (
    <div className="flex flex-col items-center  w-full h-screen p-10 sm:p-2 bg-gray-50 ">
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
              <TableCell>이름</TableCell>
              <TableCell>방문지</TableCell>
              <TableCell>사업명</TableCell>
              <TableCell>차량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statisticsData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.destination}</TableCell>
                <TableCell>{item.business}</TableCell>
                <TableCell>{item.work}</TableCell>
                <TableCell>{item.car}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StatisticsMain;
