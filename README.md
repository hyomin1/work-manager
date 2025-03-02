# Work Manager

<div align="center">
  
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

<h3>사내 근무 현황과 차량 운행 데이터를 체계적으로 관리하는 웹 애플리케이션</h3>

</div>

## 📌 프로젝트 개요

**Work Manager**는 사내 근무 현황과 차량 운행 데이터를 체계적으로 관리할 수 있는 종합적인 웹 애플리케이션입니다.

- **개발 기간**: 2024.09 - 2024.11
- **개발 인원**: 1명
- **프로젝트 배경**: 
  - 인턴십 초기 회사의 업무 흐름을 파악하던 중, 사내 근무 현황을 수기로 작성하고 관리하는 비효율성을 발견
  - 웹 기반 근무 현황 관리 시스템 개발을 제안 받은 후 추진
- **주요 성과**:
  - 업무 관리 효율성 대폭 증대
  - 차량 운행 통계 분석 자동화
  - 데이터 입력 오류 최소화
  - 업무 프로세스 간소화

## 🛠️ 기술 스택

<table>
  <tr>
    <th width="200">영역</th>
    <th>기술</th>
  </tr>
  <tr>
    <td><b>Frontend</b></td>
    <td>
      <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
      <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
      <img src="https://img.shields.io/badge/Material--UI-0081CB?style=flat-square&logo=material-ui&logoColor=white" alt="Material-UI" />
    </td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js" />
      <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
    </td>
  </tr>
  <tr>
    <td><b>상태 관리</b></td>
    <td>
      <img src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white" alt="React Query" />
    </td>
  </tr>
  <tr>
    <td><b>라이브러리</b></td>
    <td>
      <img src="https://img.shields.io/badge/FullCalendar-4285F4?style=flat-square" alt="FullCalendar" />
      <img src="https://img.shields.io/badge/ExcelJS-217346?style=flat-square&logo=microsoft-excel&logoColor=white" alt="ExcelJS" />
    </td>
  </tr>
  <tr>
    <td><b>배포 환경</b></td>
    <td>
      <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white" alt="PM2" />
      <img src="https://img.shields.io/badge/Apache-D22128?style=flat-square&logo=apache&logoColor=white" alt="Apache" />
      <img src="https://img.shields.io/badge/HTTPS-006400?style=flat-square&logo=https&logoColor=white" alt="HTTPS" />
    </td>
  </tr>
</table>

## 🚀 주요 기능

<div align="center">
  <img src="./docs/images/메뉴%20선택%20화면.png" width="80%" style="border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
  <p><i>애플리케이션 메인 메뉴 선택 화면</i></p>
</div>

### 📊 업무 관리 기능

<table>
  <tr>
    <td width="50%">
      <h4>🔍 근무 현황 관리</h4>
      <ul>
        <li>직원들의 현재 근무 상태를 <b>기록, 조회, 수정</b>할 수 있는 CRUD 기능</li>
        <li>React Query로 5분 단위 데이터 자동 리페칭 구현</li>
        <li>항상 최신 근무 상태 유지 및 실시간 확인 가능</li>
      </ul>
      <div align="center">
        <img src="./docs/images/근무%20현황.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
    <td width="50%">
      <h4>📝 일일 업무 내역</h4>
      <ul>
        <li>직원들의 일일 업무 작성 및 관리로 업무 진행 상황 추적</li>
        <li>기존 한글 파일 양식과 동일한 UI로 구현</li>
        <li>파트별 셀 구분으로 정보 확인 용이</li>
      </ul>
      <div align="center">
        <img src="./docs/images/일일%20업무%20현황%20화면.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <h4>📅 일정 관리</h4>
      <ul>
        <li>FullCalendar 라이브러리를 활용한 직관적인 캘린더 인터페이스</li>
        <li>사용자가 등록한 일정을 달력 형태로 확인 가능</li>
        <li>일정 클릭 시 상세 정보 확인 및 수정 기능</li>
      </ul>
      <div align="center">
        <img src="./docs/images/일정%20화면.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
    <td>
      <h4>📊 데이터 통계 분석</h4>
      <ul>
        <li>이름별, 방문지별 근무 현황 필터링 조회</li>
        <li>선택한 기간 내 데이터 분석 기능</li>
        <li>사용자별 업무 패턴 및 방문지 통계 제공</li>
      </ul>
      <div align="center">
        <img src="./docs/images/통계%20페이지%20화면.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
  </tr>
</table>

### 🚗 차량 관리 기능

<table>
  <tr>
    <td width="50%">
      <h4>🚗 차량 운행일지 관리</h4>
      <ul>
        <li>차량 운행 내역에 대한 CRUD 기능 구현</li>
        <li>월별 차량 운행 통계와 비용 자동 계산</li>
        <li>차량별 운행 정보 관리 및 분석</li>
      </ul>
      <div align="center">
        <img src="./docs/images/차량%20운행일지%20화면.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
    <td width="50%">
      <h4>🔧 차량 정비 관리</h4>
      <ul>
        <li>차량별 정비 히스토리 시간순 누적 관리</li>
        <li>차량별 필요 점검 사항 및 공지사항 등록</li>
        <li>다음 점검 일정 강조 표시로 빠른 확인 가능</li>
      </ul>
      <div align="center">
        <img src="./docs/images/차량%20점검%20화면.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
  </tr>
</table>

### 💼 데이터 입력 화면

<table>
  <tr>
    <td width="50%">
      <h4>📊 근무 현황 입력</h4>
      <ul>
        <li>드롭 다운 형식의 메뉴로 입력 오류 감소</li>
        <li>필수 입력 항목 검증을 통한 데이터 정확성 보장</li>
      </ul>
      <div align="center">
        <img src="./docs/images/근무%20현황%20입력%20폼.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
    <td width="50%">
      <h4>📊 차량 운행일지 입력</h4>
      <ul>
        <li>드롭 다운 형식의 메뉴로 입력 오류 감소</li>
        <li>자동 계산 필드로 사용자 편의성 향상</li>
      </ul>
      <div align="center">
        <img src="./docs/images/차량%20운행%20입력%20화면.png" width="100%" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />
      </div>
    </td>
  </tr>
</table>

### ⚙️ 관리자 기능

<div align="center">
  <img src="./docs/images/관리자%20설정%20페이지%20화면.png" width="70%" style="border-radius: 8px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
  <p><i>관리자 설정 화면</i></p>
</div>

<ul>
  <li>전체 데이터 관리 및 컬럼 추가 기능</li>
  <li>사용자 계정 관리 및 권한 설정</li>
  <li>시스템 설정 변경 및 맞춤 구성</li>
</ul>

## 🌟 성과 및 개선점

<table>
  <tr>
    <td width="70"><b>⏱️</b></td>
    <td><b>업무 효율성 극대화</b></td>
    <td>기존의 수기 방식에서 드롭다운 메뉴를 통한 데이터 입력 방식으로 전환하여 입력 시간과 오류를 대폭 감소</td>
  </tr>
  <tr>
    <td><b>📱</b></td>
    <td><b>접근성 향상</b></td>
    <td>반응형 웹 디자인을 적용하여, PC뿐만 아니라 모바일에서도 최적화된 화면으로 직원들이 언제 어디서나 직접 근무 현황을 확인하고 수정할 수 있게 됨</td>
  </tr>
  <tr>
    <td><b>📊</b></td>
    <td><b>작업 자동화</b></td>
    <td>수기로 차량 운행 일지를 작성하고 이를 바탕으로 엑셀 파일을 별도로 작성하던 이중 작업을 시스템에 한 번만 입력하면 자동으로 엑셀 파일이 생성되는 방식으로 개선</td>
  </tr>
  <tr>
    <td><b>🚀</b></td>
    <td><b>기능 확장</b></td>
    <td>초기 목표였던 근무 현황 관리를 넘어 차량 운행일지, 캘린더, 엑셀 변환 등 다양한 추가 기능까지 확장하여 시스템의 활용도와 가치 향상</td>
  </tr>
  <tr>
    <td><b>👍</b></td>
    <td><b>사용자 만족도</b></td>
    <td>시스템 도입 후 사용자 피드백 중, 대다수 직원들이 "이전보다 훨씬 빠르고 편리하다"는 긍정적 평가를 제공</td>
  </tr>
</table>

## 💡 개인 성장 및 배운 점

<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3>🧠 기술적 성장</h3>
  <ul>
    <li>프론트엔드 개발자로서의 역량을 한층 강화했으며, 백엔드와의 연동 경험을 쌓아 풀스택 개발자로 성장하는 데 중요한 발판</li>
    <li>React Query, FullCalendar, ExcelJS 등 다양한 라이브러리 활용 경험 축적</li>
    <li>TypeScript를 활용한 타입 안정성 확보 및 개발 생산성 향상</li>
  </ul>
  
  <h3>🔄 확장성 있는 설계</h3>
  <ul>
    <li>기존에 계획되지 않았던 추가 기능을 확장 개발하면서 확장성 있는 시스템 설계의 중요성 체득</li>
    <li>모듈화된 컴포넌트 설계로 재사용성과 유지보수성 향상</li>
  </ul>
  
  <h3>👥 사용자 중심 설계</h3>
  <ul>
    <li>실제 사내 직원들의 피드백을 반영한 지속적인 기능 개선 경험으로 사용자 중심 설계 역량 강화</li>
    <li>사용자 피드백 수집 및 반영 프로세스 구축</li>
    <li>직관적인 UI/UX 설계를 통한 사용자 학습 곡선 최소화</li>
  </ul>
</div>

## 📂 프로젝트 구조

```bash
employee-status/
├── client/              # React 프론트엔드
│   ├── src/
│   │   ├── components/  # 재사용 가능한 컴포넌트
│   │   ├── pages/       # 각 화면 페이지 컴포넌트
│   │   ├── api/         # 백엔드 API 연동 함수
│   │   ├── hooks/       # 커스텀 훅
│   │   ├── context/     # React Context API
│   │   ├── utils/       # 유틸리티 함수
│   │   └── styles/      # 글로벌 스타일 및 테마
│   └── public/          # 정적 리소스 파일
├── server/              # Express 백엔드
│   ├── src/
│   │   ├── config/      # 데이터베이스 설정
│   │   ├── routes/      # API 라우팅 정의
│   │   ├── models/      # MongoDB 스키마 정의
│   │   ├── controllers/ # API 비즈니스 로직 처리
│   │   ├── middlewares/ # Express 미들웨어
│   │   └── utils/       # 유틸리티 함수
│   └── tests/           # 백엔드 테스트
└── docs/                # 문서
    └── images/          # 스크린샷 및 이미지
```

## 🔍 설치 및 실행 방법

<details>
<summary><b>설치 가이드</b></summary>

### 1. Repository 클론
```bash
git clone https://github.com/hyomin1/employee-status.git
cd employee-status
```

### 2. 의존성 설치
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```

### 3. 환경 변수 설정
```bash
# .env 파일 생성
MONGODB_URI=mongodb://localhost:27017/employee-status
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. 프로젝트 실행
```bash
# Client
npm start

# Server
npm start
```
</details>

