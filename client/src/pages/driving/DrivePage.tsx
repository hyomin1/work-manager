import React, { useEffect, useState } from "react";
import {
  axiosReq,
  calMonth,
  calYear,
  calYearMonth,
  checkAdminSession,
  checkCarSession,
  getCars,
  getDrivingInform,
  getNotification,
} from "../../api";
import { useQuery } from "@tanstack/react-query";
import { ICars, IDrivingInform } from "../../interfaces/interface";
import Title from "../../components/layout/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
import Page from "../../components/common/Page";
import { useMediaQuery } from "react-responsive";
import ArrowBack from "./../../components/common/ArrowBack";
import Logout from "../auth/Logout";
import { Pencil, Settings, Users, Wrench } from "lucide-react";
import DriveMobile from "./DriveMobile";
import DrivePC from "./DriveDesktop";
import { ROUTES } from "../../constants/constant";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function DrivePage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [carId, setCarId] = useState("");
  const [car, setCar] = useState("");

  const { data: drivingInform, refetch } = useQuery<IDrivingInform[]>({
    queryKey: ["drivingInform"],
    queryFn: () =>
      getDrivingInform(
        calYear(currentDate || new Date()),
        calMonth(currentDate || new Date()),
        carId,
      ),
    refetchInterval: 300_000,
    enabled: carId.length > 0,
  });

  const { data: notification } = useQuery<ICars>({
    queryKey: ["notification", carId],
    queryFn: () => getNotification(carId),
    enabled: carId.length > 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 25;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = drivingInform
    ? Math.ceil(drivingInform.length / itemsPerPage)
    : 0;

  const checkSession = async () => {
    const response = await axiosReq.get("/auth/checkSession");
  };

  useEffect(() => {
    refetch();
  }, [carId, refetch, currentDate]);

  useEffect(() => {
    //checkSession();
  }, []);

  useEffect(() => {
    if (location.state) {
      setCarId(location.state.car);
    }
  }, [location]);

  const [showInput, setShowInput] = useState(false);

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["car", 1],
    queryFn: getCars,
  });

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const onChangeCarNum = (e: SelectChangeEvent) => {
    setCarId(e.target.value);
    const selectedCar = cars?.find((car) => car._id === e.target.value);

    if (selectedCar) {
      setCar(selectedCar.car);
    }

    setCurrentPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const [year, month] = inputValue.split("-");
    if (month && year) {
      const formattedMonth = month.padStart(2, "0");
      setCurrentDate(new Date(`${year}-${formattedMonth}-01`));
    }

    setCurrentPage(1);
  };

  const onClickAdmin = async () => {
    const status = await checkAdminSession();
    if (status === 200) {
      navigate(ROUTES.ADMIN.SETTINGS);
    }
  };

  const checkUser = async () => {
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.EMPLOYEES.LIST);
      return;
    }
    alert("권한이 없습니다.");
  };

  const checkCarService = async () => {
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.VEHICLES.SERVICE);
      return;
    }
    alert("권한이 없습니다.");
  };

  const checkUserInput = async () => {
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.VEHICLES.CREATE);
      return;
    }
    alert("권한이 없습니다.");
  };

  const checkNotification = async () => {
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.VEHICLES.SERVICE, {
        state: {
          car: carId,
        },
      });
      return;
    }
    alert("권한이 없습니다.");
  };

  const totalFuelCost =
    drivingInform?.reduce((acc, item) => acc + item.fuelCost, 0) || 0;
  const totalToll =
    drivingInform?.reduce((acc, item) => acc + item.toll, 0) || 0;
  const totalEtcCost =
    drivingInform?.reduce((acc, item) => acc + item.etc.cost, 0) || 0;
  const totalDrivingKM =
    drivingInform?.reduce((acc, item) => acc + item.totalKM, 0) || 0;
  const grandTotal = totalFuelCost + totalToll + totalEtcCost;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-zinc-50 to-slate-100 p-4 sm:p-2">
      <div className="flex h-full w-[90%] flex-col items-center sm:w-full">
        <div className="mb-4 mt-4 flex w-full items-center justify-between sm:mt-4 print:justify-center">
          <ArrowBack type="home" />
          <Title
            currentDate={currentDate || new Date()}
            setCurrentDate={setCurrentDate}
            setShowInput={setShowInput}
            calYearMonth={calYearMonth}
            category="driving"
          />
          <Logout />
        </div>

        <div className="mb-2 flex w-full items-center justify-between">
          {showInput && (
            <div className="flex w-full justify-center hover:opacity-60">
              <input
                type="month"
                onChange={handleDateChange}
                onBlur={() => setShowInput(false)}
                className="my-4 w-[33%] rounded-lg border border-gray-300 p-2 shadow-sm transition duration-200 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-[70%]"
              />
            </div>
          )}
        </div>

        <div className="h-full w-full">
          <div className="mb-4 hidden w-full font-bold print:flex">
            <span>{car}</span>
          </div>

          <div className="print-hidden flex w-[100%] items-center rounded-t-2xl border border-t-gray-300 sm:h-auto sm:flex-col md:justify-between">
            <div className="flex items-center sm:w-full sm:flex-col sm:p-3 md:ml-2 md:h-full md:w-[50%] md:justify-start">
              <FormControl className="w-[30%]" size="small">
                <InputLabel id="car">차량 선택</InputLabel>

                <Select
                  className="h-10 rounded-lg border border-gray-300 p-2 text-sm font-bold hover:opacity-60 sm:mb-3 sm:w-full md:mr-16 md:w-[50%]"
                  onChange={onChangeCarNum}
                  id="car"
                  label="차량 선택"
                  labelId="car"
                  value={carId}
                >
                  {cars &&
                    cars
                      .sort((a, b) => a.car.localeCompare(b.car))
                      .map((car) => (
                        <MenuItem key={car._id} value={`${car._id}`}>
                          {car.car}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex flex-1 items-center justify-end p-4 sm:w-full sm:flex-col sm:gap-2 md:w-[50%]">
              <div className="flex items-center justify-center sm:mb-2 sm:w-full sm:gap-2">
                <button
                  onClick={checkUser}
                  className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white hover:opacity-60 sm:flex-1 md:mr-4"
                >
                  <Users className="sm:h-4 sm:w-4" />
                  <span className="ml-1 sm:text-xs">근무</span>
                </button>
                <button
                  className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#10B981] px-4 py-2 text-white sm:flex-1 sm:text-lg md:mr-4"
                  onClick={checkUserInput}
                >
                  <Pencil className="sm:h-4 sm:w-4" />
                  <span className="ml-1 sm:text-xs">입력</span>
                </button>
                <button
                  onClick={checkCarService}
                  className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white hover:opacity-60 sm:flex-1 md:mr-4"
                >
                  <Wrench className="sm:h-4 sm:w-4" />
                  <span className="ml-1 sm:text-xs">점검</span>
                </button>

                <button
                  className="button-effect flex items-center justify-center whitespace-nowrap rounded-lg bg-[#10B981] px-4 py-2 text-white hover:opacity-60 sm:flex-1"
                  onClick={onClickAdmin}
                >
                  <Settings className="sm:h-4 sm:w-4" />
                  <span className="ml-1 sm:text-xs">관리</span>
                </button>
              </div>

              <div className="flex items-center sm:hidden sm:w-full sm:justify-center">
                <div className="mx-4 border border-gray-300 md:h-10" />
                <button onClick={() => refetch()}>
                  <SlRefresh className="hover:opacity-60 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                </button>
              </div>
            </div>
          </div>
          <div className="print-hidden">
            {carId.length > 0 && (
              <Alert
                onClick={checkNotification}
                severity="info"
                variant="outlined"
                className="flex h-16 w-full cursor-pointer items-center border border-black hover:opacity-60"
                sx={{
                  fontSize: "medium",
                  overflowY: "auto",
                  bgColor: "#93C5FD",
                  border: "1px solid lightgray",
                  borderRadius: "0px",
                  fontWeight: "bold",
                  "@media (max-width: 640px)": {
                    whiteSpace: "normal",
                    height: "auto",
                    minHeight: "40px",
                    "& .MuiAlert-message": {
                      overflow: "visible",
                      whiteSpace: "normal",
                    },
                  },
                  "&:hover": {
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {notification?.notification || "공지사항을 등록해주세요"}
              </Alert>
            )}
          </div>

          {isMobile ? (
            <DriveMobile
              drivingInform={drivingInform || []}
              grandTotal={grandTotal}
              totalDrivingKM={totalDrivingKM}
              totalEtcCost={totalEtcCost}
              totalFuelCost={totalFuelCost}
              totalToll={totalToll}
              indexOfFirstItem={indexOfFirstItem}
              indexOfLastItem={indexOfLastItem}
            />
          ) : (
            <div className="h-[75%] overflow-y-auto">
              <DrivePC
                drivingInform={drivingInform || []}
                totalDrivingKM={totalDrivingKM}
                totalEtcCost={totalEtcCost}
                totalFuelCost={totalFuelCost}
                totalToll={totalToll}
                grandTotal={grandTotal}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                refetch={refetch}
              />
            </div>
          )}
        </div>
      </div>
      {/* <Page
        totalPage={totalPages}
        page={currentPage}
        onPageChange={handleClick}
      /> */}
    </div>
  );
}

export default DrivePage;
