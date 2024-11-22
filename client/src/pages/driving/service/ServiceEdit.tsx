import React, { useState } from "react";
import { ICarServiceBase } from "../../../interfaces/interface";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { axiosReq } from "../../../api";
import { useQueryClient } from "@tanstack/react-query";

dayjs.locale("ko");
interface IServiceEdit {
  item: ICarServiceBase;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}
const datePickerStyles = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
  },
};

function ServiceEdit({ item, setEditingItemId }: IServiceEdit) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ICarServiceBase>({
    _id: item._id,
    date: item.date,
    type: item.type,
    mileage: item.mileage,
    note: item.note,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const validateForm = () => {
    if (!formData.date) {
      return alert("정비 일자를 선택해주세요");
    }
    if (!formData.type) {
      return alert("정비 유형을 선택해주세요");
    }
    if (!formData.mileage.base) {
      return alert("최근 점검(km)을 입력해주세요");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    const response = await axiosReq.put("/api/driving-inform/editService", {
      ...formData,
    });
    if (response.status !== 200) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["services"] });
    setEditingItemId("");
  };
  return (
    <div className="fixed inset-0 top-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-65 px-4">
      <form
        className="flex w-[40%] flex-col rounded-lg bg-white p-6 shadow-lg"
        onSubmit={onSubmit}
      >
        <h2 className="mb-4 text-center text-xl font-bold">정보 수정</h2>
        <div className="flex flex-col">
          <div className="my-2">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <MobileDatePicker
                sx={datePickerStyles}
                label="정비 일자"
                format="YYYY.MM.DD"
                value={dayjs(formData.date)}
                onChange={(newDate: Dayjs | null) =>
                  newDate && updateField("date", newDate.toDate())
                }
              />
            </LocalizationProvider>
          </div>

          <div className="my-2">
            <TextField
              fullWidth
              label="정비 유형"
              variant="outlined"
              value={formData.type}
              onChange={(e) => updateField("type", e.target.value)}
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="최근 점검(km)"
              variant="outlined"
              value={formData.mileage.base}
              onChange={(e) =>
                updateField("mileage", {
                  ...formData.mileage,
                  base: e.target.value,
                })
              }
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="다음 점검(km)"
              variant="outlined"
              value={formData.mileage.next}
              onChange={(e) =>
                updateField("mileage", {
                  ...formData.mileage,
                  next: e.target.value,
                })
              }
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              label="비고"
              variant="outlined"
              value={formData.note}
              onChange={(e) => updateField("note", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:opacity-80"
          >
            변경
          </button>
          <button
            type="button"
            onClick={() => setEditingItemId("")}
            className="rounded bg-gray-300 px-4 py-2 hover:opacity-80"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServiceEdit;
