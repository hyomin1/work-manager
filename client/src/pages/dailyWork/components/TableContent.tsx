import React, { useState } from "react";
import { axiosReq } from "../../../api";
import useEmployeeStore from "../../../stores/employeeStore";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { Edit, Trash2 } from "lucide-react";
import DailyWorkEdit from "../DailyWorkEdit";
import DailyWorkView from "../DailyWorkView";

interface EmployeeTableBodyProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: Date | null;
  refetch: () => void;
}

function TableContent({
  setIsOpen,
  currentDate,
  isOpen,
  refetch,
}: EmployeeTableBodyProps) {
  const { dailyWork } = useEmployeeStore();
  const [viewId, setViewId] = useState("");
  const [editingItemId, setEditingItemId] = useState("");

  const deleteDailyWork = async (id: string) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    const response = await axiosReq.delete(
      `/api/employee-inform/dailyWork/remove/${id}`,
    );
    if (response.status === 200) {
      refetch();
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setViewId(""); // View 모달 닫기
    setEditingItemId(id);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteDailyWork(id);
  };

  const handleCellClick = (id: string) => {
    if (!editingItemId) {
      setViewId(id);
    }
  };

  if (!dailyWork?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="text-center text-gray-400">
            등록된 정보가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {dailyWork.map((item) => (
          <TableRow
            key={item._id}
            className="w-[100%] cursor-pointer hover:bg-gray-200 sm:text-sm"
          >
            <TableCell
              onClick={() => handleCellClick(item._id)}
              sx={{
                whiteSpace: "nowrap",
                fontSize: "large",
              }}
            >
              {item.username}
            </TableCell>
            <TableCell
              onClick={() => handleCellClick(item._id)}
              sx={{
                whiteSpace: "nowrap",
                fontSize: "large",
              }}
            >
              {item.department}
            </TableCell>
            <TableCell
              onClick={() => handleCellClick(item._id)}
              className="truncate"
              sx={{
                fontSize: "large",
              }}
            >
              {item.content.slice(0, 80)}
              {item.content.length > 80 && "..."}
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              {item.isOwner && (
                <div className="flex items-center justify-around">
                  <button
                    className="flex items-center hover:opacity-60"
                    onClick={(e) => handleEditClick(e, item._id)}
                  >
                    <Edit className="md:h-4 md:w-4" strokeWidth={2.2} />
                    <span className="ml-1 whitespace-nowrap font-semibold md:text-sm">
                      수정
                    </span>
                  </button>
                  <button
                    className="flex items-center hover:opacity-60"
                    onClick={(e) => handleDeleteClick(e, item._id)}
                  >
                    <Trash2 className="md:h-4 md:w-4" strokeWidth={2.2} />
                    <span className="ml-1 whitespace-nowrap font-semibold md:text-sm">
                      삭제
                    </span>
                  </button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {viewId && !editingItemId && (
        <DailyWorkView
          id={viewId}
          setViewId={setViewId}
          currentDate={currentDate}
        />
      )}
      {editingItemId && (
        <DailyWorkEdit
          setEditingItemId={setEditingItemId}
          refetch={refetch}
          currentDate={currentDate}
          id={editingItemId}
        />
      )}
    </>
  );
}

export default TableContent;
