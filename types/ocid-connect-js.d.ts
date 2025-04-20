declare module '@opencampus/ocid-connect-js' {
    import { ReactNode } from 'react';
  
    export interface AuthState {
      isAuthenticated: boolean;
      isLoading: boolean;
      error: Error | null;
      OCId?: string;
      ethAddress?: string;
      idToken?: string;
    }
  
    export interface OCAuth {
      signInWithRedirect: (options: { state: string }) => Promise<void>;
      handleLoginRedirect: () => Promise<AuthState>;
      getAuthState: () => AuthState;
      // Add signOut if supported by the SDK
    }
  
    export interface OCConnectProps {
      opts: {
        redirectUri: string;
        referralCode: string;
      };
      sandboxMode: boolean;
      children: ReactNode;
    }
  
    export const OCConnect: React.FC<OCConnectProps>;
    export const LoginCallBack: React.FC<{
      successCallback: () => void;
      errorCallback: (error: Error) => void;
    }>;
    export function useOCAuth(): { ocAuth: OCAuth; authState: AuthState };
    export class OCAuthSandbox {
      signInWithRedirect: (options: { state: string }) => Promise<void>;
      handleLoginRedirect: () => Promise<AuthState>;
      getAuthState: () => AuthState;
    }
    export class OCAuthLive {
      signInWithRedirect: (options: { state: string }) => Promise<void>;
      handleLoginRedirect: () => Promise<AuthState>;
      getAuthState: () => AuthState;
    }
  }