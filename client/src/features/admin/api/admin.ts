import { api } from '../../../utils';
import type { AdminType } from '../types/admin';
import { createAdminData, editAdminData } from '../utils/admin';

export async function removeCommonItem(type: string, id: string) {
  const url = `/api/employee-inform/remove${
    type.charAt(0).toUpperCase() + type.slice(1)
  }/${id}`;
  return await api.delete(url);
}

export async function createCommonItem(
  activeTab: AdminType,
  inputValue: string,
  destination?: string
) {
  const { url, body } = createAdminData(activeTab, inputValue, destination);
  return await api.post(url, body);
}

export async function editCommonItem(
  activeTab: AdminType,
  inputValue: string,
  editId: string,
  destination?: string
) {
  const { url, body } = editAdminData(
    activeTab,
    inputValue,
    editId,
    destination
  );
  return await api.patch(url, body);
}

export async function directAdminSession() {
  const res = await api.get('/auth/directAdminSession');
  return res.status;
}
