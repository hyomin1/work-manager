import React, { useState } from "react";
import { axiosReq } from "../../../api";
import { QueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { X as CloseIcon, Trash2 as DeleteIcon } from "lucide-react";

interface IAddData {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  queryClient: QueryClient;
  notice: string;
}

function AddDriveNotification({
  setIsAdding,
  id,
  queryClient,
  notice,
}: IAddData) {
  const [notification, setNotification] = useState(notice);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axiosReq.post(
      "/api/driving-inform/addNotification",
      {
        id,
        notification,
      },
    );
    if (response.status === 200) {
      setIsAdding(false);
      queryClient.invalidateQueries({ queryKey: ["car", 1] });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleDelete = async () => {
    if (window.confirm("공지사항을 삭제하시겠습니까?")) {
      const response = await axiosReq.delete(
        `/api/driving-inform/removeNotification/${id}`,
      );
      if (response.status === 200) {
        setIsAdding(false);
        queryClient.invalidateQueries({ queryKey: ["car", 1] });
      }
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" fontWeight="bold">
            공지사항
          </Typography>
          <IconButton onClick={handleCancel} size="small">
            <CloseIcon size={20} />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="공지사항을 입력하세요"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#60A5FA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3B82F6",
                },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon size={18} />}
            sx={{ mr: "auto" }}
          >
            삭제
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#3B82F6",
              "&:hover": {
                bgcolor: "#2563EB",
              },
            }}
          >
            등록
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: "grey.400",
              color: "grey.700",
              "&:hover": {
                borderColor: "grey.500",
                backgroundColor: "grey.50",
              },
            }}
          >
            취소
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddDriveNotification;
