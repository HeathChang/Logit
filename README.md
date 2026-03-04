## 📔 Logit

> **"기록이 쌓이면 성장이 보입니다."**  
> 나의 학습과 작업을 기록하고, GitHub 활동을 한곳에서 관리하며 성장을 추적하는 개인 개발 로그 서비스.

---

## 🎯 프로젝트 소개

**Logit**은 Next.js(App Router)와 Feature-Sliced Design(FSD) 아키텍처를 학습·실전 적용하기 위한 사이드 프로젝트입니다.  
일일 로그 작성과 GitHub 커밋 활동을 함께 보여주어, 개발자의 **작업량과 성장 곡선**을 직관적으로 확인할 수 있도록 돕습니다.

- **FSD 아키텍처 적용**: `app/`, `features/`, `entities/`, `shared/` 레이어 분리
- **Local-First 전략**: `localStorage` 기반 로그 저장 (추후 서버 연동 확장 예정)
- **GitHub 활동 시각화**: 커밋/이벤트/리포지토리 정보를 활용한 달력 및 대시보드
- **개발자 친화 UX**: 에디터, 주간/월간 뷰, 상태 뱃지 등

---

## 🛠 기술 스택

- **Framework**: Next.js `16.x` (App Router)
- **Language**: TypeScript
- **Architecture**: Feature-Sliced Design (FSD)
- **Styling**: Tailwind CSS v4, CSS
- **State / Storage**: Redux Toolkit, RTK Query, `localStorage`
- **HTTP / API**
  - GitHub REST API
  - `axios` 기반 공통 HTTP 클라이언트 (`shared/api/http.ts`)
  - RTK Query 기반 GitHub API 래퍼 (`shared/api/rtk/gitApi.ts`)
- **i18n**: `i18next`, `react-i18next`
- **테스트 / 품질**: ESLint, Vitest, Storybook

---

## 📂 주요 디렉토리 구조

- **`app/`**
  - `dashboard/`, `login/`, `setting/` 등 라우팅 엔트리
- **`features/`**
  - `dashboard/` – 대시보드, 주간/월간 기록, Git Calendar 등 UI & 로직
  - `login/` – 로그인 폼 UI
  - `setting/` – 설정 페이지, GitHub 사용자 설정
  - `global/` – 공통 헤더 등
- **`entities/`**
  - `git/` – Git, 커밋, 활동 관련 타입
  - `log/` – 로그 엔티티 타입
- **`shared/`**
  - `api/` – GitHub API 연동 (`apis/GitApi.ts`, `rtk/gitApi.ts`, `http.ts`)
  - `config/` – i18n, 테마
  - `providers/` – 전역 Store, I18n Provider
  - `store/` – Redux store 설정
  - `ui/` – 버튼, 카드 등 공용 컴포넌트

---

## 🚀 시작하기

### 1. 사전 요구 사항

- **Node.js**: 권장 LTS (예: 20.x 이상)
- **패키지 매니저**: `npm` 또는 `yarn`

### 2. 설치

```bash
# 프로젝트 루트로 이동
cd /Users/null_ong2/Documents/heath/programming/projects/Logit/fe

# 패키지 설치 (하나만 선택)
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정 (중요: Git PWA Token / GitHub Token)

프로젝트는 GitHub API 호출 시 **`NEXT_PUBLIC_GITHUB_TOKEN`** 환경 변수를 사용합니다.  
이 값이 없으면 GitHub API **요청이 제한(레이트 리미트)** 되거나, 일부 요청이 실패할 수 있습니다.

1. 프로젝트 루트에 `.env.local` 파일 생성  
2. 아래 예시처럼 GitHub Personal Access Token을 설정

```env
# Authorization 헤더로 그대로 사용되므로 "token " 접두사를 함께 넣어야 합니다.
NEXT_PUBLIC_GITHUB_TOKEN=token ghp_your_personal_access_token_here
```

> ⚠️ **주의**
> - 코드에서 `Authorization` 헤더에 **env 값을 그대로** 넣기 때문에  
>   반드시 `token ghp_...` 형태로 작성해야 합니다.
> - `NEXT_PUBLIC_` 접두사가 붙은 변수는 **브라우저로 노출**되므로,  
>   **권한을 최소화한 토큰**만 사용하고, 필요 시 언제든 폐기/재발급할 수 있는 토큰을 쓰는 것을 권장합니다.

#### Git PWA Token (GitHub Personal Access Token) 발급 방법

1. GitHub 로그인 후 우측 상단 프로필 → **Settings**  
2. 좌측 메뉴 하단 **Developer settings** 클릭  
3. **Personal access tokens** 메뉴 선택  
   - 간단히 테스트 용도라면 **“Tokens (classic)”**로 발급해도 무방  
4. **Generate new token** 클릭  
5. 토큰 이름 및 만료 기간 설정 (예: `logit-local-pwa-token`, 30일 등)  
6. 권한(Scopes) 선택 – 이 프로젝트에서는 **공개 정보 조회** 위주이므로:
   - `read:user`
   - `public_repo` (또는 필요한 최소 repo 권한)
7. 토큰 생성 후 한 번만 보이므로, 값을 복사해서 `.env.local`에 아래처럼 저장

```env
NEXT_PUBLIC_GITHUB_TOKEN=token ghp_...복사한_토큰_값...
```

8. `.env.local`은 **절대 Git에 커밋하지 않도록** `.gitignore`를 유지합니다.

---

## 📡 GitHub API 연동 개요

- **RTK Query 기반 API (`shared/api/rtk/gitApi.ts`)**
  - `baseUrl`: `https://api.github.com`
  - `prepareHeaders`에서 `process.env.NEXT_PUBLIC_GITHUB_TOKEN`을 읽어 `Authorization` 헤더 설정
  - 제공 엔드포인트:
    - `getGitUserInfo` – `/users/{username}`
    - `getUserEvents` – `/users/{username}/events/public`
    - `getUserRepos` – `/users/{username}/repos`
    - `getRepoCommits` – `/repos/{owner}/{repo}/commits`
- **Axios 기반 API (`shared/api/apis/GitApi.ts`)**
  - 공통 Http 클라이언트(`shared/api/http.ts`)를 상속
  - 동일하게 `Authorization: process.env.NEXT_PUBLIC_GITHUB_TOKEN` 헤더를 사용

---

## 📊 주요 기능 요약

- **Daily Mission Dashboard**
  - 오늘의 Log 작성 여부 (`RECORD` / `EMPTY`)
  - 오늘의 GitHub 커밋 활동 (`COMMIT` / `IDLE`)
  - 모든 미션 완료 시 `FREE_TO_GO` 상태
- **Today's Workspace**
  - 로그 작성 에디터 (제목, 본문, 태그)
  - `localStorage` 자동/수동 저장
- **Weekly / Monthly View**
  - 최근 7일 활동 요약 (Log + Git)
  - 월별 달력 + Git Calendar(heatmap) 기반 시각화

---

## 📦 스크립트

`package.json` 기준 주요 스크립트는 다음과 같습니다.

- **개발 서버 실행**

```bash
npm run dev
# 또는
yarn dev
```

- **프로덕션 빌드**

```bash
npm run build
npm start
# 또는
yarn build
yarn start
```

- **Lint**

```bash
npm run lint
# 또는
yarn lint
```

- **Storybook**

```bash
npm run storybook
npm run build-storybook
# 또는
yarn storybook
yarn build-storybook
```

---

## 🔐 보안 및 운영 팁

- **토큰 권한 최소화**: 공개 레포만 쓰는 용도라면 `public_repo` + `read:user` 정도로 제한  
- **만료 기간 설정**: 무기한 토큰 대신, 주기적으로 갱신할 수 있는 만료 기간 사용  
- **개인 계정 분리 권장**: 가능하다면 개발용 별도 GitHub 계정/토큰 사용  

