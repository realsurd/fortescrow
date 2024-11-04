import { useNotify } from '@/hooks';
import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { RegisterUserDto } from '@/interfaces';

export const useSignUpActions = () => {
  const fetchWrapper = useFetchWrapper();
  const { notify } = useNotify();

  const registerUser = useCallback(async (dto: RegisterUserDto) => {
    try {
      const response = await fetchWrapper.post('auth/signup', dto);

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  return {
    registerUser,
  };
};
