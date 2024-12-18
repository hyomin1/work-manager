import { Users } from "../../interfaces/interface";
import { axiosReq } from "../../api";
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  CheckCircle,
  XCircle,
  Trash2,
  UserCircle,
  ShieldCheck,
  Car,
  Clock,
} from "lucide-react";
import { useState } from "react";
import DeleteBox from "../../components/common/DeleteBox";

interface ITableProps {
  users: Users[];
  refetch: () => void;
  value: number;
}

function UserManageTable({ users, refetch, value }: ITableProps) {
  const [open, setOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const deleteUser = async (id: string) => {
    const response = await axiosReq.delete(`/api/users/${id}`);
    if (response.status === 200) {
      refetch();
    }
    setOpen(false);
  };

  const approveUser = async (id: string) => {
    if (!window.confirm("승인하시겠습니까?")) {
      return;
    }
    const response = await axiosReq.patch(`/api/users/${id}/approve`);
    if (response.status === 200) {
      refetch();
    }
  };

  const rejectUser = async (id: string) => {
    if (!window.confirm("거절하시겠습니까?")) {
      return;
    }
    const response = await axiosReq.patch(`/api/users/${id}/reject`);
    if (response.status === 200) {
      refetch();
    }
  };

  const handleChangeRole = async (
    event: SelectChangeEvent<number>,
    id: string,
  ) => {
    const role = Number(event.target.value);
    const response = await axiosReq.patch(`/api/users/${id}/role`, { role });
    if (response.status === 200) {
      refetch();
    }
  };

  const getRoleInfo = (role: number) => {
    switch (role) {
      case 3:
        return {
          icon: ShieldCheck,
          color: "bg-violet-50 text-violet-600 border-violet-100",
          label: "관리자",
        };
      case 2:
        return {
          icon: UserCircle,
          color: "bg-blue-50 text-blue-600 border-blue-100",
          label: "일반",
        };
      case 1:
        return {
          icon: Car,
          color: "bg-emerald-50 text-emerald-600 border-emerald-100",
          label: "차량 전용",
        };
      default:
        return {
          icon: Clock,
          color: "bg-amber-50 text-amber-600 border-amber-100",
          label: "승인 대기",
        };
    }
  };

  return (
    <TableContainer
      sx={{ width: "90%", marginTop: 4, overflowY: "auto" }}
      component={Paper}
      className="overflow-hidden rounded-xl border border-gray-100 shadow-lg"
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              className="border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm"
              sx={{
                py: 3.5,
                pl: 6,
              }}
            >
              <span className="text-[0.925rem] font-semibold text-gray-600">
                계정 정보
              </span>
            </TableCell>
            {value === 0 && (
              <TableCell
                className="border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm"
                sx={{
                  py: 3.5,
                  width: "30%",
                }}
              >
                <span className="text-[0.925rem] font-semibold text-gray-600">
                  권한 설정
                </span>
              </TableCell>
            )}
            <TableCell className="border-b border-gray-200 bg-gray-50/80 backdrop-blur-sm" />
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            ?.sort((a, b) => {
              if (a.role !== b.role) {
                return b.role - a.role;
              }

              return a.userId.localeCompare(b.userId);
            })
            .map((user, index) => {
              const roleInfo = getRoleInfo(user.role);
              const RoleIcon = roleInfo.icon;

              return (
                <TableRow
                  key={index}
                  className="group transition-colors duration-200"
                >
                  <TableCell
                    className="border-b border-gray-100 group-last:border-0"
                    sx={{
                      py: 4,
                      pl: 6,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${roleInfo.color.replace("border-", "")} transition-colors duration-200`}
                      >
                        <RoleIcon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-gray-900">
                          {user.userId}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${roleInfo.color} w-[68px] justify-center`}
                        >
                          {roleInfo.label}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  {user.role > 0 && (
                    <TableCell
                      className="border-b border-gray-100 group-last:border-0"
                      sx={{ py: 4 }}
                    >
                      <FormControl className="w-full sm:w-[160px] md:w-[180px]">
                        <Select
                          className="rounded-lg bg-white"
                          sx={{
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#f1f5f9",
                              borderWidth: "2px",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e2e8f0",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#93c5fd",
                              borderWidth: "2px",
                            },
                            "& .MuiSelect-select": {
                              py: 1.5,
                              px: 2,
                            },
                          }}
                          value={user.role}
                          onChange={(e) => handleChangeRole(e, user._id)}
                        >
                          <MenuItem value={3}>관리자</MenuItem>
                          <MenuItem value={2}>일반</MenuItem>
                          <MenuItem value={1}>차량 전용</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  )}
                  <TableCell
                    align="right"
                    className="border-b border-gray-100 group-last:border-0"
                    sx={{ py: 4, pr: 5 }}
                  >
                    {user.role > 0 ? (
                      <button
                        onClick={() => {
                          setDeletedId(user._id);
                          setOpen(true);
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="sm:h-4 sm:w-4 md:h-6 md:w-6" />
                      </button>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => approveUser(user._id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-all duration-200 hover:bg-emerald-100"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => rejectUser(user._id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-100"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          <DeleteBox
            open={open}
            setOpen={setOpen}
            handleDelete={() => deleteUser(deletedId)}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserManageTable;
