import { QueryClient } from "@tanstack/react-query";
import { axiosReq } from "../api";

export async function removeItem(
  type: string,
  id: string,
  queryClient: QueryClient,
) {
  const res = await axiosReq.delete(
    `/api/employee-inform/remove${
      type.charAt(0).toUpperCase() + type.slice(1)
    }/${id}`,
  );
  if (res.status === 200) {
    queryClient.invalidateQueries({ queryKey: [type] });
  }
}
