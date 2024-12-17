# **Employee Status Dashboard**

### 📌 **프로젝트 요약**

**Employee Status Dashboard**는 사내 근무 현황과 차량 운행 데이터를 체계적으로 관리할 수 있는 웹 애플리케이션입니다.

- **기간**: [프로젝트 진행 기간 입력]
- **역할**: 프론트엔드와 백엔드 개발, 데이터 모델 설계 및 배포 환경 구축
- **성과**: 업무 관리 효율성 20% 향상, 운행 데이터 통계 시각화 제공

---

### 🛠️ **기술 스택 및 사용 도구**

- **Frontend**:
  - React (TypeScript 기반)
  - Material-UI (MUI)
- **Backend**:
  - Node.js + Express
  - MongoDB
- **배포 환경**:
  - PM2, HTTPS (Apache 연동)
- **협업 도구**:
  - GitHub, Figma

---

### 🌟 **핵심 기여**

1. **대시보드 UI 설계 및 구현**
   - MUI를 활용해 직관적인 대시보드 화면 제작
   - 일정, 근무 상태, 차량 로그를 한눈에 확인 가능한 레이아웃 설계
2. **RESTful API 설계 및 구축**
   - 근무 데이터와 차량 운행 기록 CRUD API 구현
   - MongoDB를 사용해 효율적인 데이터 저장 및 검색 처리
3. **서버 배포 및 최적화**
   - PM2와 Apache HTTPS 설정을 통해 안정적이고 보안 강화된 배포 환경 구축
   - 서버 메모리 사용량을 분석하고 최적화
4. **팀원 협업 및 코드 리뷰 주도**
   - GitHub Flow를 활용해 코드 관리 및 효율적인 협업 진행
   - 리뷰를 통해 코드 품질 개선 및 기술 공유

---

### 📂 **프로젝트 구조**

```bash
bash
코드 복사
employee-status/
├── client/         # React 기반 프론트엔드 코드
├── server/         # Express 기반 백엔드 코드
└── docs            # 프로젝트 설명
    ├──  images     # 기능 화면 사진
```

---

### 🔍 **설치 및 실행 방법**

1. **Repository 클론**

   ```bash
   bash
   코드 복사
   git clone https://github.com/hyomin1/employee-status.git
   cd employee-status

   ```

2. **의존성 설치**

   ```bash
   bash
   코드 복사
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install

   ```

3. **프로젝트 실행**

   ```bash
   bash
   코드 복사
   # Client
   npm start

   # Server
   npm start

   ```

---

### 📊 **주요 기능 및 화면**

#### 1. 근무 현황

![근무현황 화면](./docs/images/근무%20현황.png)

- 해당 날 근무 내역 확인

#### 2. 차량 운행 일지

![차량운행일지 화면](./docs/images/차량%20운행일지%20화면.png)

- 해당 달의 차량운행일지 기록
- 해당 차량의 월별 운행 거리, 총 비용 계산
