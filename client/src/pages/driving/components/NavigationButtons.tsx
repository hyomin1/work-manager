import { Pencil, Settings, Sheet, Users, Wrench } from "lucide-react";
import { SlRefresh } from "react-icons/sl";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import downloadExcel from "../DriveExcel";
import { SetStateAction, useState } from "react";
import { ICars, IDrivingInform } from "../../../interfaces/interface";
import useDrivingStore from "../../../stores/drivingStore";
import { useNavigate } from "react-router-dom";
import { checkAdminSession, checkCarSession } from "../../../api";
import { ROUTES } from "../../../constants/constant";
import NavButton from "../../../components/common/NavButton";

interface NavProps {
  refetch: () => void;
  setCar: React.Dispatch<SetStateAction<string>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  cars: ICars[];
  drivingInform: IDrivingInform[];
  currentDate: Date;
  car: string;
  totalFuelCost: number;
  totalToll: number;
  totalEtcCost: number;
  totalDrivingKM: number;
  grandTotal: number;
}

export default function NavigationButtons({
  refetch,
  cars,
  car,
  setCar,
  setCurrentPage,
  drivingInform,
  currentDate,
  totalFuelCost,
  totalToll,
  totalEtcCost,
  totalDrivingKM,
  grandTotal,
}: NavProps) {
  const { carId, setCarId } = useDrivingStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refetch();
      setIsRefreshing(false);
    }, 110);
  };

  const onChangeCarNum = (e: SelectChangeEvent) => {
    setCarId(e.target.value);
    const selectedCar = cars?.find((car) => car._id === e.target.value);

    if (selectedCar) {
      setCar(selectedCar.car);
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

  return (
    <div className="print-hidden mb-8 flex w-full items-center rounded-lg bg-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all duration-500 sm:h-auto sm:flex-col md:justify-between">
      <div className="flex items-center sm:w-full sm:flex-col sm:p-3 md:ml-2 md:h-full md:justify-start">
        <FormControl
          fullWidth
          size="small"
          sx={{
            width: "100%",
            minWidth: 140,

            "& .MuiOutlinedInput-root": {
              height: "42px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",

              "&:hover": {
                borderColor: "#cbd5e1",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#ffffff",
              },

              "&.Mui-focused": {
                borderColor: "#3b82f6",
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          }}
        >
          <Select
            onChange={onChangeCarNum}
            value={carId}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                padding: "8px 14px",
                display: "flex",
                alignItems: "center",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#1e293b",

                "&.MuiSelect-select": {
                  '&[aria-expanded="true"]': {
                    backgroundColor: "transparent",
                  },
                },
              },

              "& .MuiSelect-icon": {
                right: "12px",
                color: "#64748b",
                transition: "transform 0.2s ease-in-out",

                '&[aria-expanded="true"]': {
                  transform: "rotate(180deg)",
                },
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 1,
                  borderRadius: "10px",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  "& .MuiMenu-list": {
                    padding: "6px",
                  },
                  "& .MuiMenuItem-root": {
                    borderRadius: "6px",
                    margin: "2px 0",
                    padding: "10px 12px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#1e293b",

                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#e2e8f0",
                      "&:hover": {
                        backgroundColor: "#cbd5e1",
                      },
                    },
                  },
                },
              },
            }}
            renderValue={(value) => {
              if (!value) {
                return <span style={{ color: "#94a3b8" }}>차량 선택</span>;
              }
              return cars.find((car) => car._id === value)?.car;
            }}
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

      <div className="flex flex-1 items-center justify-between sm:w-full sm:flex-col sm:gap-2 sm:p-2 md:w-[50%] md:p-4">
        <div className="flex w-full items-center justify-between sm:mb-2 sm:w-full sm:flex-col sm:gap-2">
          <div className="flex sm:w-full">
            <NavButton
              icon={Pencil}
              label="입력"
              onClick={checkUserInput}
              variant="blue"
            />
            <NavButton
              icon={Users}
              label="근무"
              onClick={checkUser}
              variant="green"
            />
          </div>
          <div className="flex sm:w-full">
            {carId.length > 0 && (
              <NavButton
                icon={Sheet}
                label="엑셀"
                onClick={() =>
                  downloadExcel(
                    drivingInform || [],
                    currentDate || null,
                    car,
                    totalFuelCost,
                    totalToll,
                    totalEtcCost,
                    totalDrivingKM,
                    grandTotal,
                  )
                }
                variant="green"
              />
            )}
            <NavButton
              icon={Wrench}
              label="점검"
              onClick={checkCarService}
              variant="blue"
            />
            <NavButton
              icon={Settings}
              label="설정"
              onClick={onClickAdmin}
              variant="green"
            />
          </div>
        </div>

        <div className="flex items-center sm:hidden sm:w-full sm:justify-center">
          <div className="mx-4 border border-gray-300 md:h-10" />
          <button>
            <SlRefresh
              onClickCapture={handleRefresh}
              className={`text-slate-600 transition-all duration-200 hover:text-slate-800 sm:h-4 sm:w-4 md:h-6 md:w-6 ${isRefreshing ? "animate-spin" : ""} hover:opacity-80`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
