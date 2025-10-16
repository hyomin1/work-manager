import { describe, expect, it } from 'vitest';
import {
  createStyleMap,
  findNonEmptyCarInGroup,
  getBusinessesByDestination,
  getCellContent,
  getDestinations,
  getRowSpans,
  shouldRenderCell,
  sortWorkStatus,
} from './work-status';
import type { WorkStatus } from '../types/workStatus';

describe('근무 현황 유틸 함수', () => {
  const workStatus = [
    {
      _id: '1',
      username: '이효민',
      destination: '서울',
      business: '회의',
      work: '미팅',
      car: '1234',
    },
    {
      _id: '2',
      username: '김철수',
      destination: '서울',
      business: '회의',
      work: '미팅',
      car: '',
    },
    {
      _id: '3',
      username: '홍길동',
      destination: '부산',
      business: '출장',
      work: '점검',
      car: '5678',
    },
  ] as WorkStatus[];

  describe('sortWorkStatus', () => {
    it('방문지를 기준으로 정렬한다', () => {
      const sortedData = sortWorkStatus(workStatus);
      expect(sortedData[0].username).toBe('홍길동');
      expect(sortedData[1].username).toBe('김철수');
      expect(sortedData[2].username).toBe('이효민');
    });

    it('원본 배열을 변경하지 않는다', () => {
      const og = [...workStatus];
      const sorted = sortWorkStatus(workStatus);

      expect(workStatus).toEqual(og);
      expect(sorted).not.toBe(workStatus);
    });

    it('빈 배열을 처리한다', () => {
      const result = sortWorkStatus([]);
      expect(result).toEqual([]);
    });
  });

  describe('getDestinations', () => {
    it('방문지 목록을 정렬해서 반환한다', () => {
      const destinations = getDestinations(workStatus);
      expect(destinations).toEqual(['부산', '서울']);
    });

    it('중복된 방문지를 제거한다', () => {
      const destinations = getDestinations(workStatus);
      expect(destinations.length).toBe(2);
    });

    it('빈 배열을 처리한다', () => {
      const destinations = getDestinations([]);
      expect(destinations).toEqual([]);
    });
  });

  describe('getBusinessesByDestination', () => {
    it('특정 방문지의 업무 목록을 반환한다', () => {
      const businesses = getBusinessesByDestination(workStatus, '서울');
      expect(businesses).toContain('회의');
    });

    it('해당 방문지가 없으면 빈 배열을 반환한다', () => {
      const businesses = getBusinessesByDestination(workStatus, '광주');
      expect(businesses).toEqual([]);
    });

    it('중복 업무를 제거한다', () => {
      const businesses = getBusinessesByDestination(workStatus, '서울');
      expect(businesses.length).toBe(1);
    });
  });

  describe('findNonEmptyCarInGroup', () => {
    it('그룹 내에서 차량 번호를 찾는다', () => {
      const car = findNonEmptyCarInGroup(workStatus, 0);
      expect(car).toBe('1234');
    });

    it('차량이 없으면 빈 문자열을 반환한다', () => {
      const noCarWorks: WorkStatus[] = [
        {
          _id: '1',
          destination: '서울',
          business: '회의',
          work: '미팅',
          car: '',
          username: '홍길동',
        } as WorkStatus,
      ];
      const car = findNonEmptyCarInGroup(noCarWorks, 0);
      expect(car).toBe('');
    });

    it('차량이 없는 경우 앞 인덱스에서 차량이 존재하는지 찾는다', () => {
      const car = findNonEmptyCarInGroup(workStatus, 1);
      expect(car).toBe('1234');
    });
  });

  describe('getRowSpans', () => {
    const sorted = sortWorkStatus(workStatus);
    const rowSpans = getRowSpans(sorted);
    it('rowSpan 정보를 Map으로 반환한다', () => {
      expect(rowSpans).toBeInstanceOf(Map);
      expect(rowSpans.size).greaterThan(0);
    });

    it('같은 그룹의 첫 행에 rowSpan을 적용한다', () => {
      expect(rowSpans.get('1-destination')).toBe(2);
    });

    it('같은 그룹의 두 번째 행은 0을 반환한다', () => {
      expect(rowSpans.get('2-destination')).toBe(0);
    });

    it('단일 항목은 rowSpan 1을 가진다', () => {
      const single = [
        {
          _id: '1',
          username: '이효민',
          destination: '서울',
          business: '회의',
          work: '미팅',
          car: '1234',
        },
      ] as WorkStatus[];

      const rowSpans = getRowSpans(single);
      expect(rowSpans.get('0-destination')).toBe(1);
    });
  });

  describe('createStyleMap', () => {
    const styleMap = createStyleMap(workStatus);
    it('styleMap을 생성한다', () => {
      expect(styleMap).toBeInstanceOf(Map);
      expect(styleMap.size).greaterThan(0);
    });

    it('Map의 각 키는 destination-business 형식이다', () => {
      const keys = Array.from(styleMap.keys());
      expect(keys).toContain('서울-회의');
      expect(keys).toContain('부산-출장');
    });

    it('각 스타일마다 bgColor가 포함된다', () => {
      const first = styleMap.values().next().value;
      expect(first).toHaveProperty('backgroundColor');
      expect(typeof first?.backgroundColor).toBe('string');
    });

    it('빈 배열은 빈 Map을 반환한다', () => {
      const styleMap = createStyleMap([]);
      expect(styleMap.size).toBe(0);
    });
  });

  describe('shouldRenderCell', () => {
    it('rowSpan이 0이 아니면 true를 반환한다', () => {
      const rowSpans = new Map([['0-name', 1]]);
      const shouldRender = shouldRenderCell(rowSpans, 0, 'name');
      expect(shouldRender).toBe(true);
    });

    it('rowSpan이 0이면 false를 반환한다', () => {
      const rowSpans = new Map([['1-name', 0]]);
      const shouldRender = shouldRenderCell(rowSpans, 1, 'name');
      expect(shouldRender).toBe(false);
    });

    it('존재하지 않는 키는 true를 반환한다', () => {
      const rowSpans = new Map();
      expect(shouldRenderCell(rowSpans, 0, 'name')).toBe(true);
    });
  });

  describe('getCellContent', () => {
    const sorted = sortWorkStatus(workStatus);

    it('name 필드의 내용을 반환한다', () => {
      const content = getCellContent(sorted[0], 'name', sorted, 0);
      expect(content).toBe(sorted[0].username);
    });

    it('destination 필드 내용을 반환한다', () => {
      const content = getCellContent(sorted[0], 'destination', sorted, 0);
      expect(content).toBe(sorted[0].destination);
    });

    it('business 필드 내용을 반환한다', () => {
      const content = getCellContent(sorted[0], 'business', sorted, 0);
      expect(content).toBe(sorted[0].business);
    });

    it('work 필드 내용을 반환한다', () => {
      const content = getCellContent(sorted[0], 'work', sorted, 0);
      expect(content).toBe(sorted[0].work);
    });
    it('car 필드 내용을 반환다', () => {
      const content = getCellContent(sorted[0], 'car', sorted, 0);
      expect(content).toBe(sorted[0].car);
    });

    it('car 필드가 비어있으면 그룹 내에서 찾는다', () => {
      const content = getCellContent(sorted[1], 'car', sorted, 1);
      expect(content).toBe('1234');
      expect(content).toBeTruthy();
    });

    it('잘못된 필드는 빈 문자열을 반환한다', () => {
      const content = getCellContent(sorted[0], 'invalid', sorted, 0);
      expect(content).toBe('');
    });
  });
});
