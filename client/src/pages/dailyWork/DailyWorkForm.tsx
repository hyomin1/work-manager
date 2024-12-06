import React, { useEffect, useState } from "react";
import { axiosReq, dailyWorkDay } from "../../api";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { X } from "lucide-react";

import { useCustomQueries } from "../../hooks/useCustomQuery";

interface IDailyWorkForm {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDate: Date | null;
  refetch: () => void;
}

function DailyWorkForm({ setIsOpen, currentDate, refetch }: IDailyWorkForm) {
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [nextContent, setNextContent] = useState("");
  const { names, namesLoading, departments, departmentsLoading } =
    useCustomQueries();

  const onSubmit = async () => {
    const response = await axiosReq.post("/api/employee-inform/dailyWork/add", {
      username,
      department,
      content,
      nextContent,
    });
    if (response.status !== 200) {
      return;
    }
    setIsOpen(false);
    alert(response.data.message);
    refetch();
  };
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setIsOpen]);
  if (namesLoading || departmentsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-25">
      <div className="h-full w-[60%] overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">일일 업무 현황</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="rounded border">
          <div className="grid grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              파트
            </div>
            <div className="col-span-5 p-2">
              <FormControl fullWidth>
                <Select
                  className="h-10 w-[15%]"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments
                    ?.sort((a, b) => a.department.localeCompare(b.department))
                    .map((item) => (
                      <MenuItem key={item._id} value={item.department}>
                        {item.department}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              작성자
            </div>
            <div className="col-span-5 p-2">
              <FormControl fullWidth>
                <Select
                  className="h-10 w-[15%]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                >
                  {names
                    ?.sort((a, b) => a.username.localeCompare(b.username))
                    .map((item) => (
                      <MenuItem key={item._id} value={item.username}>
                        {item.username}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="grid grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              작성 일자
            </div>
            <div className="col-span-5 p-2">
              {dailyWorkDay(currentDate || new Date())}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 p-1 font-bold">• {username}</h3>
              <TextField
                fullWidth
                multiline
                rows={16}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              내일 일과
            </div>
            <div className="col-span-5">
              <TextField
                fullWidth
                multiline
                rows={6}
                value={nextContent}
                onChange={(e) => setNextContent(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex h-8 justify-between">
          <Button
            className="h-12 w-[20%] text-lg"
            variant="contained"
            onClick={onSubmit}
            sx={{
              fontSize: "large",
            }}
          >
            완료
          </Button>
          <Button
            className="h-12 w-[20%] text-lg"
            variant="outlined"
            onClick={() => setIsOpen(false)}
            sx={{
              fontSize: "large",
            }}
          >
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DailyWorkForm;
