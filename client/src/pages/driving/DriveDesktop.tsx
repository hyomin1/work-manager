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

const cellStyle = {
  padding: "12px 16px",
  fontSize: "0.875rem",
  color: "#334155",
  borderBottom: "1px solid #e2e8f0",
};
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
                  align="center"
                  key={index}
                  sx={{
                    padding: "0.5rem 1.5rem",
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
                  className={`w-full border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <TableCell sx={cellStyle} align="center">
                    {calCarDay(item.driveDay)}
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.username}
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.drivingDestination}
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.startKM.toLocaleString()}km
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.endKM.toLocaleString()}km
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.totalKM.toLocaleString()}km
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.fuelCost ? item.fuelCost.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.toll ? item.toll.toLocaleString() : "-"}
                  </TableCell>
                  <TableCell sx={cellStyle} align="center">
                    {item.etc.cost > 0 ? (
                      <span>
                        {item.etc.cost.toLocaleString()}
                        <span className="ml-1 text-slate-500">
                          ({item.etc.name})
                        </span>
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "8px 16px",
                      borderBottom: "1px solid #e2e8f0",
                    }}
                    align="right"
                  >
                    {item.isOwner && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingItemId(item._id)}
                          className="flex items-center rounded-md px-2 py-1 text-sm font-medium text-blue-600 transition-all hover:bg-slate-100"
                        >
                          <Edit strokeWidth={2} size={14} className="mr-1" />
                          수정
                        </button>
                        <button
                          onClick={() => deleteInform(item._id)}
                          className="flex items-center rounded-md px-2 py-1 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                        >
                          <Trash2 strokeWidth={2} size={14} className="mr-1" />
                          삭제
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
                bottom: 0,
                backgroundColor: "#f8fafc !important",
                transition: "all 0.2s ease-in-out",
                boxShadow: "0 -2px 6px rgba(0,0,0,0.03)",

                "& .MuiTableCell-root": {
                  padding: "14px 16px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#334155",
                  backgroundColor: "inherit",
                  borderTop: "2px solid #e2e8f0",
                  borderBottom: "none",
                },
                "& .total-value": {
                  color: "#4A4A4A  ",
                  fontFamily: "monospace",
                  fontSize: "0.9rem",
                },
                "& .total-label": {
                  fontWeight: 700,
                  color: "#1e293b",
                },
              }}
            >
              <TableCell
                colSpan={5}
                align="center"
                sx={{ fontStyle: "italic" }}
              >
                합계
              </TableCell>
              <TableCell align="center">
                <span className="total-value">
                  {totalDrivingKM.toLocaleString()}
                </span>
                <span className="ml-1 text-slate-600">km</span>
              </TableCell>
              <TableCell align="center">
                <span className="total-value">
                  {totalFuelCost.toLocaleString()}
                </span>
                <span className="ml-1 text-slate-600">원</span>
              </TableCell>
              <TableCell align="center">
                <span className="total-value">
                  {totalToll.toLocaleString()}
                </span>
                <span className="ml-1 text-slate-600">원</span>
              </TableCell>
              <TableCell align="center">
                <span className="total-value">
                  {totalEtcCost.toLocaleString()}
                </span>
                <span className="ml-1 text-slate-600">원</span>
              </TableCell>
              <TableCell align="center">
                <div className="flex items-center justify-center gap-2">
                  <span className="total-label">총계:</span>
                  <span className="total-value text-base">
                    {grandTotal.toLocaleString()}
                    <span className="ml-1 text-slate-600">원</span>
                  </span>
                </div>
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
