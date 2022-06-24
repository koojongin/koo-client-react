import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { LAYOUT_MAX_WIDTH, LAYOUT_MIN_WIDTH } from './variables';
import GlobalStyle from './GlobalStyle';

library.add(fas, faTwitter, faFontAwesome);
const StyledNavBar = styled.div`
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background: rgba(255, 255, 255, 0.11);
    margin-right: 5px;
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.41);
    }
  }
`;

function NavBar({ onNav = true }: { onNav?: boolean }) {
  const navs = [
    { path: '/battle', name: '사냥' },
    { path: '/lucky-draw', name: '뽑기' },
    { path: '/rank', name: '랭킹' },
    {
      name: '로그아웃',
      action: () => {
        window.localStorage.setItem('token', '');
        window.location.href = '/';
      },
    },
  ];
  return (
    <StyledNavBar
      style={{
        background: '#007bff',
        display: onNav ? 'inherit' : 'none',
      }}
    >
      <div
        style={{
          color: 'white',
          margin: 'auto',
          minWidth: `${LAYOUT_MIN_WIDTH}px`,
          maxWidth: `${LAYOUT_MAX_WIDTH}px`,
          display: 'flex',
        }}
      >
        {navs.map((link, index) => {
          if (link.path) {
            return (
              <Link href={link.path} key={`nav-link-${index + 0}`}>
                <div className="nav-item">{link.name}</div>
              </Link>
            );
          }
          return (
            <div
              className="nav-item"
              tabIndex={0}
              role="button"
              key={`nav-link-${index + 0}`}
              onClick={link.action}
            >
              {link.name}
            </div>
          );
        })}
      </div>
    </StyledNavBar>
  );
}

export default function GlobalSetting({ children }: { children: any }) {
  const [onNav, setOnNav] = useState(false);
  const getSearchParams = () => {
    const params = window.location.search.substr(1).split('&');
    return params
      .map(param => {
        const [key, value] = param.split('=');
        return { [key]: value };
      })
      .reduce((current, next) => {
        return Object.assign(current, next);
      });
  };
  useEffect(() => {
    if (window.location.pathname !== '/') setOnNav(true);

    const params = getSearchParams();
    if (params?.token) {
      window.localStorage.setItem('token', params.token);
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
      window.location.href = '/';
    }
  }, []);
  return (
    <>
      <Head>
        <meta property="og:title" content="KOO ONLINE" />
        <meta property="og:description" content="그냥 취미로 만드는 웹 게임" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/747691288890966057/752764267580620881/discord.png"
        />

        <title>KOO ONLINE</title>
      </Head>
      <Script src="https://kit.fontawesome.com/480ca21863.js" />
      <Helmet>
        <style>@import url(http://jiku90.com/fonts/font.css);</style>
      </Helmet>
      <ToastContainer
        className="black-background"
        bodyClassName="grow-font-size"
        progressClassName="fancy-progress-bar"
      />
      <GlobalStyle />
      <NavBar onNav={onNav} />
      {children}
    </>
  );
}
