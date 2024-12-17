import {
  Button,
  Paper,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  statisticsDestinationHeader,
  statisticsNameHeader,
} from "../../constants/headers";
import { calStatDay, extractMonthAndDay } from "../../api";
import { IDestStat, INameStat } from "../../interfaces/interface";
import { FileText } from "lucide-react";

interface ITableProps {
  statisticsNameData: INameStat[];
  statisticsDestinationData: IDestStat[];
  value: number;
}

const commonCellStyles = {
  fontSize: "1.1rem",
  color: "#334155",
  padding: "14px 16px",
  borderBottom: "1px solid #e2e8f0",
  height: "60px", // 모든 셀의 높이를 고정
};

const remarksCellStyles = {
  ...commonCellStyles,
  padding: "4px 16px", // 좌우 패딩만 유지하고 상하 패딩 줄임
  width: "80px", // 비고 셀의 너비 고정
};

export default function StatisticsTable({
  statisticsNameData,
  statisticsDestinationData,
  value,
}: ITableProps) {
  const tooltipButton = (remarks?: string) => {
    return (
      <div className="flex h-full items-center justify-center">
        {remarks ? (
          <Tooltip
            title={remarks}
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
              <FileText size={22} color="#0D9488" />
            </Button>
          </Tooltip>
        ) : (
          <div className="h-[30px] w-[30px]" /> // 비고가 없을 때 차지할 공간
        )}
      </div>
    );
  };

  return (
    <TableContainer
      component={Paper}
      className="rounded-xlk mt-4 overflow-hidden shadow-lg"
      sx={{
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f5f9",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#cbd5e1",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "#94a3b8",
          },
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {/* 헤더 셀 렌더링 로직은 동일하게 유지 */}
            {value === 0 &&
              statisticsNameData &&
              statisticsNameData.length > 0 &&
              statisticsNameHeader.map((item, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    padding: "16px",
                    whiteSpace: "nowrap",
                    height: "60px", // 헤더 높이도 동일하게 설정
                  }}
                >
                  {item}
                </TableCell>
              ))}
            {value === 1 &&
              statisticsDestinationData &&
              statisticsDestinationData.length > 0 &&
              statisticsDestinationHeader.map((item, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#1e293b",
                    padding: "16px",
                    whiteSpace: "nowrap",
                    height: "60px", // 헤더 높이도 동일하게 설정
                  }}
                >
                  {item}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {value === 0 &&
            statisticsNameData
              ?.sort((a, b) => {
                const dateA = extractMonthAndDay(a.specificDate);
                const dateB = extractMonthAndDay(b.specificDate);

                if (dateA.month !== dateB.month) {
                  return dateA.month - dateB.month;
                }
                if (dateA.day !== dateB.day) {
                  return dateA.day - dateB.day;
                }

                return a.destination.localeCompare(b.destination);
              })
              ?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                    },
                  }}
                >
                  <TableCell align="center" sx={commonCellStyles}>
                    {calStatDay(item.specificDate)}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.username}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.destination}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.business}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.work}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.car}
                  </TableCell>
                  <TableCell align="center" sx={remarksCellStyles}>
                    {tooltipButton(item.remarks)}
                  </TableCell>
                </TableRow>
              ))}
          {value === 1 &&
            statisticsDestinationData
              ?.sort((a, b) => {
                const dateA = extractMonthAndDay(a.specificDate);
                const dateB = extractMonthAndDay(b.specificDate);

                if (dateA.month !== dateB.month) {
                  return dateA.month - dateB.month;
                }
                if (dateA.day !== dateB.day) {
                  return dateA.day - dateB.day;
                }

                return a.username.localeCompare(b.username);
              })
              ?.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f8fafc",
                    },
                  }}
                >
                  <TableCell align="center" sx={commonCellStyles}>
                    {calStatDay(item.specificDate)}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.username}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.destination}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.business}
                  </TableCell>
                  <TableCell align="center" sx={commonCellStyles}>
                    {item.work}
                  </TableCell>
                  <TableCell align="center" sx={remarksCellStyles}>
                    {tooltipButton(item.remarks)}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
