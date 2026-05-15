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

## 4. 데이터 로드 및 병합 로직 (Robust Data Loading)
`loadUserData.js`는 사용자 데이터의 무결성을 위해 다음 과정을 거칩니다.

### 4.1 로그인 유저 (Member)
1. **템플릿 확보**: 로컬스토리지의 `wordMap`을 기반 구조(Template)로 사용합니다. 로컬 데이터가 없을 경우 `initWordMap`을 호출하여 DB(`Word` 테이블)로부터 전체 구조를 재구성합니다.
2. **상태 병합**: Supabase의 `Voca` 테이블에서 사용자의 학습 상태(`status`)를 가져옵니다.
3. **무결성 검사**: 확보된 템플릿 구조에 서버의 학습 상태를 매핑하여 `processedWordMap`을 생성합니다. 이 과정에서 특정 Day의 데이터가 DB에 없더라도 템플릿 구조를 유지하여 UI 상의 Gaps(데이터 누락)을 방지합니다.

### 4.2 미인증 유저 (Guest)
1. 로컬스토리지의 `wordMap`과 `userData`를 직접 참조합니다.
2. 각 Day의 `finishedCount`와 `progress`를 계산하여 일관된 데이터 객체를 반환합니다.

## 5. 데이터 마이그레이션 (`migration.js`)
- 로컬스토리지를 보존하며 `Voca` 테이블로 데이터를 Upsert 합니다.
- DB의 `day_number`는 1-based index(1, 2, 3...)를 사용하여 `Word` 테이블의 `day` 컬럼과 일관성을 유지합니다.
