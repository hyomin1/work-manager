import { describe, expect, it } from 'vitest';
import { calculateCost } from './calculateCost';
import type { VehicleLog } from '../types/vehicleLog';

describe('calculateCost', () => {
  it('차량 운행 비용을 계산한다.', () => {
    const vehicleLogs = [
      {
        _id: '1',
        totalKM: 10,
        fuelCost: 50000,
        etc: { name: '세차', cost: 20000 },
        toll: 1000,
      },
      {
        _id: '2',
        totalKM: 50,
        fuelCost: 30000,
        toll: 5000,
        etc: { name: '', cost: 0 },
      },
    ] as VehicleLog[];
    const result = calculateCost(vehicleLogs);

    expect(result).toEqual({
      totalFuelCost: 80000,
      totalToll: 6000,
      totalEtcCost: 20000,
      totalDrivingKM: 60,
      grandTotal: 106000,
    });
  });

  it('빈 배열일때 모든 값이 0이다', () => {
    const result = calculateCost([]);

    expect(result).toEqual({
      totalFuelCost: 0,
      totalToll: 0,
      totalEtcCost: 0,
      totalDrivingKM: 0,
      grandTotal: 0,
    });
  });

  it('undefined 일때 모든 값이 0이다.', () => {
    const result = calculateCost(undefined);

    expect(result).toEqual({
      totalFuelCost: 0,
      totalToll: 0,
      totalEtcCost: 0,
      totalDrivingKM: 0,
      grandTotal: 0,
    });
  });

  it('단일 항목도 계산한다', () => {
    const vehicleLog = [
      {
        _id: '1',
        fuelCost: 10000,
        toll: 20000,
        etc: { name: '정비', cost: 50000 },
        totalKM: 200,
      },
    ] as VehicleLog[];

    const result = calculateCost(vehicleLog);

    expect(result).toEqual({
      totalFuelCost: 10000,
      totalToll: 20000,
      totalEtcCost: 50000,
      totalDrivingKM: 200,
      grandTotal: 80000,
    });
  });

  it('기타 비용이 0인 경우도 처리한다', () => {
    const vehicleLog = [
      {
        _id: '1',
        fuelCost: 10000,
        toll: 20000,
        etc: { name: '', cost: 0 },
        totalKM: 200,
      },
    ] as VehicleLog[];

    const result = calculateCost(vehicleLog);

    expect(result).toEqual({
      totalFuelCost: 10000,
      totalToll: 20000,
      totalEtcCost: 0,
      totalDrivingKM: 200,
      grandTotal: 30000,
    });
  });
});
