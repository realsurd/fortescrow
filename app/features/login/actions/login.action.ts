import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { LoginUserDto, Token } from '@/interfaces';
import { useRouter } from 'next/router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authAtom } from '../state/authAtom';

export const useLoginActions = () => {
  const [, setAuth] = useRecoilState<Token | null>(authAtom);
  // const setAdmin = useSetRecoilState(adminAtom);

  const fetchWrapper = useFetchWrapper();
  const { push } = useRouter();

  const signInUser = useCallback(async (dto: LoginUserDto) => {
    try {
      const response = await fetchWrapper.post('auth/login', dto);

      if (response?.error) {
        throw new Error(response.error);
      }

      if (!response?.access_token) {
        throw new Error('No access token present in response object');
      }

      const token: Token = {
        accessToken: response.access_token,
        expiresIn: response.expiresIn || 86400,
      };

      setAuth(token);
      const now = new Date().getTime().toString();

      localStorage.setItem('auth', JSON.stringify(token));
      localStorage.setItem('lastLoggedIn', now);
      localStorage.setItem('emailId', dto?.username);

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const logout = useCallback(async () => {
    await localStorage.removeItem('auth');
    await localStorage.removeItem('lastLoggedIn');
    await localStorage.removeItem('emailId');
    push('/login');
  }, []);

  return {
    signInUser,
    logout,
  };
};
