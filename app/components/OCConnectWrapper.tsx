'use client';

import { OCConnect, OCConnectProps } from '@opencampus/ocid-connect-js';
import { FC, ReactNode } from 'react';

interface OCConnectWrapperProps {
  children: ReactNode;
  opts: OCConnectProps['opts'];
  sandboxMode: boolean;
}

const OCConnectWrapper: FC<OCConnectWrapperProps> = ({ children, opts, sandboxMode }) => {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
};

export default OCConnectWrapper;