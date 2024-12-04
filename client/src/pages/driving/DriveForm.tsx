import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq, calculateDate } from "../../api";
import ArrowBack from "../../components/common/ArrowBack";
import { useCustomQueries } from "../../hooks/useCustomQuery";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  Container,
  Divider,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/material/styles";
import Blank from "../../components/common/Blank";
import { DatePicker } from "@mui/x-date-pickers";
import { ROUTES } from "../../constants/constant";
import { Calculator, Navigation, Wallet } from "lucide-react";
import useDrivingStore from "../../stores/drivingStore";
dayjs.locale("ko");

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  "& .MuiTextField-root, & .MuiFormControl-root": {
    marginBottom: theme.spacing(2),
  },
}));

const StyledFormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: "8px",
  marginBottom: theme.spacing(2),
}));

// 차량 운행일지 입력 폼
function DriveInput() {
  const navigate = useNavigate();
  const [driveDay, setDriveDay] = useState<Date>(); // 주행 날짜

  const [drivers, setDrivers] = useState(["", ""]); // 운전자 배열

  const [drivingDestination, setDrivingDestination] = useState(""); // 행선지
  const [startKM, setStartKM] = useState(0); // 출발 km
  const [endKM, setEndKM] = useState(0); // 도착 km
  const [totalKM, setTotalKM] = useState(0); // 도착-출발 (주행거리)

  const [fuelCost, setFuelCost] = useState(0); // 주유비
  const [toll, setToll] = useState(0); // 하이패스

  const [etc, setEtc] = useState<{ name: string; cost: number }>({
    // 기타 비용
    name: "", // 초기값 설정
    cost: 0,
  });

  const { carId, setCarId } = useDrivingStore();

  const selectedDriver = drivers.filter(Boolean);

  const privateCarId = process.env.REACT_APP_PRIVATE_CAR;

  const { names, namesLoading, cars, carsLoading, etcNames, etcNamesLoading } =
    useCustomQueries();

  const handleDriveDayChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDriveDay(newDate.toDate());
    }
  };

  const handleCarChange = (event: SelectChangeEvent) => {
    setCarId(event.target.value);
  };
  const handleDrivingDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDrivingDestination(event.target.value);
  };

  const handleStartKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartKM(parseInt(event.target.value));
  };
  const handleEndKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndKM(parseInt(event.target.value));
  };
  const handleTotalKMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalKM(parseInt(event.target.value));
  };
  const handleFuelCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFuelCost(parseInt(event.target.value));
  };
  const handleTollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToll(parseInt(event.target.value));
  };
  const handleEtcNameChange = (event: SelectChangeEvent) => {
    setEtc({ name: event.target.value, cost: etc.cost });
  };

  const handleEtcCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEtc({ name: etc.name, cost: parseInt(event.target.value) });
  };

  const handleDriverChange = (index: number) => (event: SelectChangeEvent) => {
    const newDrivers = [...drivers];
    newDrivers[index] = event.target.value;
    setDrivers(newDrivers);
  };

  const onClickComplete = async () => {
    const driverArr = selectedDriver
      .map((driver) => driver.trim())
      .filter((driver) => driver !== null && driver !== "")

      .filter(Boolean);

    if (!driveDay) {
      alert("날짜를 선택해주세요");
      return;
    }
    if (driverArr.length === 0) {
      alert("운전자를 선택해주세요");
      return;
    }
    if (!carId) {
      alert("차량을 선택해주세요");
      return;
    }
    if (!drivingDestination) {
      alert("행선지를 입력해주세요");
      return;
    }

    if (carId !== privateCarId && (!startKM || !endKM)) {
      alert("주행거리를 입력해주세요.");
      return;
    }
    if (carId === privateCarId && !totalKM) {
      alert("주행거리를 입력해주세요.");
      return;
    }
    if (etc.name && !etc.cost) {
      alert("비용을 입력해주세요.");
      return;
    }
    if (etc.cost && !etc.name) {
      alert("항목을 선택해주세요.");
      return;
    }
    if (typeof fuelCost !== "number") {
      setFuelCost(0);
    }
    if (typeof toll !== "number") {
      setToll(0);
    }
    if (typeof etc.cost !== "number") {
      setEtc({ name: etc.name, cost: 0 });
    }

    const driverJoined = driverArr.join(", ");
    const res = await axiosReq.post("/api/driving-inform/addInform", {
      driveDay,
      username: driverJoined,
      car: carId,
      drivingDestination,
      startKM,
      endKM,
      totalKM: carId === privateCarId ? totalKM : endKM - startKM,
      fuelCost,
      toll,
      etc,
    });
    if (res.status === 200) {
      alert(res.data.message);
      navigate(ROUTES.VEHICLES.LIST, {
        state: {
          car: carId,
        },
      });
    }
  };
  if (namesLoading || carsLoading || etcNamesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{ py: 4 }}
      maxWidth={false}
      className="flex h-screen w-full flex-col items-center bg-gradient-to-br from-zinc-50 to-slate-100"
    >
      <div className="mb-8 mt-2 flex items-center justify-between sm:mt-4 sm:w-full md:w-[80%]">
        <ArrowBack type="not home" />
        <span className="whitespace-nowrap font-bold sm:mx-1 sm:text-xl md:mx-8 md:text-3xl">
          {calculateDate(new Date())}
        </span>
        <Blank />
      </div>

      <StyledPaper elevation={3} className="sm:w-full md:w-[80%]">
        <Grid container spacing={3}>
          {/* 기본 정보 섹션 */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              기본 정보
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ko"
                >
                  <DatePicker
                    label="날짜 *"
                    onChange={handleDriveDayChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    format="YYYY.MM.DD"
                  />
                </LocalizationProvider>
              </Grid>
              {[0, 1].map((index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <FormControl fullWidth>
                    <InputLabel>
                      운전자 {index + 1} {index === 0 && "*"}
                    </InputLabel>
                    <Select
                      value={drivers[index]}
                      label={`운전자 ${index + 1} ${index === 0 && "*"}`}
                      onChange={handleDriverChange(index)}
                    >
                      {names
                        ?.sort((a, b) => a.username.localeCompare(b.username))
                        .map((item) => (
                          <MenuItem key={item.username} value={item.username}>
                            {item.username}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>차량 *</InputLabel>
                  <Select
                    value={carId}
                    label="차량 *"
                    onChange={handleCarChange}
                  >
                    {cars
                      ?.sort((a, b) => a.car.localeCompare(b.car))
                      .map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.car}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="행선지 *"
                  placeholder="행선지를 입력해주세요"
                  onChange={handleDrivingDestinationChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 3 }} />
          </Grid>

          {/* 주행 거리 섹션 */}
          <Grid item xs={12} md={4}>
            <StyledFormSection>
              <div className="mb-4 flex items-center space-x-2 text-slate-700">
                <Navigation className="h-5 w-5" />
                <h2 className="text-lg font-semibold">주행 거리</h2>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="출발 (km) *"
                    disabled={carId === privateCarId}
                    onChange={handleStartKMChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="도착 (km) *"
                    disabled={carId === privateCarId}
                    onChange={handleEndKMChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="총 주행거리"
                    disabled={carId !== privateCarId}
                    value={carId === privateCarId ? totalKM : endKM - startKM}
                    onChange={handleTotalKMChange}
                  />
                </Grid>
              </Grid>
            </StyledFormSection>
          </Grid>

          {/* 비용 섹션 */}
          <Grid item xs={12} md={4}>
            <StyledFormSection>
              <div className="mb-4 flex items-center space-x-2 text-slate-700">
                <Wallet className="h-5 w-5" />
                <h2 className="text-lg font-semibold">비용</h2>
              </div>
              <TextField
                fullWidth
                type="number"
                label="주유비"
                onChange={handleFuelCostChange}
              />
              <TextField
                fullWidth
                type="number"
                label="하이패스"
                onChange={handleTollChange}
              />
            </StyledFormSection>
          </Grid>

          {/* 기타 비용 섹션 */}
          <Grid item xs={12} md={4}>
            <StyledFormSection>
              <div className="mb-4 flex items-center space-x-2 text-slate-700">
                <Calculator className="h-5 w-5" />
                <h2 className="text-lg font-semibold">기타 비용</h2>
              </div>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>항목 선택</InputLabel>
                <Select
                  value={etc.name}
                  label="항목 선택"
                  onChange={handleEtcNameChange}
                >
                  {etcNames
                    ?.sort((a, b) => a.etcName.localeCompare(b.etcName))
                    .map((item) => (
                      <MenuItem key={item.etcName} value={item.etcName}>
                        {item.etcName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="number"
                label="비용"
                onChange={handleEtcCostChange}
              />
            </StyledFormSection>
          </Grid>
        </Grid>

        {/* 제출 버튼 */}
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="sm:w-[90%] md:w-[20%]"
            onClick={onClickComplete}
            sx={{
              height: "48px",
              fontSize: "1.1rem",
              bgcolor: "#00ab39",
              "&:hover": {
                bgcolor: "#009933",
              },
            }}
          >
            입력 완료
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default DriveInput;
