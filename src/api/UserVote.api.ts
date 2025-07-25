import { useMutation } from '@tanstack/react-query';
import api from './Instance';
import { API_PATH, QUERY_KEY } from '@/route/path';

export interface UserVoteResponse {
  voteId: number;
  voteOptionId: number;
}

async function userVote(
  voteId: number,
  voteOptionId: number,
): Promise<UserVoteResponse> {
  const response = await api.post<UserVoteResponse>(API_PATH.USER_VOTE, {
    voteId,
    voteOptionId,
  });
  return response.data;
}

export function useUserVote() {
  return useMutation<
    UserVoteResponse,
    Error,
    { voteId: number; voteOptionId: number }
  >({
    mutationKey: [QUERY_KEY.USER_VOTE],
    mutationFn: ({ voteId, voteOptionId }) => userVote(voteId, voteOptionId),
    onSuccess: ({ voteId, voteOptionId }: UserVoteResponse) => {
      localStorage.setItem('voteId', String(voteId));
      localStorage.setItem('voteOptionId', String(voteOptionId));
    },
  });
}
