import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { LoginUserDto } from '@/interfaces';

export const useLoginActions = () => {
  const fetchWrapper = useFetchWrapper();

  const signInUser = useCallback(async (dto: LoginUserDto) => {
    try {
      const response = await fetchWrapper.post('users/users/signin', dto);

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  return {
    signInUser,
  };
};
