import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BorderBox } from "../../components/StyledBox";
import { QuizIcon, PlayIcon } from "../../assets/iconList";

const DashboardWrapper = styled(BorderBox)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: ${({ theme }) => theme.main};
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.font};
`;

const LevelBadge = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  background-color: ${({ theme }) => theme.week};
  color: ${({ theme }) => theme.brand};
  border-radius: 1rem;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.label};
  font-weight: 600;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 12px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.brand}, ${({ theme }) => theme.week_success});
  border-radius: 10px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StreakBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: ${({ theme }) => theme.week};
  color: ${({ theme }) => theme.brand};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 700;
  font-size: 0.95rem;
  align-self: flex-start;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  width: 100%;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.brand};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const StatsDashboard = ({ userData, wordMap }) => {
  const navigate = useNavigate();
  const currentDayIndex = userData?.selected ?? 0;

  const totalWords = wordMap.reduce((acc, curr) => acc + curr.length, 0);
  const learnedWords = userData.learned || 0;
  const progressPercent = totalWords > 0 ? Math.round((learnedWords / totalWords) * 100) : 0;

  const levelLabels = {
    "default": "초급 (Default)",
    "800": "중급 (800)",
    "900": "고급 (900)"
  };
  const currentLevelLabel = levelLabels[userData?.level] || "알 수 없음";

  return (
    <DashboardWrapper>
      <HeaderContainer>
        <Title>학습 대시보드</Title>
        <LevelBadge>{currentLevelLabel}</LevelBadge>
      </HeaderContainer>
      
      <ProgressContainer>
        <ProgressLabel>
          <span>전체 마스터 진행률</span>
          <span>{progressPercent}%</span>
        </ProgressLabel>
        <ProgressBarBackground>
          <ProgressBarFill $progress={progressPercent} />
        </ProgressBarBackground>
        <ProgressLabel style={{ fontSize: '0.8rem', color: '#aaaaaa' }}>
          <span>{learnedWords} 단어 완료</span>
          <span>{totalWords} 단어</span>
        </ProgressLabel>
      </ProgressContainer>

      <StreakBadge>
        🔥 {userData.continued}일 연속 학습 중!
      </StreakBadge>

      <ActionContainer>
        <ActionButton onClick={() => navigate(`/play/${currentDayIndex}/card/0`)}>
          <PlayIcon />
          <span>암기하기</span>
        </ActionButton>
        <ActionButton onClick={() => navigate(`/play/${currentDayIndex}/quiz/0`)}>
          <QuizIcon />
          <span>퀴즈풀기</span>
        </ActionButton>
      </ActionContainer>
    </DashboardWrapper>
  );
};
