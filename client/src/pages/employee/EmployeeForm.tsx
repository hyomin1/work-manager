import React, { useState } from "react";
import { formDate, axiosReq } from "../../api";
import ArrowBack from "../../components/common/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useCustomQueries } from "../../hooks/useCustomQuery";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  FormControl,
  Container,
  Divider,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Grid,
  Radio,
} from "@mui/material";
import "dayjs/locale/ko";
import { ROUTES } from "../../constants/constant";
import {
  Briefcase,
  Calendar,
  Car,
  ClipboardList,
  MapPin,
  MessageSquare,
  User,
} from "lucide-react";
import Logout from "../auth/Logout";
dayjs.locale("ko");

// 근무 현황 데이터 입력 폼
function EmployeeForm() {
  const [username, setName] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<
    Array<{ id: string; destination: string } | null>
  >([null, null, null]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<
    Array<{ business: string } | null>
  >([null, null, null]);

  const [selectedWorks, setSelectedWorks] = useState<
    Array<{ work: string } | null>
  >([null, null, null]);

  const [inputDestination, setInputDestination] = useState("");

  const [inputBusiness, setInputBusiness] = useState("");

  const [inputWork, setInputWork] = useState(""); // 업무 직접 입력은 아니지만 직접 입력한 방문지와 사업명의 매핑하기 위한 변수

  const [car, setCar] = useState<string | null>(null);

  // 0 : 기본 1 : 일일 업무 2: 여러 날은 아니지만 다른 날 선택 3: 기간선택
  const [isDaily, setIsDaily] = useState(0);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // 비고
  const [remarks, setRemarks] = useState("");

  const navigate = useNavigate();
  const {
    names,
    namesLoading,
    destinationsData,
    destinationsLoading,
    businessesData,
    businessesLoading,
    workData,
    worksLoading,
    cars,
    carsLoading,
  } = useCustomQueries();

  const destinationOptions = [
    { id: "none", destination: "선택 안함" },
    ...(destinationsData
      ?.sort((a, b) => a.destination.localeCompare(b.destination))
      ?.map((item) => ({
        id: item._id,
        destination: item.destination,
      })) || []),
  ];

  const carOptions = [
    { car: "선택 안함" },
    ...(cars
      ? cars
          .sort((a, b) => a.car.localeCompare(b.car))
          .map((item) => ({
            car: item.car,
          }))
      : []),
  ];
  const workOptions = [
    ...(workData
      ?.sort((a, b) => a.work.localeCompare(b.work))
      .map((item) => ({
        work: item.work,
      })) || []),
  ];

  const getBusinessOptions = (destinationId: string) => {
    if (destinationId === "none") {
      return [{ business: "선택 안함" }];
    }
    return (
      businessesData
        ?.filter((business) => business.destinationId === destinationId)
        .sort((a, b) => a.business.localeCompare(b.business))
        .map((item) => ({
          business: item.business,
        })) || []
    );
  };

  const handleNameChange = (
    event: React.SyntheticEvent,
    username: string | null,
  ) => {
    setName(username);
  };

  const handleDestinationChange =
    (index: number) =>
    (
      event: React.SyntheticEvent,
      newValue: { id: string; destination: string } | null,
    ) => {
      const newDestinations = [...selectedDestinations];
      newDestinations[index] = newValue;
      setSelectedDestinations(newDestinations);

      const newBusinesses = [...selectedBusinesses];
      newBusinesses[index] = null;
      setSelectedBusinesses(newBusinesses);
    };

  const handleBusinessChange =
    (index: number) =>
    (event: React.SyntheticEvent, newValue: { business: string } | null) => {
      const newBusinesses = [...selectedBusinesses];
      newBusinesses[index] = newValue;
      setSelectedBusinesses(newBusinesses);
    };

  const handleWorkChange =
    (index: number) =>
    (event: React.SyntheticEvent, newValue: { work: string } | null) => {
      const newWorks = [...selectedWorks];
      newWorks[index] = newValue;
      setSelectedWorks(newWorks);
    };

  const handleCarChange = (
    event: React.SyntheticEvent,
    value: { car: string } | null,
  ) => {
    if (value) {
      setCar(value.car);
    }
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value);
    setIsDaily(value);
    if (value === 1) {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  };

  const handleDiffDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setStartDate(newDate.toDate());
      setEndDate(newDate.toDate());
    }
  };

  /* 일일 업무 아닌 경우 시작 날짜와 종료 날짜 설정 */

  const handleStartDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setStartDate(new Date(newDate.toDate()));
    }
  };
  const handleEndDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setEndDate(new Date(newDate.toDate()));
    }
  };

  if (
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading
  ) {
    return <div>Loading...</div>;
  }

  const onClickComplete = async () => {
    const destArr = selectedDestinations
      .filter(
        (dest): dest is { id: string; destination: string } => dest !== null,
      )
      .map((dest) => dest.destination)
      .concat(inputDestination.trim())
      .filter(Boolean);

    const businessArr = selectedBusinesses
      .filter((bus): bus is { business: string } => bus !== null)
      .map((bus) => bus.business)
      .concat(inputBusiness.trim())
      .filter(Boolean);

    const workArr = selectedWorks
      .filter((item): item is { work: string } => item !== null)
      .map((item) => item.work)
      .concat(inputWork.trim())
      .filter(Boolean);

    if (!username) {
      alert("이름을 선택해주세요");
      return;
    }

    if (destArr.length === 0) {
      alert("방문지를 선택해주세요");
      return;
    }

    if (businessArr.length === 0) {
      alert("사업명을 선택해주세요");
      return;
    }
    if (destArr.length !== businessArr.length) {
      alert("방문지와 사업명의 수가 일치하지 않습니다");
      return;
    }

    if (workArr.length === 0) {
      alert("업무를 선택해주세요");
      return;
    }
    if (
      destArr.length === businessArr.length &&
      destArr.length > workArr.length
    ) {
      alert("업무를 선택해주세요");
      return;
    }
    if (
      destArr.length === businessArr.length &&
      destArr.length < workArr.length
    ) {
      alert("업무의 개수가 많습니다");
      return;
    }

    if (!car) {
      alert("차량을 선택해주세요");
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      alert("시작일이 종료일보다 느립니다.");
      return;
    }

    const requests = destArr.map((destination, index) =>
      axiosReq.post("/api/employee-inform/addInform", {
        username,
        destination: destArr[index],
        business: businessArr[index],
        work: workArr[index],
        car,
        startDate: isDaily === 1 ? new Date() : startDate,
        endDate: isDaily === 1 ? new Date() : endDate,
        isDaily,
        remarks,
      }),
    );

    const responses = await Promise.all(requests);

    if (responses.every((res) => res.status === 200)) {
      alert("정보 입력 완료");
      navigate(ROUTES.EMPLOYEES.LIST);
    }
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      transition: "all 0.2s ease-in-out",
      "& fieldset": {
        borderColor: "#E5E7EB",
      },
      "&:hover fieldset": {
        borderColor: "#3B82F6",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3B82F6",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#6B7280",
      "&.Mui-focused": {
        color: "#3B82F6",
      },
    },
  };

  const SectionTitle = ({
    icon: Icon,
    title,
  }: {
    icon: any;
    title: string;
  }) => (
    <div className="mb-4 flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50 p-10 sm:p-4">
      <Container className="py-6" maxWidth="xl">
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
            <ArrowBack type="not home" />
            <div className="rounded-2xl bg-white shadow-lg ring-1 ring-black/5 sm:px-6 sm:py-2 md:px-16 md:py-4">
              <span className="whitespace-nowrap text-xl font-semibold text-gray-700 transition-colors sm:text-xs">
                {formDate}
              </span>
            </div>

            <Logout />
          </div>

          <div className="w-full rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
            <Grid container spacing={4}>
              {/* Basic Info Section */}
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {/* Date Selection */}
                  <Grid item xs={12} md={4}>
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={Calendar} title="날짜" />
                      <FormControl component="fieldset" fullWidth>
                        <div className="mb-4 rounded-lg bg-white shadow-sm ring-1 ring-gray-200 sm:px-2 sm:py-1.5 sm:text-xs md:py-1.5">
                          <RadioGroup
                            row
                            value={isDaily}
                            onChange={handleDateChange}
                            className="flex flex-nowrap sm:space-x-1"
                          >
                            <FormControlLabel
                              value={1}
                              control={
                                <Radio
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#3B82F6",
                                    },
                                  }}
                                />
                              }
                              label="오늘"
                              className="m-0 flex flex-1 items-center justify-center whitespace-nowrap rounded-md transition-colors hover:bg-gray-50 md:px-2"
                              sx={{
                                margin: "1px",
                                backgroundColor:
                                  isDaily === 1
                                    ? "rgb(239 246 255)"
                                    : "transparent",
                                borderRadius: "0.375rem",
                              }}
                            />
                            <FormControlLabel
                              value={2}
                              control={
                                <Radio
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#3B82F6",
                                    },
                                  }}
                                />
                              }
                              label="다른날"
                              className="m-0 flex flex-1 items-center justify-center whitespace-nowrap rounded-md transition-colors hover:bg-gray-50 md:px-2"
                              sx={{
                                margin: "1px",
                                backgroundColor:
                                  isDaily === 2
                                    ? "rgb(239 246 255)"
                                    : "transparent",
                                borderRadius: "0.375rem",
                              }}
                            />
                            <FormControlLabel
                              value={3}
                              control={
                                <Radio
                                  sx={{
                                    "&.Mui-checked": {
                                      color: "#3B82F6",
                                    },
                                  }}
                                />
                              }
                              label="기간"
                              className="m-0 flex flex-1 items-center justify-center whitespace-nowrap rounded-md transition-colors hover:bg-gray-50 md:px-2"
                              sx={{
                                margin: "1px",
                                backgroundColor:
                                  isDaily === 3
                                    ? "rgb(239 246 255)"
                                    : "transparent",
                                borderRadius: "0.375rem",
                              }}
                            />
                          </RadioGroup>
                        </div>
                        <div className="mt-4">
                          {isDaily === 2 ? (
                            <LocalizationProvider
                              dateAdapter={AdapterDayjs}
                              adapterLocale="ko"
                            >
                              <MobileDatePicker
                                onChange={handleDiffDateChange}
                                sx={{
                                  ...inputStyles,
                                  width: "100%",
                                }}
                                label="날짜 선택"
                                slotProps={{
                                  textField: {
                                    sx: {
                                      ...inputStyles,
                                      width: "100%",
                                    },
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          ) : (
                            isDaily === 3 && (
                              <div className="grid grid-cols-2 gap-3">
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                  adapterLocale="ko"
                                >
                                  <MobileDatePicker
                                    onChange={handleStartDateChange}
                                    sx={inputStyles}
                                    label="시작일"
                                    slotProps={{
                                      textField: {
                                        sx: inputStyles,
                                      },
                                    }}
                                  />
                                  <MobileDatePicker
                                    onChange={handleEndDateChange}
                                    sx={inputStyles}
                                    label="종료일"
                                    slotProps={{
                                      textField: {
                                        sx: inputStyles,
                                      },
                                    }}
                                  />
                                </LocalizationProvider>
                              </div>
                            )
                          )}
                        </div>
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={User} title="이름" />
                      <Autocomplete
                        options={
                          names
                            ?.sort((a, b) =>
                              a.username.localeCompare(b.username),
                            )
                            ?.map((item) => item.username) || []
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="이름 선택 *"
                            sx={inputStyles}
                          />
                        )}
                        onChange={handleNameChange}
                        className="bg-white"
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={Car} title="차량" />
                      <Autocomplete
                        options={carOptions}
                        getOptionLabel={(option) => option.car}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="차량 선택 *"
                            sx={inputStyles}
                          />
                        )}
                        onChange={handleCarChange}
                        className="bg-white"
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider className="my-4" />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={MapPin} title="방문지" />
                      <div className="space-y-3">
                        {[0, 1, 2].map((index) => (
                          <Autocomplete
                            key={index}
                            options={destinationOptions}
                            getOptionLabel={(option) => option.destination}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={`방문지 ${index + 1}${index === 0 ? " *" : ""}`}
                                sx={inputStyles}
                              />
                            )}
                            onChange={handleDestinationChange(index)}
                            value={selectedDestinations[index]}
                            className="bg-white"
                          />
                        ))}
                        <TextField
                          fullWidth
                          label="방문지 직접 입력"
                          value={inputDestination}
                          onChange={(e) => setInputDestination(e.target.value)}
                          sx={inputStyles}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={5}>
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={Briefcase} title="사업명" />
                      <div className="space-y-3">
                        {[0, 1, 2].map((index) => (
                          <Autocomplete
                            key={index}
                            options={getBusinessOptions(
                              selectedDestinations[index]?.id || "none",
                            )}
                            getOptionLabel={(option) => option.business}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={`사업명 ${index + 1}${index === 0 ? " *" : ""}`}
                                sx={inputStyles}
                              />
                            )}
                            onChange={handleBusinessChange(index)}
                            value={selectedBusinesses[index]}
                            disabled={!selectedDestinations[index]}
                            className="bg-white"
                          />
                        ))}
                        <TextField
                          fullWidth
                          label="사업명 직접 입력"
                          value={inputBusiness}
                          onChange={(e) => setInputBusiness(e.target.value)}
                          sx={inputStyles}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={ClipboardList} title="업무" />
                      <div className="space-y-3">
                        {[0, 1, 2].map((index) => (
                          <Autocomplete
                            key={index}
                            options={workOptions}
                            getOptionLabel={(option) => option.work}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={`업무 ${index + 1}${index === 0 ? " *" : ""}`}
                                sx={inputStyles}
                              />
                            )}
                            onChange={handleWorkChange(index)}
                            value={selectedWorks[index]}
                            className="bg-white"
                          />
                        ))}
                        <TextField
                          fullWidth
                          label="업무 직접 입력"
                          value={inputWork}
                          onChange={(e) => setInputWork(e.target.value)}
                          sx={inputStyles}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <div className="lg:flex-row lg:items-end lg:justify-between lg:space-x-6 lg:space-y-0 mt-4 flex flex-col space-y-6">
                  <div className="lg:w-2/3 w-full">
                    <div className="rounded-xl bg-gray-50/50 p-4 ring-1 ring-gray-100">
                      <SectionTitle icon={MessageSquare} title="비고" />
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        sx={inputStyles}
                        className="bg-white"
                      />
                    </div>
                  </div>
                  <div className="lg:justify-end lg:flex-1 flex justify-center">
                    <button
                      onClick={onClickComplete}
                      className="min-w-[160px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      입력 완료
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default EmployeeForm;
