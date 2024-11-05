import React, { useEffect, useState } from "react";
import { useCustomQueries } from "../../hooks/useCustomQuery";
import { IInform, FormData } from "../../interfaces/interface";
import { useQueryClient } from "@tanstack/react-query";
import { axiosReq } from "../../api";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/ko";
import { Autocomplete, TextField } from "@mui/material";
dayjs.locale("ko");

interface IEditInformProps {
  item: IInform;
  currentDate: Date;
  setEditingItemId: React.Dispatch<React.SetStateAction<string>>;
}

function EmployeeEdit({
  item,
  setEditingItemId,
  currentDate,
}: IEditInformProps) {
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

  const queryClient = useQueryClient();

  const isLoading =
    namesLoading ||
    destinationsLoading ||
    businessesLoading ||
    worksLoading ||
    carsLoading;

  const [formData, setFormData] = useState<FormData>({
    date: currentDate,
    username: item.username,
    destination: item.destination,
    business: item.business,
    work: item.work,
    car: item.car,
    startDate: item.startDate,
    endDate: item.endDate,
    remarks: item.remarks,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const carOptions = [
    "선택 안함",
    ...(cars
      ? cars.sort((a, b) => a.car.localeCompare(b.car)).map((item) => item.car)
      : []),
  ];

  useEffect(() => {
    if (formData.business && businessesData && destinationsData) {
      const selectedBusiness = businessesData.find(
        (b) => b.business === formData.business,
      );
      if (selectedBusiness) {
        const matchingDestination = destinationsData.find(
          (dest) => dest._id === selectedBusiness.destinationId,
        );
        if (
          matchingDestination &&
          matchingDestination.destination !== formData.destination
        ) {
          updateField("destination", matchingDestination.destination);
        }
      }
    }
  }, [formData, businessesData, destinationsData]);

  const validateForm = () => {
    if (!formData.username) {
      return alert("이름을 선택해주세요");
    }
    if (!formData.destination) {
      return alert("방문지를 선택해주세요");
    }
    if (!formData.business) {
      return alert("사업명을 선택해주세요");
    }
    if (!formData.work) {
      return alert("업무를 선택해주세요");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateForm();

    const response = await axiosReq.put("/api/employee-inform/editInform", {
      _id: item._id,
      ...formData,
      startDate: item.isDaily === 3 ? formData.startDate : formData.date,
      endDate: item.isDaily === 3 ? formData.endDate : formData.date,
    });
    if (response.status !== 200) {
      return;
    }
    alert(response.data.message);
    queryClient.invalidateQueries({ queryKey: ["employeeInform"] });
    setEditingItemId("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const datePickerStyles = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
    },
  };
  return (
    <div className="fixed inset-0 top-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-65 px-4">
      <form
        onSubmit={onSubmit}
        className="flex w-[40%] flex-col rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-center text-xl font-bold">정보 수정</h2>
        <div className="flex flex-col">
          <div className="my-2">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              {item.isDaily === 3 ? (
                <div className="mt-4 flex">
                  <MobileDatePicker
                    label="시작일"
                    onChange={(newDate: Dayjs | null) =>
                      newDate && updateField("startDate", newDate.toDate())
                    }
                    value={dayjs(formData.startDate)}
                    sx={datePickerStyles}
                  />
                  <MobileDatePicker
                    label="종료일"
                    onChange={(newDate: Dayjs | null) =>
                      newDate && updateField("endDate", newDate.toDate())
                    }
                    value={dayjs(formData.endDate)}
                    sx={datePickerStyles}
                  />
                </div>
              ) : (
                <MobileDatePicker
                  label="시작일"
                  onChange={(newDate: Dayjs | null) =>
                    newDate && updateField("date", newDate.toDate())
                  }
                  value={dayjs(formData.date)}
                  sx={datePickerStyles}
                />
              )}
            </LocalizationProvider>
          </div>

          <div className="my-2">
            <Autocomplete
              value={formData.username}
              options={
                names
                  ?.sort((a, b) => a.username.localeCompare(b.username))
                  .map((item) => item.username) || []
              }
              renderInput={(params) => <TextField {...params} label="이름" />}
              onChange={(_, value) => value && updateField("username", value)}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={formData.destination}
              options={
                destinationsData
                  ?.sort((a, b) => a.destination.localeCompare(b.destination))
                  .map((item) => item.destination) || []
              }
              renderInput={(params) => <TextField {...params} label="방문지" />}
              onChange={(_, value) => {
                if (value) {
                  updateField("destination", value);
                  updateField("business", "");
                }
              }}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={formData.business}
              options={
                businessesData
                  ?.filter((business) => {
                    const matchingDestination = destinationsData?.find(
                      (dest) => dest.destination === formData.destination,
                    );
                    return business.destinationId === matchingDestination?._id;
                  })
                  ?.sort((a, b) => a.business.localeCompare(b.business))
                  .map((item) => item.business) || []
              }
              renderInput={(params) => <TextField {...params} label="사업명" />}
              onChange={(_, value) => value && updateField("business", value)}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={formData.work}
              options={
                workData
                  ?.sort((a, b) => a.work.localeCompare(b.work))
                  .map((item) => item.work) || []
              }
              renderInput={(params) => <TextField {...params} label="업무" />}
              onChange={(_, value) => value && updateField("work", value)}
            />
          </div>
          <div className="my-2">
            <Autocomplete
              value={formData.car}
              options={carOptions}
              renderInput={(params) => <TextField {...params} label="차량" />}
              onChange={(_, value) => value && updateField("car", value)}
            />
          </div>
          <div className="my-2">
            <TextField
              fullWidth
              multiline
              rows={2}
              label="비고"
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
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

export default EmployeeEdit;
