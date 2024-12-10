import React, { useState, useMemo } from "react";
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

  // 부서별로 데이터 그룹화 및 정렬
  const groupedData = useMemo(() => {
    if (!dailyWork?.length) return [];

    // 1. 부서별로 그룹화
    const grouped = dailyWork.reduce(
      (acc, item) => {
        if (!acc[item.department]) {
          acc[item.department] = [];
        }
        acc[item.department].push(item);
        return acc;
      },
      {} as Record<string, typeof dailyWork>,
    );

    // 2. 각 부서 내에서 이름으로 정렬
    Object.keys(grouped).forEach((dept) => {
      grouped[dept].sort((a, b) => a.username.localeCompare(b.username));
    });

    // 3. 부서 이름으로 정렬하여 최종 배열 생성
    return Object.entries(grouped)
      .sort(([deptA], [deptB]) => deptA.localeCompare(deptB))
      .map(([dept, items]) => ({
        department: dept,
        items,
      }));
  }, [dailyWork]);

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
    setViewId("");
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
          <TableCell
            align="left"
            colSpan={7}
            className="text-center text-gray-400"
          >
            등록된 정보가 없습니다
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {groupedData.map(({ department, items }) =>
          items.map((item, index) => (
            <TableRow key={item._id} className="w-[100%] sm:text-sm">
              {index === 0 && (
                <TableCell
                  className="border border-r-gray-200"
                  align="center"
                  rowSpan={items.length}
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "large",
                    width: "5%",
                    backgroundColor: "rgb(243 244 246)",
                    fontWeight: "bold",
                  }}
                >
                  {department}
                </TableCell>
              )}

              <TableCell
                className="cursor-pointer border border-r-gray-200 group-hover:bg-gray-200"
                align="center"
                onClick={() => handleCellClick(item._id)}
                sx={{
                  whiteSpace: "nowrap",
                  fontSize: "large",
                  width: "5%",
                }}
              >
                {item.username}
              </TableCell>

              <TableCell
                align="left"
                onClick={() => handleCellClick(item._id)}
                className="cursor-pointer truncate border border-r-gray-200 hover:bg-gray-200 group-hover:bg-gray-200"
                sx={{
                  fontSize: "large",
                }}
              >
                {item.content.slice(0, 115)}
                {item.content.length > 115 && "..."}
              </TableCell>

              <TableCell
                sx={{ width: "5%" }}
                align="right"
                onClick={(e) => e.stopPropagation()}
              >
                {item.isOwner && (
                  <div className="flex items-center justify-end">
                    <button
                      className="mr-2 flex items-center hover:opacity-60"
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
          )),
        )}
      </TableBody>

      {viewId && !editingItemId && (
        <DailyWorkView
          id={viewId}
          setViewId={setViewId}
          currentDate={currentDate}
          refetch={refetch}
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
