export interface StatByDestination {
  startDate: Date;
  endDate: Date;
  username: string;
  destination: string;
  business: string;
  work: string;
  specificDate: Date;
  remarks: string;
}

// 통계 이름 검색 인터페이스
export interface StatByName extends StatByDestination {
  car: string;
}
