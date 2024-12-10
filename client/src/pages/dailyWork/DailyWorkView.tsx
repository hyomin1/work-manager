import { useEffect, useState } from "react";
import { axiosReq, dailyWorkDay } from "../../api";
import { Edit, X } from "lucide-react";
import { useCustomQueries } from "../../hooks/useCustomQuery";
import { Button, MenuItem, Select, TextField } from "@mui/material";

interface IDailyWorkView {
  id: string;
  currentDate: Date | null;
  setViewId: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}

function DailyWorkView({
  id,
  setViewId,
  currentDate,
  refetch,
}: IDailyWorkView) {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [content, setContent] = useState("");
  const [nextContent, setNextContent] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { names, departments } = useCustomQueries();

  const onSubmit = async () => {
    const response = await axiosReq.put("/api/employee-inform/dailyWork/edit", {
      _id: id,
      username,
      department,
      content,
      nextContent,
    });
    if (response.status === 200) {
      setIsEditing((prev) => !prev);
      refetch();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewId("");
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setViewId]);

  useEffect(() => {
    const fetchDailyWork = async () => {
      const response = await axiosReq.get(
        `/api/employee-inform/dailyWork/${id}`,
      );
      if (response.status !== 200) {
        return;
      }

      const { username, department, content, nextContent, isOwner } =
        response.data.dailyWork;

      setUsername(username);
      setDepartment(department);
      setContent(content);
      setNextContent(nextContent);
      setIsOwner(isOwner);
    };
    fetchDailyWork();
  }, [id]);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-25">
      <div
        className={`h-full w-[60%] sm:w-[90%] ${isEditing && "overflow-y-auto"} rounded-lg bg-white p-6 sm:overflow-y-auto`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">일일 업무 현황</h2>
          <div className="flex items-center">
            {isOwner && (
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="hover:opacity-60"
              >
                <Edit className="mr-2 md:h-6 md:w-6" strokeWidth={2.2} />
              </button>
            )}

            <button onClick={() => setViewId("")} className="hover:opacity-60">
              <X className="md:h-7 md:w-7" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <div className="flex h-full flex-col rounded">
          <div className="grid h-[4%] grid-cols-6 border-b border-r border-t">
            <div className="col-span-1 flex items-center bg-gray-100 pl-2 font-semibold sm:text-xs">
              파트
            </div>
            {isEditing ? (
              <div className="col-span-5 pl-2">
                <Select
                  className="h-8 w-[15%] sm:w-full"
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
              </div>
            ) : (
              <div className="col-span-5 pl-2">
                <div className="flex h-8 w-[15%] items-center">
                  {department}
                </div>
              </div>
            )}
          </div>

          <div className="grid h-[4%] grid-cols-6 border-b border-r">
            <div className="col-span-1 flex items-center whitespace-nowrap border-r bg-gray-100 pl-2 font-semibold sm:text-xs">
              작성자
            </div>
            {isEditing ? (
              <div className="col-span-5 pl-2">
                <Select
                  className="h-8 w-[15%] whitespace-nowrap sm:w-full"
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
              </div>
            ) : (
              <div className="col-span-5 pl-2">
                <div className="flex h-8 w-[15%] items-center whitespace-nowrap">
                  {username}
                </div>
              </div>
            )}
          </div>

          <div className="grid h-[4%] grid-cols-6 border-b border-r">
            <div className="col-span-1 flex items-center whitespace-nowrap border-r bg-gray-100 pl-2 font-semibold sm:text-xs">
              작성 일자
            </div>
            <div className="col-span-5 flex items-center pl-2">
              {dailyWorkDay(currentDate || new Date())}
            </div>
          </div>

          <div
            className={`flex flex-col border-l border-r ${!isEditing && "h-[60%] pl-3 pt-1"}`}
          >
            <h3 className="ml-1 mt-1 text-sm font-bold">• {username}</h3>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                rows={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                  },
                }}
              />
            ) : (
              <div className="mt-1 whitespace-pre-line">{content}</div>
            )}
          </div>

          <div className={`grid grid-cols-6 border ${!isEditing && "h-[25%]"}`}>
            <div className="col-span-1 flex items-center border-r bg-gray-100 pl-2 font-semibold">
              내일 일과
            </div>
            <div className={`col-span-5 ${!isEditing && "pl-3 pt-1"}`}>
              <h4 className="ml-1 mt-1 text-sm font-bold">• {username}</h4>
              {isEditing ? (
                <TextField
                  className="overflow-y-auto"
                  fullWidth
                  multiline
                  rows={7}
                  value={nextContent}
                  onChange={(e) => setNextContent(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                    },
                  }}
                />
              ) : (
                <div className="overflow-y-auto whitespace-pre-line">
                  {nextContent}
                </div>
              )}
            </div>
          </div>
          {isEditing && (
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
                onClick={() => setIsEditing((prev) => !prev)}
                sx={{
                  fontSize: "large",
                }}
              >
                취소
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyWorkView;
