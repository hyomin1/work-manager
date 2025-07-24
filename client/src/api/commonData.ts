import { api } from '../utils';

export async function getNames() {
  const res = await api.get('/api/employee-inform/getName');
  return res.data.allNames || [];
}

export async function getDestinations() {
  const res = await api.get('/api/employee-inform/getDestination');
  return res.data.allDestinations || [];
}

export async function getBusinesses() {
  const res = await api.get('/api/employee-inform/getBusinesses');
  return res.data.allBusinesses || [];
}

export async function getBusiness(business: string) {
  const res = await api.get(`/api/employee-inform/getBusiness/${business}`);
  return res.data.business || '';
}

export async function getWorks() {
  const res = await api.get('/api/employee-inform/getWork');
  return res.data.allWorks || [];
}

export const getEtcNames = async () => {
  const res = await api.get('/api/employee-inform/getEtcName');
  return res.data.allEtcNames || [];
};

export const getDepartments = async () => {
  const res = await api.get('/api/employee-inform/getDepartment');
  return res.data.allDepartments || [];
};
