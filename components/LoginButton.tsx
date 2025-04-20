'use client';

import { useOCAuth } from '@opencampus/ocid-connect-js';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { BookOpen } from 'lucide-react';

const LoginButton: FC = () => {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      size="sm"
      className="gap-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 shadow-md hover:shadow-lg transition-all duration-200"
      aria-label="Connect with Open Campus ID"
    >
      <BookOpen className="h-4 w-4" />
      Connect with OCID
    </Button>
  );
};

export default LoginButton;