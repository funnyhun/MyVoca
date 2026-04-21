import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { supabase } from "../../utils/supabase";

const Wrapper = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
`;

export const Settings = () => {
  const navigate = useNavigate();
  const nick = window.localStorage.getItem("nick") || "Guest";
  const isGuest = !window.localStorage.getItem("sb-pwyvrtqdtlystfivovqf-auth-token");

  const handleLogout = async () => {
    if (isGuest) {
      window.localStorage.clear();
      window.location.href = "/";
    } else {
      await supabase.auth.signOut();
      window.localStorage.removeItem("nick");
      window.location.href = "/";
    }
  };

  const handleReset = () => {
    if (window.confirm("모든 학습 데이터를 초기화할까요?")) {
      // Logic for reset could go here
      alert("초기화 기능은 준비 중입니다.");
    }
  };

  return (
    <Wrapper>
      <Section>
        <SectionTitle>계정 설정</SectionTitle>
        <UserInfo>
          <Label>닉네임</Label>
          <Value>{nick}</Value>
          <Label>상태</Label>
          <Value>{isGuest ? "게스트 모드" : "로그인 완료"}</Value>
        </UserInfo>
      </Section>

      <Section>
        <SectionTitle>데이터 관리</SectionTitle>
        <Button label="학습 데이터 초기화" color="font" bg="main" onClick={handleReset} />
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
  );
};
