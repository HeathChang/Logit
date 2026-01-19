# Blogit

> **Daily Work Log + Git Activity Tracker**  
> 오늘 내가 무엇을 했는지 기록하고, Git 커밋 여부를 함께 확인하는 개인 작업 로그 서비스

---

## 📌 프로젝트 목적

Blogit은 **Next.js App Router + Feature-Sliced Design(FSD)** 구조를 익히기 위한 학습용 프로젝트입니다.

- 단순한 CRUD가 아닌 **구조 중심 설계**
- localStorage 기반 구현 → **Server Action으로 확장 가능한 구조**
- Entity / Feature / Widget / Page 역할 분리 연습
- 외부 시스템(GitHub) 연동을 고려한 설계

---

## 🛠 기술 스택

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Architecture**: Feature-Sliced Design (FSD)
- **State / Storage**: localStorage (1차 구현)
- **Styling**: (추후 결정)
- **API 연동 (예정)**: GitHub API

---

## ✨ 핵심 기능 (MVP)

### 1️⃣ 작업 로그 관리
- 오늘의 작업 로그 작성
- 날짜 기준 로그 리스트
- 로그 상세 페이지
- 간단한 태그 구조

### 2️⃣ Git 커밋 연동
- 오늘 Git 커밋 여부 표시
- 날짜별 커밋 수 확인
- 로그 + Git 활동 상태를 함께 시각화

---

## 🗂 예상 프로젝트 구조 (FSD)

