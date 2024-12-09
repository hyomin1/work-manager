import { useEffect, useState } from "react";
import { axiosReq, dailyWorkDay } from "../../api";
import { X } from "lucide-react";

interface IDailyWorkView {
  id: string;
  currentDate: Date | null;
  setViewId: React.Dispatch<React.SetStateAction<string>>;
}

function DailyWorkView({ id, setViewId, currentDate }: IDailyWorkView) {
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [content, setContent] = useState("");
  const [nextContent, setNextContent] = useState("");

  const fetchDailyWork = async () => {
    const response = await axiosReq.get(`/api/employee-inform/dailyWork/${id}`);
    if (response.status !== 200) {
      return;
    }

    const { username, department, content, nextContent } =
      response.data.dailyWork;
    setUsername(username);
    setDepartment(department);
    setContent(content);
    setNextContent(nextContent);
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
    fetchDailyWork();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-25">
      <div className="h-full w-[60%] rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">일일 업무 현황</h2>
          <button
            onClick={() => setViewId("")}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <div className="flex h-full flex-col rounded">
          <div className="grid h-[4%] grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              파트
            </div>
            <div className="col-span-5 pl-2">
              <div className="flex h-10 w-[15%] items-center">{department}</div>
            </div>
          </div>

          <div className="grid h-[4%] grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              작성자
            </div>
            <div className="col-span-5 pl-2">
              <div className="flex h-10 w-[15%] items-center">{username}</div>
            </div>
          </div>

          <div className="grid h-[4%] grid-cols-6 border-b">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              작성 일자
            </div>
            <div className="col-span-5 flex items-center pl-2">
              {dailyWorkDay(currentDate || new Date())}
            </div>
          </div>

          <div className="flex h-[60%] flex-col overflow-y-auto border border-b">
            <h3 className="px-4 py-2 text-sm font-bold">• {username}</h3>
            <div className="whitespace-pre-line px-4 py-2">{content}</div>
          </div>

          <div className="grid h-[20%] grid-cols-6">
            <div className="col-span-1 flex items-center border-r bg-gray-100 p-2 font-semibold">
              내일 일과
            </div>
            <div className="col-span-5">
              <h4 className="px-4 pt-2 text-sm font-bold">• {username}</h4>
              <div className="h-36 overflow-y-auto whitespace-pre-line px-4 pb-2">
                {nextContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyWorkView;
