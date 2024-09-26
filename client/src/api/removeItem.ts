import { QueryClient } from "@tanstack/react-query";
import axiosApi from "../axios";

export async function removeItem(
  type: string,
  id: string,
  queryClient: QueryClient
) {
  const isConfirm = window.confirm("삭제하시겠습니까?");
  if (isConfirm) {
    const res = await axiosApi.delete(
      `/api/employee-inform/remove${
        type.charAt(0).toUpperCase() + type.slice(1)
      }/${id}`
    );
    if (res.status === 200) {
      alert("성공적으로 삭제하였습니다.");
      queryClient.invalidateQueries({ queryKey: [type] });
      return true;
    }
  }
  return false;
}
