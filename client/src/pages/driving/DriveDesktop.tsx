import { useState } from "react";
import { IDrivingInform } from "../../interfaces/interface";
import { drivingHeaders } from "../../constants/headers";
import { axiosReq, calCarDay } from "../../api";
import { Edit, Trash2 } from "lucide-react";
import EditDrivingInform from "./DriveEdit";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import DrivePrint from "./DrivePrint";

interface IDrivePCProps {
  drivingInform: IDrivingInform[];
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalDrivingKM: number;
  totalFuelCost: number;
  totalToll: number;
  totalEtcCost: number;
  grandTotal: number;
  refetch: () => void;
}
// 차량운행일지 PC 화면
function DrivePC({
  drivingInform,
  indexOfFirstItem,
  indexOfLastItem,
  totalDrivingKM,
  totalFuelCost,
  totalToll,
  grandTotal,
  totalEtcCost,
  refetch,
}: IDrivePCProps) {
  const [editingItemId, setEditingItemId] = useState("");

  const deleteInform = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/driving-inform/removeInform/${id}`,
      );
      if (res.status === 200) {
        refetch();
      }
    }
  };

  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: "#f5f7f9",
        }}
        component={Paper}
        className={`print:hidden`}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {drivingHeaders.map((item, index) => (
                <TableCell
                  className="border border-t-0 border-gray-300"
                  align="center"
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
          <TableBody>
            {drivingInform
              ?.sort((a, b) => {
                if (
                  new Date(a.driveDay).getTime() ===
                  new Date(b.driveDay).getTime()
                ) {
                  return a.startKM - b.startKM;
                }
                return (
                  new Date(a.driveDay).getTime() -
                  new Date(b.driveDay).getTime()
                );
              })
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .map((item, index) => (
                <TableRow
                  key={index}
                  className={`w-[100%] sm:text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-200"
                  }`}
                >
                  <TableCell className="border border-gray-300" align="center">
                    {calCarDay(item.driveDay)}
                  </TableCell>
                  <TableCell
                    className="whitespace-nowrap border border-gray-300"
                    align="center"
                  >
                    {item.username}
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.drivingDestination}
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.startKM.toLocaleString()}km
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.endKM.toLocaleString()}km
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.totalKM.toLocaleString()}km
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.fuelCost ? item.fuelCost.toLocaleString() : ""}
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.toll ? item.toll.toLocaleString() : ""}
                  </TableCell>
                  <TableCell className="border border-gray-300" align="center">
                    {item.etc.cost > 0 &&
                      `${item.etc.cost.toLocaleString()}(${item.etc.name})`}
                  </TableCell>
                  <TableCell align="right" className="border border-gray-300">
                    {item.isOwner && (
                      <div className="flex justify-end">
                        <button
                          className="mr-4 flex items-center hover:opacity-60"
                          onClick={() => setEditingItemId(item._id)}
                        >
                          <Edit strokeWidth={2.2} size={15} />
                          <span className="ml-1 whitespace-nowrap font-semibold">
                            수정
                          </span>
                        </button>
                        <button
                          className="flex items-center whitespace-nowrap hover:opacity-60"
                          onClick={() => deleteInform(item._id)}
                        >
                          <Trash2 strokeWidth={2.2} size={15} />
                          <span className="ml-1 font-semibold">삭제</span>
                        </button>
                        {editingItemId === item._id && (
                          <EditDrivingInform
                            item={item}
                            setEditingItemId={setEditingItemId}
                          />
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow
              sx={{
                position: "sticky",
                background: "#f5f5f5",
                "& .MuiTableCell-root": {
                  fontWeight: 600,
                  backgroundColor: "#f5f5f5",
                  fontSize: "0.85rem",
                },
              }}
            >
              <TableCell
                className="border border-gray-300"
                colSpan={5}
                align="center"
              />
              <TableCell className="border border-gray-300" align="center">
                {totalDrivingKM.toLocaleString()}km
              </TableCell>
              <TableCell className="border border-gray-300" align="center">
                {totalFuelCost.toLocaleString()}
              </TableCell>
              <TableCell className="border border-gray-300" align="center">
                {totalToll.toLocaleString()}
              </TableCell>
              <TableCell className="border border-gray-300" align="center">
                {totalEtcCost.toLocaleString()}
              </TableCell>
              <TableCell className="border border-gray-300" align="center">
                총계: {grandTotal.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <DrivePrint
        drivingInform={drivingInform}
        indexOfFirstItem={indexOfFirstItem}
        indexOfLastItem={indexOfLastItem}
      />
    </>
  );
}

export default DrivePC;
