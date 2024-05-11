export interface CreateProposalDto {
  app_id: string;
  name: string;
  description: string;
  is_claimable: boolean;
  end_time: string | number;
  wallet_address: string;
}

export interface CreateVoteDto {
  wallet_address: string;
  vote_value: boolean;
  proposal: number;
}

export interface VerifyVoteDto {
  wallet_address: string;
  proposal: number;
}

export interface IVote {
  id: number;
  created_on: string;
  updated_on: string;
  wallet_address: string;
  vote_value: boolean;
  proposal: number;
}

export interface IProposal {
  id: number;
  created_on: string;
  updated_on: string;
  tag_id: string;
  app_id: string;
  name: string;
  description: string;
  is_open: boolean;
  is_active: boolean;
  is_claimed: boolean;
  is_claimable: boolean;
  end_time: string;
  yes_count: number;
  no_count: number;
  wallet_address: string;
}
