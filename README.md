# 📔 Logit: Daily Log & Git Activity 초기 기획서

> **"기록이 쌓이면 성장이 보입니다."**
> 나의 학습과 작업을 기록하고, GitHub 활동을 한곳에서 관리하며 성장을 추적하는 개인 개발 로그 서비스.

---

## 🎯 1. 프로젝트 목적

Logit은 Next.js App Router와 Feature-Sliced Design(FSD) 아키텍처를 학습하고 실전에 적용하기 위한 프로젝트입니다.
단순한 CRUD 앱을 넘어, 구조 중심의 설계와 개발자 친화적인 UX를 구현하는 것이 목표입니다.

-   **FSD 아키텍처 체득**: 레이어 간의 명확한 역할 분담을 통한 유지보수 용이성 확보.
-   **Local-First 전략**: `localStorage`를 활용하여 빠른 초기 응답성 및 오프라인 접근성 확보. (향후 Server Action으로 확장)
-   **Data Visualization**: 나의 작업량과 Git 커밋량을 시각적으로 연결하여 성취감 부여.
-   **개발자 친화적 UX**: 마크다운 에디터, 직관적인 상태 표시, 일관된 디자인 시스템.

---

## 🛠 2. 주요 기술 스택

-   **Framework**: Next.js (App Router)
-   **Language**: TypeScript
-   **Architecture**: Feature-Sliced Design (FSD)
-   **Styling**: Tailwind CSS (with PostCSS)
-   **State / Storage**: `localStorage` (1차 구현)
-   **Editor**: (추후 결정, e.g., React SimpleMDE or Toast UI Editor)
-   **API 연동 (예정)**: GitHub REST API

---

## ✨ 3. 핵심 기능 (MVP + 확장 기능)

### 3.1. 일일 미션 대시보드 (Daily Mission Dashboard)
-   **Log Check**: 오늘의 기록(Log) 작성 여부 표시 (`RECORD` / `EMPTY`).
-   **Git Check**: 오늘의 GitHub 커밋 활동 여부 표시 (`COMMIT` / `IDLE`).
-   **Free To Go!**: Log 및 Git 미션 모두 완료 시 활성화되는 성취감 버튼.
-   **Log + Git Streak**: 연속 기록 일수를 뱃지 형태로 표시하여 동기 부여.

### 3.2. 오늘의 작업 공간 (Today's Workspace)
-   **마크다운 에디터**: 제목, 본문(Markdown) 작성 및 실시간 프리뷰.
-   **태그 입력**: 로그에 관련 태그를 추가하여 분류 및 검색 용이.
-   **즉시 저장**: `localStorage`에 로그 데이터 자동 저장/수동 저장.

### 3.3. 주간 기록 추적 (Weekly Trace)
-   **요일별 상태 요약**: 지난 7일간의 Log 및 Git 활동 상태를 간결하게 표시.
-   **로그 제목 및 커밋 메시지**: 각 날짜의 주요 로그 제목과 대표 커밋 메시지 요약.

### 3.4. 월별 활동 개요 (Monthly Overview)
-   **월별 달력**: 1080px 이상 해상도에서만 표시되는 월간 달력.
-   **활동 표시**: 각 날짜에 Log (`RECORD`) 및 Git (`COMMIT`) 활동 여부를 시각적으로 표시.
-   **확장**: 날짜 클릭 시 해당 날짜의 상세 기록 조회.

---

## 4. 🎨 디자인 시스템 및 상태 용어

### 4.1. 컬러 팔레트 (Light/Dark Mode)
-   **Primary (Log)**: `#7F5AF0` (Light) / `#8257E6` (Dark) - 보라색 계열
-   **Secondary (Git)**: `#2CB67D` (Light) / `#50FA7B` (Dark) - 초록색 계열
-   **Accent (Success/CTA)**: `#FF8A50` (Light) / `#FF8A65` (Dark) - 주황색 계열

### 4.2. 핵심 상태 용어
-   **Log**: `RECORD` (작성 완료) / `EMPTY` (미작성)
-   **Activity**: `COMMIT` (커밋 완료) / `IDLE` (미활동)
-   **조합 상태**: `FREE_TO_GO` (모두 완료) / `SEED` (Log만 완료) / `ACTED` (Git만 완료) / `REST` (모두 미완료)

---

## 5. 🚀 개발 로드맵 (Phase 1)

1.  **FSD 초기 환경 설정**: Next.js 프로젝트 생성 및 FSD 디렉토리 구조 초기화.
2.  **컬러 시스템 적용**: Tailwind CSS 설정 파일에 정의된 컬러 팔레트 적용 (다크 모드 지원).
3.  **`shared/api/localStorage` 모듈 구현**: `Log` 데이터 저장을 위한 공통 LocalStorage 유틸리티.
4.  **`entities/log` 데이터 모델 정의**: `Log` 인터페이스 및 상태 관리 로직 (`RECORD`, `EMPTY`).
5.  **Today's Workspace (에디터)** 구현: 마크다운 에디터 컴포넌트 및 `localStorage` 연동 저장 기능.
6.  **Daily Mission Dashboard** 구현: `Log Check` 상태 표시 및 UI 연결.

---


## 6. 기술 스택


