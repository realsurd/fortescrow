import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
import { GetOtpUserDto, LoginUserDto, VerfyOtpUserDto } from '@/interfaces';

export const useVerifyActions = () => {
  const fetchWrapper = useFetchWrapper();

  const getUserOTP = useCallback(async (dto: GetOtpUserDto) => {
    try {
      const response = await fetchWrapper.post(
        'users/users/request-new-otp',
        dto,
      );

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  const VerfiyUserOTP = useCallback(async (otp: number) => {
    try {
      const response = await fetchWrapper.post('users/users/verify-email', {
        otp,
      });

      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }, []);

  return {
    getUserOTP,
    VerfiyUserOTP,
  };
};
