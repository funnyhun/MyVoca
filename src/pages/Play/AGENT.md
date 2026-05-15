# Play Service Guide

Play 서비스는 앱의 핵심 학습 로직을 담당하며, 카드 암기와 퀴즈 풀기 두 가지 모드를 제공합니다.

## 1. 역할 및 특징
- **학습 인터페이스**: 단어 카드 플립 및 4지선다/입력형 퀴즈 UI 제공.
- **상태 동기화**: 학습 완료 시 즉시 DB/LocalStorage에 반영.

## 2. 주요 구성 요소
- **Play.jsx**: 부모 컴포넌트. `Card`와 `Quiz` 모드를 전환하며 전체 진행도를 관리함.
- **Card (Directory)**: 단어 카드 암기 모드. `useCard` 훅을 통해 플립 및 완료 로직 처리.
- **Quiz (Directory)**: 퀴즈 모드. 오답 체크 및 결과 피드백 처리.
- **util.js**: 학습에 필요한 보조 계산 로직.
- **PlayProgressBar.jsx**: 상단 진행률 표시 바.

## 3. 종속성 및 연관 관계
- **voca.js (`updateWordStatus`)**: 단어 학습 완료 처리의 핵심 의존성.
- **utils.js (`shuffleArray`, `updateLearningStats`)**: 퀴즈 셔플링 및 세션 완료 통계 업데이트에 사용.
- **useWord Hook**: 현재 학습할 Day의 단어 목록을 가져오기 위해 필수적으로 사용됨.

## 4. 데이터 흐름
`useWord` -> 단어 목록 로드 -> `Play.jsx` (셔플링) -> `Card`/`Quiz` 제공 -> 완료 시 `updateWordStatus` 호출
