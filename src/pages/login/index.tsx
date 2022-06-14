import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  > div {
    cursor: pointer;
    border: solid 1px #007bff;
    color: #007bff;
    display: flex;
    font-weight: bold;
    height: 50px;
    max-height: 50px;
    align-items: center;
    justify-content: center;
    img {
      height: 100% !important;
    }
    > div {
      padding: 15px;
    }
  }
`;
export default function LoginPage() {
  const login = () => {
    const url =
      'https://discord.com/api/oauth2/authorize?client_id=741980844071190559&redirect_uri=http%3A%2F%2Fjiku90.com%2Foauth3&response_type=code&scope=email';
    window.location.href = url;
  };
  return (
    <StyledButton>
      <div role="button" onClick={login} onKeyPress={login} tabIndex={0}>
        <Image
          alt="discord icon"
          width="50"
          height="50"
          src="/resources/discord.png"
        />
        <div>디스코드로 로그인하기2</div>
      </div>
    </StyledButton>
  );
}
