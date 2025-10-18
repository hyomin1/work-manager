import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../../utils';
import {
  addVehicleLog,
  addVehicleMaintenance,
  addVehicleNotice,
  checkCarSession,
  deleteVehicleLog,
  deleteVehicleMaintenance,
  deleteVehicleNotice,
  editVehicleLog,
  editVehicleMaintenance,
  getCarMaintenances,
  getCars,
  getNotification,
  getVehicleLogs,
} from './vehicleLog';
import type { VehicleLog, VehicleLogForm } from '../types/vehicleLog';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  calYear: vi.fn((date: Date) => date.getFullYear()),
  calMonth: vi.fn((date: Date) => date.getMonth() + 1),
}));

describe('vehicleLog API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('getCars', () => {
    it('차량 목록을 가져온다', async () => {
      const cars = [{ id: '1', car: 'test' }];

      vi.mocked(api.get).mockResolvedValue({ data: { allCars: cars } });

      const result = await getCars();

      expect(api.get).toHaveBeenCalledWith('/api/employee-inform/getCar');
      expect(result).toEqual(cars);
    });

    it('차량 목록이 없으면 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allCars: [] } });
      const result = await getCars();
      expect(result).toEqual([]);
    });
  });

  describe('getVehicleLogs', () => {
    it('특정 차량의 운행일지를 가져온다', async () => {
      const car = 'test';
      const currentDate = new Date('2025-10-13');
      const mockData = [{ id: '1', car }];

      vi.mocked(api.get).mockResolvedValue({
        data: { allDrivingInforms: mockData },
      });

      const result = await getVehicleLogs(currentDate, car);
      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/driving-inform/getInform')
      );
      expect(api.get).toHaveBeenCalledWith(
        expect.stringContaining('year=2025')
      );
      expect(api.get).toHaveBeenCalledWith(expect.stringContaining('month=10'));
      expect(api.get).toHaveBeenCalledWith(expect.stringContaining('car=test'));

      expect(result).toEqual(mockData);
    });

    it('차량이 선택되지 않으면 빈 배열을 반환한다', async () => {
      const car = '';
      const currentDate = new Date('2025-10-13');

      const result = await getVehicleLogs(currentDate, car);
      expect(api.get).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('getNotification', () => {
    it('차량의 공지사항을 가져온다', async () => {
      const carId = 'test1';
      const notification = '정비';

      vi.mocked(api.get).mockResolvedValue({
        data: notification,
      });

      const result = await getNotification(carId);
      expect(api.get).toHaveBeenCalledWith(
        `/api/driving-inform/getNotification?id=${carId}`
      );
      expect(result).toBe(notification);
    });
  });

  describe('addVehicleLog', () => {
    it('운행일지를 추가한다', async () => {
      const form: VehicleLogForm = {
        selectedDate: new Date('2025-10-13'),
        selectedUsernames: ['이효민'],
        destination: '서울',
        car: 'test',
        startKM: 0,
        endKM: 1,
        totalKM: 1,
        etc: { name: '', cost: 0 },
        fuelCost: 0,
        toll: 0,
      };
      await addVehicleLog(form);

      expect(api.post).toHaveBeenCalledWith(
        '/api/driving-inform/addInform',
        expect.objectContaining({
          selectedDate: form.selectedDate,
          username: form.selectedUsernames,
          destination: form.destination,
        })
      );
    });
  });

  describe('editVehicleLog', () => {
    it('운행일지를 수정한다', async () => {
      const form: VehicleLog = {
        _id: '1',
        driveDay: new Date('2025-10-13'),
        username: ['이효민'],
        drivingDestination: '서울',
        startKM: 0,
        endKM: 1,
        totalKM: 1,
        etc: { name: '', cost: 0 },
        fuelCost: 0,
        toll: 0,
        isOwner: true,
        createdAt: new Date('2025-10-13'),
      };
      await editVehicleLog(form);
      expect(api.put).toHaveBeenCalledWith(
        '/api/driving-inform/editInform',
        form
      );
    });
  });

  describe('deleteVehicleLog', () => {
    it('운행일지를 삭제한다', async () => {
      const id = '1';
      await deleteVehicleLog(id);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/driving-inform/removeInform/${id}`
      );
    });
  });

  describe('addVehicleNotice', () => {
    it('차량 공지사항을 추가한다', async () => {
      const id = '1';
      const notification = '정비';

      await addVehicleNotice(id, notification);

      expect(api.post).toHaveBeenCalledWith(
        '/api/driving-inform/addNotification',
        {
          id,
          notification,
        }
      );
    });
  });

  describe('deleteVehicleNotice', () => {
    it('차량 공지사항을 삭제한다', async () => {
      const id = '1';
      await deleteVehicleNotice(id);

      expect(api.delete).toHaveBeenCalledWith(
        `/api/driving-inform/removeNotification/${id}`
      );
    });
  });

  describe('getCarMaintenance', () => {
    it('차량 정비 내역을 가져온다', async () => {
      const id = '1';
      const services = [
        {
          _id: '1',
          isOwner: true,
          type: 'test',
          date: new Date('2025-10-13'),
          mileage: { base: 'test', next: 'test' },
          note: 'test',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { services },
      });
      const result = await getCarMaintenances(id);
      expect(api.get).toHaveBeenCalledWith(
        `/api/driving-inform/getServices?carId=${id}`
      );
      expect(result).toEqual(services);
    });

    it('정비 내역이 없으면 빈 배열을 반환한다', async () => {
      const id = '1';
      vi.mocked(api.get).mockResolvedValue({
        data: {},
      });
      const result = await getCarMaintenances(id);
      expect(result).toEqual([]);
    });
  });

  describe('addVehicleMaintenance', () => {
    it('차량 정비 내역을 추가한다', async () => {
      const carId = '1';
      const form = {
        type: 'test',
        date: new Date('2025-10-13'),
        mileage: { base: 'test', next: 'test' },
        note: 'test',
      };
      await addVehicleMaintenance(carId, form);
      expect(api.post).toHaveBeenCalledWith('/api/driving-inform/addService', {
        carId,
        ...form,
      });
    });
  });

  describe('deleteVehicleMaintenance', () => {
    it('차량 정비 내역을 삭제한다', async () => {
      const carId = '1';
      await deleteVehicleMaintenance(carId);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/driving-inform/removeService/${carId}`
      );
    });
  });

  describe('editVehicleMaintenance', () => {
    it('차량 정비 내역을 수정한다', async () => {
      const form = {
        _id: '1',
        isOwner: true,
        type: 'test',
        date: new Date('2025-10-13'),
        mileage: { base: 'test', next: 'test' },
        note: 'test',
      };
      await editVehicleMaintenance(form);
      expect(api.put).toHaveBeenCalledWith(
        '/api/driving-inform/editService',
        form
      );
    });
  });

  describe('checkCarSession', () => {
    it('차량운행일지 전용 유저 세션을 확인한다', async () => {
      const data = { isUser: true };
      vi.mocked(api.get).mockResolvedValue({ data });
      const result = await checkCarSession();
      expect(api.get).toHaveBeenCalledWith('/auth/checkCarSession');
      expect(result).toEqual(data);
    });
  });
});
