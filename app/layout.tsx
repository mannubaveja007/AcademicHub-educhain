import type { Metadata } from 'next';
import './globals.css';
import OCConnectWrapper from '@/components/OCConnectWrapper';

export const metadata: Metadata = {
  title: 'Academic Hub',
  description: 'A platform for sharing academic research and earning rewards',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opts = {
    redirectUri: process.env.NEXT_PUBLIC_OCID_REDIRECT_URI || 'http://localhost:3000/redirect',
    referralCode: process.env.NEXT_PUBLIC_OCID_REFERRAL_CODE || 'TEST123',
  };

  return (
    <html lang="en">
      <body>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
      </body>
    </html>
  );
}