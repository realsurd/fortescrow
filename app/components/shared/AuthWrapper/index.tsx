import { ReactNode, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLoginActions } from '@/features/login/actions/login.action';
import { Token } from '@/interfaces';
import { authAtom } from '@/features/login/state/authAtom';
import { LoadingScreen } from '../LoadingScreen';

interface AuthWrapperProps {
  children: ReactNode;
}

/**
 * @description This wrapper serves as an authentication check that only
 * displays its content if the user is logged in, if not, it redirects the user to the login page.
 * @param children The content to be displayed if the user is logged in.
 * @returns React element.
 */
export const AuthWrapper = (prop: AuthWrapperProps) => {
  const { children } = prop;
  const { logout } = useLoginActions();
  const [loading, setLoading] = useState(true);
  const setAuth = useSetRecoilState(authAtom);

  const checkLogin = async () => {
    setLoading(true);
    const authFromStorageText = localStorage.getItem('auth');

    const lastLoggedIn = localStorage.getItem('lastLoggedIn');

    if (
      !lastLoggedIn ||
      !authFromStorageText ||
      isNaN(parseFloat(lastLoggedIn))
    ) {
      await logout();
      return;
    } else {
      const authFromStorage: Token = JSON.parse(authFromStorageText);

      if (!authFromStorage?.accessToken || !authFromStorage?.expiresIn) {
        await logout();
        return;
      }

      setAuth(authFromStorage);

      const now = parseFloat(new Date().getTime().toString());
      const then = parseFloat(lastLoggedIn);

      const differenceInSeconds = (now - then) / 1000;

      if (differenceInSeconds >= authFromStorage.expiresIn) {
        await logout();
        return;
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <>{loading ? <LoadingScreen /> : children}</>;
};
