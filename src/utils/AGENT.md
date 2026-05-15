# Utils Directory Guide

본 디렉토리는 MyVoca 앱에서 공통으로 사용되는 데이터 처리, 인증, 외부 API 연동 로직을 포함합니다.

## 1. 역할 및 특징
- **인프라스트럭처**: Supabase 클라이언트 설정 및 OAuth 인증 처리.
- **데이터 영속성**: 로컬 스토리지와 원격 DB 간의 동기화 및 마이그레이션.
- **공통 연산**: 날짜 계산, 배열 셔플링 등 순수 함수 제공.

## 2. 주요 모듈 및 종속성
- **supabase.js**: 최하위 모듈. 모든 DB 통신 파일(`api.js`, `voca.js`, `migration.js`, `auth.js`)에서 의존함.
- **utils.js**: 로컬 스토리지 제어 및 범용 유틸리티. `voca.js`, `migration.js` 및 여러 Hook/Loader에서 의존함.
- **voca.js**: 학습 상태 업데이트 핵심 로직. `src/pages/Play`와 `src/pages/Voca`에서 집중적으로 사용됨.

## 3. 수정 시 주의사항
- **역추적 필독**: 유틸리티 함수(특히 `loadLocalStorage`, `updateWordStatus`)는 프로젝트 전반에 걸쳐 사용되므로, 수정 전 반드시 해당 함수의 JSDoc 내 `[Used In]` 섹션을 확인하십시오.
- **상태 동기화**: `voca.js`와 `migration.js`는 로그인/비로그인 상태를 모두 처리하므로, 로직 변경 시 두 케이스를 모두 테스트해야 합니다.
