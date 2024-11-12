import { useState } from "react";
import { Button, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import EmployeeEdit from "../EmployeeEdit";
import { Edit, Trash2 } from "lucide-react";
import { axiosReq } from "../../../api";
import useEmployeeStore from "../../../stores/employeeStore";

interface EmployeeTableBodyProps {
  refetch: () => void;
}

function EmployeeTableBody({ refetch }: EmployeeTableBodyProps) {
  const { inform, currentDate } = useEmployeeStore();
  const [editingItemId, setEditingItemId] = useState("");

  const deleteInform = async (id: string) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }

    const response = await axiosReq.delete(
      `/api/employee-inform/removeInform/${id}`,
    );
    if (response.status === 200) {
      refetch();
    }
  };

  const sortEmployeeInform = () => {
    return inform.sort((a, b) => {
      if (a.destination === b.destination) {
        return a.username.localeCompare(b.username);
      }
      return a.destination.localeCompare(b.destination);
    });
  };

  const destinations = Array.from(
    new Set(inform.map((item) => item.destination)),
  );

  const styleMap = new Map();

  const bgColors = [
    "#F8F9FC", // 진한 흰색 - 광주광역시
    "#EEF6FF", // 맑은 하늘색 - 국립전파연구원
    "#F2EEFF", // 은은한 퍼플 - 농식품공무원교육원
    "#E6FFEF", // 깔끔한 민트 - 농촌진흥청
    "#FFF4E8", // 연한 피치 - 우정사업정보센터
  ];
  destinations.forEach((dest, index) => {
    const colorIndex = index % bgColors.length;
    const color = bgColors[colorIndex];

    const businesses = Array.from(
      new Set(
        inform
          .filter((item) => item.destination === dest)
          .map((item) => item.business),
      ),
    );

    businesses.forEach((bus, busIndex) => {
      const opacity = 1 - busIndex * 0.2; // 투명도: 1, 0.9, 0.8 등으로 설정
      styleMap.set(`${dest}-${bus}`, {
        backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
          color.slice(3, 5),
          16,
        )}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`,
      });
    });
  });

  if (!inform?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6} className="text-center text-gray-400">
            등록된 정보가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {sortEmployeeInform().map((item) => (
        <TableRow
          key={item._id}
          className="w-[100%] sm:text-sm"
          sx={styleMap.get(`${item.destination}-${item.business}`)}
        >
          <TableCell sx={{ fontSize: "large", whiteSpace: "nowrap" }}>
            {item.username}
          </TableCell>
          <TableCell sx={{ fontSize: "large" }}>{item.destination}</TableCell>
          <TableCell sx={{ fontSize: "large" }}>{item.business}</TableCell>
          <TableCell sx={{ fontSize: "large" }}>{item.work}</TableCell>
          <TableCell sx={{ fontSize: "large" }}>{item.car}</TableCell>
          <TableCell sx={{ fontSize: "large" }}>
            {item.remarks && (
              <Tooltip
                title={item.remarks}
                arrow
                placement="left"
                componentsProps={{
                  tooltip: {
                    sx: {
                      maxWidth: "500px",
                      fontSize: "16px",
                      padding: "8px 16px",
                    },
                  },
                }}
              >
                <Button
                  sx={{
                    minWidth: "auto",
                    justifyContent: "flex-start",
                    padding: "0px",
                  }}
                >
                  확인
                </Button>
              </Tooltip>
            )}
          </TableCell>

          <TableCell>
            {item.isOwner && (
              <div className="flex items-center justify-evenly gap-2">
                <button
                  className="flex items-center hover:opacity-60"
                  onClick={() => setEditingItemId(item._id)}
                >
                  <Edit strokeWidth={2.2} />
                  <span className="ml-1 font-semibold">수정</span>
                </button>
                <button
                  className="flex items-center hover:opacity-60"
                  onClick={() => deleteInform(item._id)}
                >
                  <Trash2 strokeWidth={2.2} />
                  <span className="ml-1 font-semibold">삭제</span>
                </button>

                {editingItemId === item._id && (
                  <EmployeeEdit
                    currentDate={currentDate}
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
  );
}

export default EmployeeTableBody;
