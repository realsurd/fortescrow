import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';

export const useKYCActions = () => {
  const fetchWrapper = useFetchWrapper();


  const getBanks = useCallback(async () => {
    try {
      const response = await fetchWrapper.get(
        'core/banks/'
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const getBank = useCallback(async (id: number) => {
    try {
      const response = await fetchWrapper.get(
        `core/banks/${id}/`,
        {id},
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const getCountries = useCallback(async () => {
    try {
      const response = await fetchWrapper.get(
        'core/countries/'
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);
  const getCountry = useCallback(async (id: number) => {
    try {
      const response = await fetchWrapper.get(
        `core/countries/${id}/`,
        {id},
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const getStates = useCallback(async () => {
    try {
      const response = await fetchWrapper.get(
        'core/states/'
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const getState = useCallback(async (id: number) => {
    try {
      const response = await fetchWrapper.get(
        `core/states/${id}/`,
        {id},
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  return {
    getBanks,
    getBank,
    getCountries,
    getCountry,
    getStates,
    getState,
  };
};