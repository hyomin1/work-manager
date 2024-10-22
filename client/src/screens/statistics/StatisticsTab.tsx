import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCustomQueries } from "../../hooks/useCustomQuery";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { IStat } from "../../interfaces/interface";
import { axiosReq } from "../../api";

interface ITabs {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  username: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setStatisticsData: React.Dispatch<React.SetStateAction<IStat[]>>;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StatisticsTab({
  value,
  setValue,
  username,
  setUserName,
  destination,
  setDestination,
  date,
  setDate,
  setStatisticsData,
}: ITabs) {
  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeName = (event: SelectChangeEvent) => {
    setUserName(event.target.value as string);
  };

  const handleChangeDestination = (event: SelectChangeEvent) => {
    setDestination(event.target.value as string);
  };
  const handleChangeDate = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate.toDate());
    }
  };

  const fetchUserStatistics = async () => {
    const res = await axiosReq.get("");
    setStatisticsData(res.data);
  };

  const fetchDestinationStatistics = async () => {
    const res = await axiosReq.get(`/api/`);
    setStatisticsData(res.data);
  };

  const { names, destinationsData } = useCustomQueries();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
        <Tabs
          value={value}
          onChange={handleChangeValue}
          aria-label="basic tabs example"
        >
          <Tab label="이름 검색" {...a11yProps(0)} />
          <Tab label="방문지 검색" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {value === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-required-label">
              이름 *
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={username}
              label="이름 *"
              onChange={handleChangeName}
            >
              {names?.map((item, index) => (
                <MenuItem key={index} value={item.username}>
                  {item.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <MobileDatePicker
            onChange={handleChangeDate}
            defaultValue={dayjs(date)}
          />

          <Button onClick={fetchUserStatistics} variant="contained">
            검색
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">방문지 *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={destination}
              label="Age"
              onChange={handleChangeDestination}
            >
              {destinationsData?.map((item, index) => (
                <MenuItem key={index} value={item.destination}>
                  {item.destination}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained">검색</Button>
        </Box>
      )}
    </Box>
  );
}

export default StatisticsTab;
