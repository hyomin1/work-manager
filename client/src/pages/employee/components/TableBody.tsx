import { useState } from "react";
import { Button, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import EmployeeEdit from "../EmployeeEdit";
import { Edit, Trash2 } from "lucide-react";
import { axiosReq } from "../../../api";
import useEmployeeStore from "../../../stores/employeeStore";

interface EmployeeTableBodyProps {
  refetch: () => void;
}

interface IEmployee {
  _id: string;
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  remarks?: string;
  isOwner: boolean;
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
    return [...inform].sort((a, b) => {
      // 먼저 방문지로 정렬
      const destinationCompare = a.destination.localeCompare(b.destination);
      if (destinationCompare !== 0) return destinationCompare;

      // 같은 방문지 내에서 사업명으로 정렬
      const businessCompare = a.business.localeCompare(b.business);
      if (businessCompare !== 0) return businessCompare;

      // 같은 방문지, 같은 사업명 내에서 업무로 정렬
      const workCompare = a.work.localeCompare(b.work);
      if (workCompare !== 0) return workCompare;

      // 마지막으로 사용자 이름으로 정렬
      return a.username.localeCompare(b.username);
    });
  };

  const getRowSpans = (items: IEmployee[]) => {
    const spans = new Map<string, number>();
    let currentDestination: string | null = null;
    let currentBusiness: string | null = null;
    // let currentWork: string | null = null;

    let destSpan = 1;
    let businessSpan = 1;
    //let workSpan = 1;

    items.forEach((item: IEmployee, index: number) => {
      if (item.destination === currentDestination) {
        destSpan++;
        spans.set(`${index}-destination`, 0);
      } else {
        if (currentDestination !== null) {
          spans.set(`${index - destSpan}-destination`, destSpan);
        }
        currentDestination = item.destination;
        destSpan = 1;
      }

      if (
        item.business === currentBusiness &&
        item.destination === currentDestination
      ) {
        businessSpan++;
        spans.set(`${index}-business`, 0);
      } else {
        if (currentBusiness !== null) {
          spans.set(`${index - businessSpan}-business`, businessSpan);
        }
        currentBusiness = item.business;
        businessSpan = 1;
      }

      // if (
      //   item.destination === currentDestination &&
      //   item.business === currentBusiness &&
      //   item.work === currentWork
      // ) {
      //   workSpan++;
      //   spans.set(`${index}-work`, 0);
      // } else {
      //   if (currentWork !== null) {
      //     spans.set(`${index - workSpan}-work`, workSpan);
      //   }
      //   currentWork = item.work;
      //   workSpan = 1;
      // }

      if (index === items.length - 1) {
        spans.set(`${index - destSpan + 1}-destination`, destSpan);
        spans.set(`${index - businessSpan + 1}-business`, businessSpan);
        // spans.set(`${index - workSpan + 1}-work`, workSpan);
      }
    });

    return spans;
  };

  const destinations = Array.from(
    new Set(inform.map((item) => item.destination)),
  ).sort((a, b) => a.localeCompare(b));

  const styleMap = new Map<string, { backgroundColor: string }>();
  const bgColors = ["#F8F9FC", "#EEF6FF", "#F2EEFF", "#E6FFEF", "#FFF4E8"];

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
      const opacity = 1 - busIndex * 0.2;
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
          <TableCell colSpan={7} className="text-center text-gray-400">
            등록된 정보가 없습니다.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const sortedData = sortEmployeeInform();
  const rowSpans = getRowSpans(sortedData);

  return (
    <TableBody>
      {sortedData.map((item, index) => (
        <TableRow
          key={item._id}
          className="w-[100%] sm:text-sm"
          sx={styleMap.get(`${item.destination}-${item.business}`)}
        >
          <TableCell sx={{ fontSize: "large", whiteSpace: "nowrap" }}>
            {item.username}
          </TableCell>

          {rowSpans.get(`${index}-destination`) !== 0 && (
            <TableCell
              rowSpan={rowSpans.get(`${index}-destination`)}
              sx={{ fontSize: "large" }}
            >
              {item.destination}
            </TableCell>
          )}

          {rowSpans.get(`${index}-business`) !== 0 && (
            <TableCell
              rowSpan={rowSpans.get(`${index}-business`)}
              sx={{ fontSize: "large" }}
            >
              {item.business}
            </TableCell>
          )}
          <TableCell sx={{ fontSize: "large" }}>{item.work}</TableCell>
          {/* {rowSpans.get(`${index}-work`) !== 0 && (
            <TableCell
              rowSpan={rowSpans.get(`${index}-work`)}
              sx={{ fontSize: "large" }}
            >
              {item.work}
            </TableCell>
          )} */}
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
                  <span className="ml-1 whitespace-nowrap font-semibold">
                    수정
                  </span>
                </button>
                <button
                  className="flex items-center hover:opacity-60"
                  onClick={() => deleteInform(item._id)}
                >
                  <Trash2 strokeWidth={2.2} />
                  <span className="ml-1 whitespace-nowrap font-semibold">
                    삭제
                  </span>
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
