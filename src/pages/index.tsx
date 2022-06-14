import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoginPage from './login';
import GlobalSetting from '../config/GlobalStyle';

export default function Index() {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    const params = getSearchParams();
    if (params.token) {
      window.localStorage.setItem('token', params.token);
      setToken(params.token);
      const url = new URL(window.location.href);
      url.searchParams.delete('token');
    }

    setToken(window.localStorage.getItem('token') || '');
    const isLoggedIn = !!token;
    if (isLoggedIn) router.push('/battle');
  }, [token, router]);

  return (
    <>
      <GlobalSetting />
      <LoginPage />
    </>
  );
}
