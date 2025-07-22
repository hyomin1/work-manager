import type { AdminBody, AdminType } from '../types/admin';

export function changeName(type: string) {
  switch (type) {
    case 'username':
      return '이름';
    case 'destination':
      return '방문지';
    case 'business':
      return '사업명';
    case 'work':
      return '업무';
    case 'car':
      return '차량';
    case 'etcName':
      return '기타 비용';
    case 'department':
      return '파트';
    default:
      return '';
  }
}
export function createAdminData<T extends AdminType>(
  type: T,
  inputValue: string,
  destination?: string
): {
  url: string;
  body: AdminBody[T];
} {
  const baseUrl = '/api/employee-inform/';

  switch (type) {
    case 'username':
      return {
        url: baseUrl + 'addName',
        body: { username: inputValue },
      } as { url: string; body: AdminBody[T] };

    case 'destination':
      return {
        url: baseUrl + 'addDestination',
        body: { destination: inputValue },
      } as { url: string; body: AdminBody[T] };

    case 'business':
      return {
        url: baseUrl + 'addBusiness',
        body: {
          business: inputValue,
          destinationId: destination?.split(',')[0],
        },
      } as { url: string; body: AdminBody[T] };

    case 'work':
      return {
        url: baseUrl + 'addWork',
        body: { work: inputValue },
      } as { url: string; body: AdminBody[T] };

    case 'car':
      return {
        url: baseUrl + 'addCar',
        body: { car: inputValue },
      } as { url: string; body: AdminBody[T] };

    case 'etcName':
      return {
        url: baseUrl + 'addEtcName',
        body: { etcName: inputValue },
      } as { url: string; body: AdminBody[T] };

    case 'department':
      return {
        url: baseUrl + 'addDepartment',
        body: { department: inputValue },
      } as { url: string; body: AdminBody[T] };

    default:
      throw new Error('Invalid type');
  }
}

export function editAdminData<T extends AdminType>(
  type: T,
  inputValue: string,
  editId: string,
  destination?: string
): {
  url: string;
  body: AdminBody[T] & { id: string };
} {
  const baseUrl = '/api/employee-inform/';
  let url = '';
  let body: AdminBody[T] & { id: string };

  switch (type) {
    case 'username':
      url = baseUrl + 'editName';
      body = { username: inputValue, id: editId } as unknown as AdminBody[T] & {
        id: string;
      };
      break;

    case 'destination':
      url = baseUrl + 'editDestination';
      body = {
        destination: inputValue,
        id: editId,
      } as unknown as AdminBody[T] & { id: string };
      break;

    case 'business':
      url = baseUrl + 'editBusiness';
      body = {
        business: inputValue,
        destinationId: destination?.split(',')[0],
        id: editId,
      } as unknown as AdminBody[T] & { id: string };
      break;

    case 'work':
      url = baseUrl + 'editWork';
      body = { work: inputValue, id: editId } as unknown as AdminBody[T] & {
        id: string;
      };
      break;

    case 'car':
      url = baseUrl + 'editCar';
      body = { car: inputValue, id: editId } as unknown as AdminBody[T] & {
        id: string;
      };
      break;

    case 'etcName':
      url = baseUrl + 'editEtcName';
      body = { etcName: inputValue, id: editId } as unknown as AdminBody[T] & {
        id: string;
      };
      break;

    case 'department':
      url = baseUrl + 'editDepartment';
      body = {
        department: inputValue,
        id: editId,
      } as unknown as AdminBody[T] & { id: string };
      break;

    default:
      throw new Error('Invalid type');
  }

  return { url, body };
}
