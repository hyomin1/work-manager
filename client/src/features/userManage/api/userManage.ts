import { api } from '../../../api';

// 유저 목록 (승인된)
export async function getUsers() {
  const response = await api.get('/api/users');
  return response.data.users || '';
}

export async function deleteUser(id: string) {
  return await api.delete(`/api/users/${id}`);
}

export async function approveUser(id: string) {
  return await api.patch(`/api/users/${id}/approve`);
}

export async function rejectUser(id: string) {
  await api.patch(`/api/users/${id}/reject`);
}

export async function changeRole(id: string, role: number) {
  return await api.patch(`/api/users/${id}/role`, { role });
}
