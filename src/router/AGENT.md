# Router & Loader Service Guide

Router 서비스는 앱의 경로 정의와 각 경로 진입 시 필요한 데이터 사전 로드(Data Pre-fetching)를 담당합니다.

## 1. 역할 및 특징
- **경로 관리**: React Router Dom을 이용한 브라우저 경로 및 컴포넌트 매핑.
- **데이터 공급**: 페이지 렌더링 전 `loader` 함수를 통해 필요한 데이터(세션, 사용자 정보, 학습 세트)를 준비.

## 2. 주요 구성 요소
- **router.jsx**: 전체 앱 경로 정의 (`/`, `/play`, `/voca`, `/settings`, `/onboard` 등).
- **loadUserData.js**: 가장 핵심적인 로더. 앱 진입 시 세션 체크, 프로필 로드, 학습 데이터 마이그레이션을 총괄함.
- **loadPlay.js**: 특정 Day 학습 시 해당 Day의 단어들을 단어 마스터 데이터에서 추출하여 구성.
- **loadMetaData.js**: 전체 단어 개수 등 기초 메타데이터 로드.

## 3. 종속성 및 연관 관계
- **migration.js (`migrateLocalDataToSupabase`)**: 로그인 성공 직후 로컬 데이터를 서버로 옮기기 위해 `loadUserData.js`에서 의존.
- **api.js (`fetchMetaData`)**: `loadMetaData.js`에서 호출.
- **utils.js (`loadLocalStorage`)**: 로컬 상태 로드를 위해 모든 로더에서 의존.

## 4. 데이터 로드 흐름
브라우저 진입 -> `router.jsx` 경로 매칭 -> 해당 `loader` 실행 -> (필요시) Supabase/LocalStorage 조회 -> 결과 반환 -> `useLoaderData`를 통해 컴포넌트 전달
