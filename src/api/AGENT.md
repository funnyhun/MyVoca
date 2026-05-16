# API Layer Agent Rules (src/api)

이 폴더는 데이터 소스(Supabase, LocalStorage)에 대한 모든 접근을 관리하며, Guest/User/Common 영역으로 책임을 분리하여 관리합니다.

## 설계 원칙
1. **계층형 책임 분리**:
    - **Root (`src/api/*.js`)**: UI에서 호출하는 통합 진입점 (Facade). 실제 구현은 하위 디렉토리로 위임합니다.
    - **`common/`**: 로그인 여부와 관계없이 공유되는 로직 (데이터 초기화, 공통 유틸리티).
    - **`guest/`**: LocalStorage 기반의 미인증 사용자 전용 로직.
    - **`user/`**: Supabase DB 기반의 인증 사용자 전용 로직.
    - **`auth/`**: 인증 세션 및 로그인/로그아웃 액션 관리.
2. **단일 책임**: 하나의 API 함수는 하나의 목적에 집중합니다.
3. **인프라 중앙화**: 모든 DB 접근은 `supabase.js` 설정을 따릅니다.
4. **JSDoc 필수**: 모든 함수에는 매개변수와 반환값의 타입을 명시합니다.

## 폴더 구조 및 역할
- **`common/`**: Supabase 클라이언트 설정(`supabase.js`), 앱 공통 초기 데이터 설정(`voca.js` 등).
- **`guest/`**: 게스트 스토리지 관리(`storage.js`), 게스트 학습 상태(`voca.js`), 게스트 통계(`stats.js`).
- **`user/`**: 마스터 데이터(`master.js`), 프로필(`profile.js`), 유저 학습 기록(`voca.js`), 데이터 이전(`migration.js`).
- **`voca.js` (Root)**: 통합 단어 서비스 Facade.
- **`stats.js` (Root)**: 통합 학습 통계 서비스 Facade.

## 코딩 표준
- 모든 비동기 함수는 `try-catch` 블록을 포함합니다.
- Supabase 응답에서 `data`와 `error`를 분리하여 처리하고 명확히 로깅합니다.
- UI 컴포넌트는 가급적 Root Facade API를 사용하여 내부의 복잡한 분기 로직으로부터 격리됩니다.
