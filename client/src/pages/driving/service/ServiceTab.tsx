import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import ServiceTable from "./ServiceTable";
import { axiosReq, getCars, getServices } from "../../../api";
import { ICars, ICarService } from "../../../interfaces/interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddDriveNotification from "../components/AddDriveNotification";
import { useLocation } from "react-router-dom";
import useDrivingStore from "../../../stores/drivingStore";

dayjs.locale("ko");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const datePickerStyles = {
  width: "100%",
};

function ServiceTab() {
  //const [carId, setCarId] = useState("");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState("");
  const [mileage, setMileage] = useState({
    base: "",
    next: "",
  });
  const [note, setNote] = useState("");

  const [notification, setNotification] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const queryClient = useQueryClient();
  const location = useLocation();

  const { carId, setCarId } = useDrivingStore();

  useEffect(() => {
    if (location.state) {
      setCarId(location.state.car);
    }
  }, [location, setCarId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInput = () => {
    if (!carId) {
      alert("차량을 선택해주세요.");
      return;
    }
    handleOpen();
  };

  const { data: cars } = useQuery<ICars[]>({
    queryKey: ["car", 1],
    queryFn: getCars,
  });

  const { data: services, refetch } = useQuery<ICarService[]>({
    queryKey: ["services", carId],
    queryFn: () => getServices(carId),
    enabled: carId.length > 0,
  });

  const handleChangeCar = (e: SelectChangeEvent) => {
    setCarId(e.target.value as string);
  };

  const handleSubmit = async () => {
    const response = await axiosReq.post("/api/driving-inform/addService", {
      carId,
      date,
      type,
      mileage,
      note,
    });
    if (response.status !== 200) {
      return;
    }
    alert(response.data.message);
    setOpen(false);
    refetch();
    setDate(null);
    setType("");
    setMileage({ base: "", next: "" });
    setNote("");
  };
  useEffect(() => {
    const car = cars?.find((car) => car._id === carId);
    if (car) {
      setNotification(car.notification);
    }
  }, [carId, cars]);

  return (
    <div className="flex h-full w-[90%] flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-zinc-100 sm:p-2">
      <div className="print-hidden flex w-full items-center rounded-t-2xl border border-t-gray-300 sm:h-auto sm:flex-col md:h-16 md:justify-between">
        <div className="flex items-center sm:w-full sm:p-3 md:ml-2 md:w-[30%]">
          <FormControl fullWidth size="small">
            <InputLabel id="car">차량 선택</InputLabel>
            <Select
              id="car"
              labelId="car"
              label="차량 선택"
              onChange={handleChangeCar}
              value={carId}
            >
              {cars &&
                cars
                  .sort((a, b) => a.car.localeCompare(b.car))
                  .map((car) => (
                    <MenuItem key={car._id} value={car._id}>
                      {car.car}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <button
            onClick={handleInput}
            className="button-effect ml-8 flex items-center justify-center whitespace-nowrap rounded-lg bg-[#0EA5E9] px-4 py-2 text-white sm:flex-1 sm:text-lg md:mr-4"
          >
            <Pencil className="sm:h-4 sm:w-4" />
            <span className="ml-1 sm:text-xs">입력</span>
          </button>

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <h2>정비 내용 입력</h2>
              <div className="my-2">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ko"
                >
                  <MobileDatePicker
                    label="정비 날짜*"
                    onChange={(newDate: Dayjs | null) =>
                      newDate && setDate(newDate.toDate())
                    }
                    value={date && dayjs(date)}
                    sx={datePickerStyles}
                    format="YYYY.MM.DD"
                  />
                </LocalizationProvider>
              </div>
              <div className="my-2">
                <TextField
                  fullWidth
                  label="정비 유형*"
                  variant="outlined"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="my-2">
                <TextField
                  fullWidth
                  label="최근 점검(Km)*"
                  variant="outlined"
                  value={mileage.base}
                  onChange={(e) =>
                    setMileage({ ...mileage, base: e.target.value })
                  }
                />
              </div>
              <div className="my-2">
                <TextField
                  fullWidth
                  label="다음 점검(Km)"
                  variant="outlined"
                  value={mileage.next}
                  onChange={(e) =>
                    setMileage({ ...mileage, next: e.target.value })
                  }
                />
              </div>
              <div className="my-2">
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="비고"
                  variant="outlined"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  입력
                </button>
                <button
                  onClick={handleClose}
                  className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  취소
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <div>
        {carId.length > 0 && (
          <Alert
            onClick={() => setIsAdding(true)}
            severity="info"
            variant="outlined"
            className="flex h-16 w-full cursor-pointer items-center border border-black hover:opacity-60"
            sx={{
              fontSize: "medium",
              overflowY: "auto",
              bgColor: "#93C5FD",
              borderRadius: "0px",
              border: "1px solid lightgray",
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
            {notification || "공지사항을 등록해주세요"}
          </Alert>
        )}
        {isAdding && (
          <AddDriveNotification
            setIsAdding={setIsAdding}
            id={carId}
            queryClient={queryClient}
            notice={notification || ""}
          />
        )}
      </div>

      <ServiceTable services={services || []} refetch={refetch} />
    </div>
  );
}

export default ServiceTab;
