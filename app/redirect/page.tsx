'use client';

import { LoginCallBack } from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const RedirectPage: FC = () => {
  const router = useRouter();

  const loginSuccess = () => {
    router.push('/');
  };
  const loginError = (error: Error) => {
    console.error('Login error:', error);
    router.push('/?error=login_failed');
  };

  return <LoginCallBack successCallback={loginSuccess} errorCallback={loginError} />;
};

export default RedirectPage;