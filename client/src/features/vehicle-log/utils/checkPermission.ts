import toast from 'react-hot-toast';
import { checkCarSession } from '../api/vehicleLog';

export async function checkUserPermission(
  navigate: (route: string) => void,
  route: string,
  fallbackMsg = '권한이 없습니다.'
) {
  try {
    const { isUser } = await checkCarSession();
    if (isUser) {
      navigate(route);
    } else {
      toast.error(fallbackMsg);
    }
  } catch {
    toast.error('세션 확인 중 오류가 발생했습니다');
  }
}
