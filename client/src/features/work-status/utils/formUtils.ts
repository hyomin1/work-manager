import type { FormValidation } from '../types/workStatus';

export function mergeSelectedAndInput<T>(
  selected: Array<T | null>,
  input: string,
  key: keyof T
) {
  return selected
    .filter((item): item is T => item !== null)
    .map((item) => String(item[key]).trim())
    .concat(input.trim())
    .filter(Boolean);
}

export function validateForm({
  selectedUsername,
  selectedDestinations,
  selectedBusinesses,
  selectedWorks,
  selectedCar,
  isDaily,
  startDate,
  endDate,
}: FormValidation) {
  if (!isDaily) return '날짜를 선택해주세요';
  if (!selectedUsername) return '이름을 선택해주세요';
  if (selectedDestinations.length === 0) return '방문지를 선택해주세요';
  if (selectedBusinesses.length === 0) return '사업명을 선택해주세요';
  if (selectedDestinations.length !== selectedBusinesses.length)
    return '방문지와 사업명 수가 일치하지 않습니다.';
  if (selectedWorks.length === 0) return '업무를 선택해주세요';
  if (selectedDestinations.length > selectedWorks.length)
    return '업무를 선택해주세요';
  if (selectedDestinations.length < selectedWorks.length)
    return '업무의 개수가 많습니다.';
  if (!selectedCar) return '차량을 선택해주세요';

  if (startDate && endDate && startDate > endDate)
    return '시작일이 종료일보다 늦습니다.';

  return null;
}
