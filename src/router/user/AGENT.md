# User Data Loader 명세 (`src/router/user/`)

이 디렉토리는 애플리케이션의 사용자 인증 상태와 기초 학습 데이터를 로드하는 로직을 담당합니다.

## 1. 역할 분담
- `index.js`: 전체 흐름 제어 (Session 체크 -> 공통 데이터 로드 -> 분기 처리).
- `utils.js`: 상세 가공 로직 및 분기별 핸들러 (`handleMemberFlow`, `handleGuestFlow`).

## 2. 주요 로직
### 2.1 공통 로드
- `Word` 테이블에서 전체 단어 마스터 데이터를 가져와 `wordData` 객체를 생성합니다.
- 전역 공지사항 및 알림을 로드합니다.

### 2.2 Member Flow (로그인 유저)
1. 로컬 데이터 존재 시 Supabase로 마이그레이션 수행 (`migrateLocalDataToSupabase`).
2. 사용자 프로필(`User` 테이블) 조회.
3. 로컬 템플릿(`wordMap`) 로드 및 DB 학습 상태(`Voca` 테이블) 병합.
4. `processWordMap`을 통해 `progress`, `done` 상태 계산.

### 2.3 Guest Flow (미인증 유저)
1. 로컬스토리지의 `wordMap`과 `userData`를 직접 참조.
2. `createGuestStatusMap`을 통해 로컬 상태를 서버 규격과 동일한 `wordStatusMap`으로 변환.

## 3. 데이터 구조 (Output)
모든 흐름은 최종적으로 다음 구조의 객체를 반환해야 합니다.
```javascript
{
  nick: string,
  wordMap: Array<{
    id: number,      // 0-based sequential index
    category: string, // DB category name
    day: number,     // Original DB day number
    word: Array<number>, // Word IDs
    length: number,
    done: boolean,
    finishedCount: number,
    progress: number
  }>,
  wordStatusMap: { [wordId]: boolean },
  wordData: { [wordId]: WordObject },
  userData: Object,
  notifications: Array<NotificationObject>
}
```

## 4. 주의 사항
- `wordMaps`라는 명칭은 레거시이므로 절대 사용하지 않으며, 항상 **`wordMap`**을 사용합니다.
- 로직 수정 시 `utils.js`의 순수 함수를 먼저 수정하고 `index.js`는 최소한의 변경만 유지합니다.
