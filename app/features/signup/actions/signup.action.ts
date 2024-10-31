import { useNotify } from '@/hooks';
import { useFetchWrapper } from '@/hooks/useFetchWrapper';
import { useCallback } from 'react';
// import { ProposalsAtom, VotesAtom } from '../state/governance.atom';
import { RegisterUserDto } from '@/interfaces';

export const useSignUpActions = () => {
  const fetchWrapper = useFetchWrapper();
  // const setProposals = useSetRecoilState(ProposalsAtom);
  // const setVotes = useSetRecoilState(VotesAtom);
  const { notify } = useNotify();

  const registerUser = useCallback(async (dto: RegisterUserDto) => {
    try {
      const response = await fetchWrapper.post('users/register/', dto);

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
