import React, { useState } from "react";
import { axiosReq } from "../../../api";
import { QueryClient } from "@tanstack/react-query";
import { Modal, Box, TextField } from "@mui/material";
import { Megaphone, XIcon, Trash2 } from "lucide-react";

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  queryClient: QueryClient;
  notice: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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

function AddDriveNotification({
  setIsAdding,
  id,
  queryClient,
  notice,
}: IAddData) {
  const [notification, setNotification] = useState(notice);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosReq.post(
        "/api/driving-inform/addNotification",
        {
          id,
          notification,
        },
      );
      if (response.status === 201) {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: ["car", 1] });
      }
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("공지사항을 삭제하시겠습니까?")) {
      try {
        const response = await axiosReq.delete(
          `/api/driving-inform/removeNotification/${id}`,
        );
        if (response.status === 200) {
          setIsAdding(false);
          queryClient.invalidateQueries({ queryKey: ["car", 1] });
        }
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    }
  };

  return (
    <Modal
      open={true}
      onClose={() => setIsAdding(false)}
      className="backdrop-blur-sm"
    >
      <Box sx={style}>
        <div className="relative rounded-t-[24px] bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <Megaphone className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">공지사항</h2>
          </div>
          <button
            onClick={() => setIsAdding(false)}
            className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 p-6">
          <TextField
            fullWidth
            multiline
            rows={6}
            placeholder="공지사항을 입력하세요"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            sx={inputStyle}
          />

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                등록
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default AddDriveNotification;
