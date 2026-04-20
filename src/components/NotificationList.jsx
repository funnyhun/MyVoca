import styled from "styled-components";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  position: fixed;
  top: 3.5rem;
  right: 1rem;
  width: 18rem;
  max-height: 25rem;
  background-color: ${({ theme }) => theme.main};
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.week};
  font-weight: 700;
  font-size: 1rem;
`;

const List = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const NotiItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.week};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.week};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotiTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.font};
`;

const NotiContent = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.label};
  line-height: 1.4;
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.label};
  font-size: 0.9rem;
`;

import { signInWithKakao, signOut } from "../utils/auth";

export const NotificationList = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      
      const mockNotis = [
        {
          id: 1,
          title: "반가워요! MyVoca 시작하기",
          content: "오늘의 단어 학습을 시작하고 뱃지를 획득하세요.",
        }
      ];

      if (!session) {
        mockNotis.unshift({
          id: 0,
          title: "데이터 동기화 권장",
          content: "로그인하여 단어장 데이터를 안전하게 보호하고 기기 간 동기화를 시작하세요.",
          type: "sync"
        });
      } else {
        mockNotis.unshift({
          id: 2,
          title: "동기화 완료",
          content: "현재 카카오 계정으로 실시간 데이터 동기화가 활성화되어 있습니다.",
          type: "status"
        });
      }

      setNotifications(mockNotis);
    };

    checkSession();
  }, []);

  const handleNotiClick = (noti) => {
    if (noti.type === "sync") {
      signInWithKakao();
    }
    onClose();
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
    window.location.reload(); // 로그아웃 후 상태 초기화를 위해 새로고침
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <Container>
        <Header>알림</Header>
        <List>
          {notifications.length > 0 ? (
            notifications.map((noti) => (
              <NotiItem key={noti.id} onClick={() => handleNotiClick(noti)}>
                <NotiTitle>{noti.title}</NotiTitle>
                <NotiContent>{noti.content}</NotiContent>
              </NotiItem>
            ))
          ) : (
            <EmptyMessage>새로운 알림이 없습니다.</EmptyMessage>
          )}
        </List>
        {isLoggedIn && (
          <LogoutArea>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </LogoutArea>
        )}
      </Container>
    </>
  );
};

const LogoutArea = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.week};
  display: flex;
  justify-content: center;
`;

const LogoutBtn = styled.button`
  width: 100%;
  padding: 0.7rem;
  background-color: ${({ theme }) => theme.week};
  color: ${({ theme }) => theme.label};
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;


