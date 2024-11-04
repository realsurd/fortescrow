import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';

export const useDashboardActions = () => {
  const fetchWrapper = useFetchWrapper();

  const getUsers = useCallback(async () => {
    try {
      const response = await fetchWrapper.get('users');

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  return {
    getUsers,
  };
};
