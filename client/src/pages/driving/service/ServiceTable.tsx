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
import { axiosReq, serviceDay } from "../../../api";
import { ICarService } from "../../../interfaces/interface";
import { Edit, Trash2 } from "lucide-react";
import ServiceEdit from "./ServiceEdit";
import { useState } from "react";

interface ITableBody {
  services: ICarService[];
  refetch: () => void;
}

function ServiceTable({ services, refetch }: ITableBody) {
  const [editingItemId, setEditingItemId] = useState("");

  const recentByType = services.reduce(
    (acc, service) => {
      const { type, date } = service;
      if (
        !acc[type] ||
        new Date(date).getTime() > new Date(acc[type].date).getTime()
      ) {
        acc[type] = service;
      }
      return acc;
    },
    {} as Record<string, ICarService>,
  );

  const deleteService = async (id: string) => {
    const isConfirm = window.confirm("삭제하시겠습니까?");
    if (isConfirm) {
      const res = await axiosReq.delete(
        `/api/driving-inform/removeService/${id}`,
      );
      if (res.status === 200) {
        refetch();
      }
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        backgroundColor: "#F8F9FC",
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
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
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
                <TableCell
                  sx={{
                    fontSize: "medium",
                    color:
                      recentByType[item.type]?.date === item.date
                        ? "red"
                        : "inherit",
                    fontWeight:
                      recentByType[item.type]?.date === item.date
                        ? "bold"
                        : "inherit",
                  }}
                >
                  {item.mileage.next &&
                    Number(item.mileage.next).toLocaleString()}
                  {item.mileage.next && "km"}
                </TableCell>
                <TableCell sx={{ fontSize: "medium" }}>{item.note}</TableCell>
                <TableCell sx={{ fontSize: "medium" }}>
                  {item.isOwner && (
                    <div className="flex justify-end">
                      <button
                        className="mr-4 flex items-center hover:opacity-60"
                        onClick={() => setEditingItemId(item._id)}
                      >
                        <Edit strokeWidth={2.2} size={15} />
                        <span className="ml-1 font-semibold">수정</span>
                      </button>
                      <button
                        className="flex items-center hover:opacity-60"
                        onClick={() => deleteService(item._id)}
                      >
                        <Trash2 strokeWidth={2.2} size={15} />
                        <span className="ml-1 font-semibold">삭제</span>
                      </button>
                      {editingItemId === item._id && (
                        <ServiceEdit
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
      </Table>
    </TableContainer>
  );
}

export default ServiceTable;
