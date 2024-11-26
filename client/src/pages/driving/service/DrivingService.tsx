import ArrowBack from "../../../components/common/ArrowBack";
import Logout from "../../auth/Logout";
import { calculateDate } from "../../../api";
import ServiceTab from "./ServiceTab";

function DrivingService() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between bg-gradient-to-br from-zinc-50 to-slate-100 p-4 sm:p-2">
      <div className="flex h-[10%] w-[90%] flex-col items-center sm:w-full">
        <div className="mb-4 mt-4 flex w-full items-center justify-between sm:mt-4 print:justify-center">
          <ArrowBack type="not home" />
          <span className="whitespace-nowrap font-bold sm:mx-1 sm:text-sm md:mx-8 md:text-3xl">
            {calculateDate(new Date())}
          </span>
          <Logout />
        </div>
      </div>

      <ServiceTab />
    </div>
  );
}

export default DrivingService;
