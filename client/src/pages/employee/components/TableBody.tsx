import { useState } from "react";
import { Button, TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import EmployeeEdit from "../EmployeeEdit";
import { Edit, FileText, Trash2 } from "lucide-react";
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
      const destinationCompare = a.destination.localeCompare(b.destination);
      if (destinationCompare !== 0) return destinationCompare;
      const businessCompare = a.business.localeCompare(b.business);
      if (businessCompare !== 0) return businessCompare;
      const workCompare = a.work.localeCompare(b.work);
      if (workCompare !== 0) return workCompare;
      const carCompare = a.car.localeCompare(b.car);
      if (carCompare !== 0) return carCompare;
      return a.username.localeCompare(b.username);
    });
  };

  const getRowSpans = (items: IEmployee[]) => {
    const spans = new Map<string, number>();
    let prevName: string | null = null;
    let prevDestination: string | null = null;
    let prevBusiness: string | null = null;
    let prevWork: string | null = null;
    let prevCar: string | null = null;

    let nameSpan = 1;
    let destSpan = 1;
    let businessSpan = 1;
    let workSpan = 1;
    let carSpan = 1;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (
        i > 0 &&
        item.destination === prevDestination &&
        item.username === prevName
      ) {
        nameSpan++;
        spans.set(`${i}-name`, 0);
      } else {
        if (i > 0) {
          spans.set(`${i - nameSpan}-name`, nameSpan);
        }
        nameSpan = 1;
      }

      if (i > 0 && item.destination === prevDestination) {
        destSpan++;
        spans.set(`${i}-destination`, 0);
      } else {
        if (i > 0) {
          spans.set(`${i - destSpan}-destination`, destSpan);
        }
        destSpan = 1;
      }
      if (
        i > 0 &&
        item.business === prevBusiness &&
        item.destination === prevDestination
      ) {
        businessSpan++;
        spans.set(`${i}-business`, 0);
      } else {
        if (i > 0) {
          spans.set(`${i - businessSpan}-business`, businessSpan);
        }
        businessSpan = 1;
      }

      if (
        i > 0 &&
        item.work === prevWork &&
        //item.business === prevBusiness &&
        item.destination === prevDestination
      ) {
        workSpan++;
        spans.set(`${i}-work`, 0);
      } else {
        if (i > 0) {
          spans.set(`${i - workSpan}-work`, workSpan);
        }
        workSpan = 1;
      }

      if (
        i > 0 &&
        //item.work === prevWork &&
        //item.business === prevBusiness &&
        item.destination === prevDestination &&
        (item.car === prevCar || item.car === "" || prevCar === "")
      ) {
        carSpan++;
        spans.set(`${i}-car`, 0);
        if (item.car !== "" && prevCar === "") {
          const prevCarIndex = i - carSpan + 1;
          sortedData[prevCarIndex].car = item.car;
        }
      } else {
        if (i > 0) {
          spans.set(`${i - carSpan}-car`, carSpan);
        }
        carSpan = 1;
      }

      if (i === items.length - 1) {
        if (item.destination === prevDestination) {
          spans.set(`${i - destSpan + 1}-destination`, destSpan);
        } else {
          spans.set(`${i}-destination`, 1);
        }

        if (
          item.business === prevBusiness &&
          item.destination === prevDestination
        ) {
          spans.set(`${i - businessSpan + 1}-business`, businessSpan);
        } else {
          spans.set(`${i}-business`, 1);
        }

        if (
          item.work === prevWork &&
          //item.business === prevBusiness &&
          item.destination === prevDestination
        ) {
          spans.set(`${i - workSpan + 1}-work`, workSpan);
        } else {
          spans.set(`${i}-work`, 1);
        }

        if (
          (item.car === prevCar || item.car === "" || prevCar === "") &&
          //item.work === prevWork &&
          //item.business === prevBusiness &&
          item.destination === prevDestination
        ) {
          spans.set(`${i - carSpan + 1}-car`, carSpan);
        } else {
          spans.set(`${i}-car`, 1);
        }
      }

      prevName = item.username;
      prevDestination = item.destination;
      prevBusiness = item.business;
      prevWork = item.work;
      prevCar = item.car;
    }

    return spans;
  };

  const findNonEmptyCarInGroup = (data: IEmployee[], currentIndex: number) => {
    const currentItem = data[currentIndex];

    for (let i = currentIndex; i < data.length; i++) {
      if (
        data[i].destination === currentItem.destination &&
        data[i].business === currentItem.business &&
        data[i].work === currentItem.work &&
        data[i].car !== ""
      ) {
        return data[i].car;
      }
    }

    for (let i = currentIndex; i >= 0; i--) {
      if (
        data[i].destination === currentItem.destination &&
        data[i].business === currentItem.business &&
        data[i].work === currentItem.work &&
        data[i].car !== ""
      ) {
        return data[i].car;
      }
    }

    return "";
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
          <TableCell
            align="center"
            colSpan={7}
            className="text-center"
            sx={{
              color: "#334155",
            }}
          >
            등록된 정보가 없습니다
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const sortedData = sortEmployeeInform();
  const rowSpans = getRowSpans(sortedData);

  const cellStyle = {
    fontSize: "large",
    borderRight: "1px solid #e5e7eb",
    color: "slate",
  };

  const lastCellStyle = {
    fontSize: "large",
    borderRight: "none",
    width: "8%",
  };

  return (
    <TableBody>
      {sortedData.map((item, index) => (
        <TableRow
          key={item._id}
          className="w-[100%] sm:text-sm"
          sx={styleMap.get(`${item.destination}-${item.business}`)}
        >
          {rowSpans.get(`${index}-name`) !== 0 && (
            <TableCell
              align="center"
              rowSpan={rowSpans.get(`${index}-name`)}
              sx={{ ...cellStyle, whiteSpace: "nowrap" }}
            >
              {item.username}
            </TableCell>
          )}

          {rowSpans.get(`${index}-destination`) !== 0 && (
            <TableCell
              align="center"
              rowSpan={rowSpans.get(`${index}-destination`)}
              sx={{ ...cellStyle, whiteSpace: "nowrap" }}
            >
              {item.destination}
            </TableCell>
          )}

          {rowSpans.get(`${index}-business`) !== 0 && (
            <TableCell
              align="left"
              rowSpan={rowSpans.get(`${index}-business`)}
              sx={cellStyle}
            >
              {item.business}
            </TableCell>
          )}

          {rowSpans.get(`${index}-work`) !== 0 && (
            <TableCell
              align="center"
              rowSpan={rowSpans.get(`${index}-work`)}
              sx={{ ...cellStyle, whiteSpace: "nowrap" }}
            >
              {item.work}
            </TableCell>
          )}

          {rowSpans.get(`${index}-car`) !== 0 && (
            <TableCell
              align="center"
              rowSpan={rowSpans.get(`${index}-car`)}
              sx={cellStyle}
            >
              {item.car !== ""
                ? item.car
                : findNonEmptyCarInGroup(sortedData, index)}
            </TableCell>
          )}

          {/* <TableCell sx={cellStyle}>{item.car}</TableCell> */}

          <TableCell align="center" sx={cellStyle}>
            {item.remarks && (
              <Tooltip
                title={item.remarks}
                arrow
                placement="left"
                componentsProps={{
                  tooltip: {
                    onClick: (e) => e.stopPropagation(),
                    sx: {
                      bgcolor: "#374151",
                      color: "#ffffff",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                      borderRadius: "6px",
                      maxWidth: "500px",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      padding: "12px 16px",
                      "& .MuiTooltip-arrow": {
                        color: "#374151",
                      },
                      "&:focus": {
                        outline: "2px solid #2563eb",
                        outlineOffset: "2px",
                      },
                    },
                  },
                }}
              >
                <Button
                  sx={{
                    minWidth: "auto",
                    padding: "4px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(37, 99, 235, 0.04)",
                      transform: "scale(1.05)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(37, 99, 235, 0.08)",
                    },
                  }}
                >
                  <FileText size={22} color="#0D9488  " />
                </Button>
              </Tooltip>
            )}
          </TableCell>

          <TableCell sx={lastCellStyle}>
            {item.isOwner && (
              <div className="flex items-center justify-between gap-2">
                <button
                  className="flex items-center rounded px-1 py-1 text-blue-600 transition-colors hover:bg-blue-50"
                  onClick={() => setEditingItemId(item._id)}
                >
                  <Edit
                    className="sm:h-3 sm:w-3 md:h-4 md:w-4"
                    strokeWidth={2.2}
                  />
                  <span className="ml-1 whitespace-nowrap text-sm font-semibold">
                    수정
                  </span>
                </button>
                <button
                  className="flex items-center rounded px-1 py-1 text-red-600 transition-colors hover:bg-red-50"
                  onClick={() => deleteInform(item._id)}
                >
                  <Trash2
                    className="sm:h-3 sm:w-3 md:h-4 md:w-4"
                    strokeWidth={2.2}
                  />
                  <span className="ml-1 whitespace-nowrap text-sm font-semibold">
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
