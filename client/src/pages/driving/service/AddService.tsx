import { Modal, Box, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SetStateAction, useEffect } from "react";
import { axiosReq } from "../../../api";
import { WrenchIcon, XIcon } from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%", // 모바일에서는 화면의 90%
    sm: "500px", // 태블릿 이상에서는 500px 고정
  },
  maxHeight: {
    xs: "90vh", // 모바일에서는 화면 높이의 90%
    sm: "85vh", // 태블릿 이상에서는 화면 높이의 85%
  },
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: "24px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  p: 0,
  outline: "none",
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    "&:hover fieldset": {
      borderColor: "#3b82f6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#3b82f6",
  },
};

interface IAddService {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  mileage: {
    base: string;
    next: string;
  };
  date: Date | null;
  setDate: React.Dispatch<SetStateAction<Date | null>>;
  type: string;
  setType: React.Dispatch<SetStateAction<string>>;
  setMileage: React.Dispatch<SetStateAction<{ base: string; next: string }>>;
  refetch: () => void;
  carId: string;
  note: string;
  setNote: React.Dispatch<SetStateAction<string>>;
}

export default function AddService({
  open,
  setOpen,
  mileage,
  date,
  setDate,
  type,
  setType,
  setMileage,
  refetch,
  carId,
  note,
  setNote,
}: IAddService) {
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      const response = await axiosReq.post("/api/driving-inform/addService", {
        carId,
        date,
        type,
        mileage,
        note,
      });

      if (response.status === 201) {
        alert(response.data.message);
        setOpen(false);
        refetch();
        setDate(null);
        setType("");
        setMileage({ base: "", next: "" });
        setNote("");
      }
    } catch (error) {
      console.error("Error submitting service:", error);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setOpen]);

  return (
    <Modal open={open} onClose={handleClose} className="backdrop-blur-sm">
      <Box sx={style}>
        <div className="sticky top-0 z-10 rounded-t-[24px] bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4 sm:px-6">
          <div className="flex items-center space-x-3">
            <WrenchIcon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            <h2 className="text-lg font-bold text-white sm:text-xl">
              정비 내용 입력
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 text-white/80 transition-colors hover:text-white sm:right-4 sm:top-4"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-6">
          <div className="space-y-4">
            <div>
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
                  format="YYYY.MM.DD"
                  sx={{
                    width: "100%",
                    ...inputStyle,
                  }}
                />
              </LocalizationProvider>
            </div>

            <TextField
              fullWidth
              label="정비 유형*"
              variant="outlined"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={inputStyle}
            />

            <div className="flex flex-col gap-4 sm:flex-row">
              <TextField
                fullWidth
                label="최근 점검(Km)*"
                variant="outlined"
                value={mileage.base}
                onChange={(e) =>
                  setMileage({ ...mileage, base: e.target.value })
                }
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="다음 점검(Km)"
                variant="outlined"
                value={mileage.next}
                onChange={(e) =>
                  setMileage({ ...mileage, next: e.target.value })
                }
                sx={inputStyle}
              />
            </div>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="비고"
              variant="outlined"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={inputStyle}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:px-6"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6"
            >
              입력
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
