import {
  Tab,
  Tabs,
  Box,
  FormControl,
  Button,
  Autocomplete,
  TextField,
  Paper,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Search, MapPin, User } from "lucide-react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import React from "react";
import { useCustomQueries } from "../../hooks/useCustomQuery";

dayjs.locale("ko");

interface ITabs {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  nameRefetch: () => void;
  destinationRefetch: () => void;
}

function StatisticsTab({
  value,
  setValue,
  username,
  setUserName,
  destination,
  setDestination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  nameRefetch,
  destinationRefetch,
}: ITabs) {
  const { names, destinationsData } = useCustomQueries();

  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeName = (
    event: React.SyntheticEvent,
    name: string | null,
  ) => {
    if (name) setUserName(name);
  };

  const handleChangeDestination = (
    event: React.SyntheticEvent,
    dest: string | null,
  ) => {
    if (dest) setDestination(dest);
  };

  const handleSearch = () => {
    if (value === 0) {
      if (!username) {
        alert("이름을 선택해주세요");
        return;
      }
      nameRefetch();
    } else {
      if (!destination) {
        alert("방문지를 선택해주세요");
        return;
      }
      destinationRefetch();
    }
  };

  return (
    <Paper elevation={2} className="w-[90%] bg-white p-6">
      <Box className="space-y-6">
        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleChangeValue}
          variant="fullWidth"
          className="border-b border-gray-200"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#2563eb",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "0.95rem",
              fontWeight: 600,
              textTransform: "none",
              minHeight: 48,
              color: "#64748b",
            },
            "& .Mui-selected": {
              color: "#2563eb",
            },
          }}
        >
          <Tab
            icon={<User className="h-4 w-4" />}
            iconPosition="start"
            label="이름 검색"
            className="transition-colors duration-200"
          />
          <Tab
            icon={<MapPin className="h-4 w-4" />}
            iconPosition="start"
            label="방문지 검색"
            className="transition-colors duration-200"
          />
        </Tabs>

        {/* Search Forms */}
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <MobileDatePicker
              label="시작일"
              onChange={(newDate) => newDate && setStartDate(newDate.toDate())}
              defaultValue={dayjs(startDate)}
              slotProps={{
                textField: {
                  className: "bg-white w-full md:w-48",
                  size: "small",
                },
              }}
            />

            <MobileDatePicker
              label="종료일"
              onChange={(newDate) => newDate && setEndDate(newDate.toDate())}
              defaultValue={dayjs(endDate)}
              slotProps={{
                textField: {
                  className: "bg-white w-full md:w-48",
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>

          <FormControl
            className={`w-full ${value === 0 ? "md:w-48" : "md:w-80"}`}
          >
            {value === 0 ? (
              <Autocomplete
                size="small"
                options={
                  names
                    ?.sort((a, b) => a.username.localeCompare(b.username))
                    .map((item) => item.username) || []
                }
                renderInput={(params) => (
                  <TextField {...params} label="이름" size="small" />
                )}
                onChange={handleChangeName}
                value={username}
                className="bg-white"
              />
            ) : (
              <Autocomplete
                size="small"
                options={
                  destinationsData
                    ?.sort((a, b) => a.destination.localeCompare(b.destination))
                    .map((item) => item.destination) || []
                }
                renderInput={(params) => (
                  <TextField {...params} label="방문지" size="small" />
                )}
                onChange={handleChangeDestination}
                value={destination}
                className="bg-white"
              />
            )}
          </FormControl>

          <Button
            onClick={handleSearch}
            variant="contained"
            className="h-10 whitespace-nowrap bg-blue-600 px-6 text-sm font-semibold normal-case transition-colors duration-200 hover:bg-blue-700"
            startIcon={<Search className="h-4 w-4" />}
          >
            검색
          </Button>
        </div>
      </Box>
    </Paper>
  );
}

export default StatisticsTab;
