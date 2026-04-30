import styled from "styled-components";
import { Button } from "../../components/Button";
import { supabase } from "../../utils/supabase";
import { initAppData } from "../../utils/initAppData";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.font};
`;

const UserInfo = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.main};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.label};
`;

const Value = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.font};
`;

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 9999;
  color: white;
  font-weight: 600;
  font-size: 1rem;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $value }) => $value}%;
  background-color: white;
  transition: width 0.2s ease;
  border-radius: 4px;
`;

export const Settings = () => {
  const { nick, userData } = useOutletContext();
  const [resetting, setResetting] = useState(false);
  const [resetProgress, setResetProgress] = useState(0);

  const isGuest = !Object.keys(window.localStorage).some((k) =>
    k.includes("auth-token")
  );

  const handleLogout = async () => {
    const confirmed = window.confirm(
      isGuest
        ? "게스트 데이터를 삭제하고 나가시겠어요?\n저장된 모든 학습 기록이 사라집니다."
        : "로그아웃 하시겠어요?\n데이터는 서버에 안전하게 보관됩니다."
    );
    if (!confirmed) return;

    if (isGuest) {
      window.localStorage.clear();
    } else {
      await supabase.auth.signOut();
      window.localStorage.removeItem("nick");
    }
    window.location.href = "/";
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      "⚠️ 학습 데이터를 완전히 초기화할까요?\n\n진행률, 단어 배정이 모두 삭제되고\n새로운 단어 배정이 시작됩니다.\n\n이 작업은 되돌릴 수 없습니다."
    );
    if (!confirmed) return;

    const doubleConfirmed = window.confirm(
      "정말로 초기화하시겠어요? 마지막 확인입니다."
    );
    if (!doubleConfirmed) return;

    setResetting(true);
    setResetProgress(0);

    try {
      // 1. DB 유저라면 Supabase Voca 테이블 데이터 삭제
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        await supabase
          .from("Voca")
          .delete()
          .eq("user_id", session.user.id);
      }

      // 2. 로컬스토리지 학습 데이터 초기화
      window.localStorage.removeItem("wordMap");
      window.localStorage.removeItem("userData");

      // 3. 새로운 단어 배정
      await initAppData(undefined, 20, setResetProgress);

      // 4. DB 유저라면 새 데이터 재동기화
      if (session) {
        const newWordMap = JSON.parse(
          window.localStorage.getItem("wordMap") || "[]"
        );
        const vocaInserts = [];
        newWordMap.forEach((day) => {
          (day.word || []).forEach((wordId) => {
            vocaInserts.push({
              user_id: session.user.id,
              word_id: Number(wordId),
              day_number: Number(day.id),
              status: false,
            });
          });
        });
        if (vocaInserts.length > 0) {
          await supabase.from("Voca").upsert(vocaInserts);
        }
      }

      setResetProgress(100);
      window.location.href = "/";
    } catch (err) {
      console.error("초기화 실패:", err);
      alert("초기화 중 오류가 발생했습니다. 다시 시도해주세요.");
      setResetting(false);
    }
  };

  return (
    <>
      {resetting && (
        <LoadingOverlay>
          <span>학습 데이터 초기화 중...</span>
          <ProgressBar>
            <ProgressFill $value={resetProgress} />
          </ProgressBar>
          <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>{resetProgress}%</span>
        </LoadingOverlay>
      )}
      <Wrapper>
        <Section>
          <SectionTitle>계정 설정</SectionTitle>
          <UserInfo>
            <Label>닉네임</Label>
            <Value>{nick || "Guest"}</Value>
            <Label>상태</Label>
            <Value>{isGuest ? "게스트 모드" : "로그인 완료"}</Value>
            {userData?.startedTime && (
              <>
                <Label>학습 시작일</Label>
                <Value>
                  {new Date(userData.startedTime).toLocaleDateString("ko-KR")}
                </Value>
              </>
            )}
          </UserInfo>
        </Section>

        <Section>
          <SectionTitle>데이터 관리</SectionTitle>
          <Button
            label="학습 데이터 초기화"
            color="font"
            bg="main"
            onClick={handleReset}
          />
        </Section>

        <Section style={{ marginTop: "auto" }}>
          <Button
            label={isGuest ? "데이터 삭제 및 나가기" : "로그아웃"}
            color="main"
            bg="brand"
            onClick={handleLogout}
          />
        </Section>
      </Wrapper>
    </>
  );
};
