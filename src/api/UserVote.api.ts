// import { useMutation, useQuery } from '@tanstack/react-query';
// import api from './Instance';
// import { API_PATH, QUERY_KEY } from '@/route/path';

// export interface UserVoteResponse {
//   voteId: number;
//   voteOptionId: number;
// }

// export interface PollItem {
//   itemId: number;
//   title: string;
//   description: string;
//   maxScore: number;
//   displayOrder: number;
// }

// async function userVote(
//   pollItemId: number,
//   userId: number,
//   score: number,
// ): Promise<UserVoteResponse> {
//   const response = await api.post<UserVoteResponse>(API_PATH.USER_VOTE, {
//     pollItemId,
//     userId,
//     score,
//   });
//   return response.data;
// }

// export function useUserVote() {
//   return useMutation<
//     UserVoteResponse,
//     Error,
//     { pollItemId: number; userId: number; score: number }
//   >({
//     mutationKey: [QUERY_KEY.USER_VOTE],
//     mutationFn: ({ pollItemId, userId, score }) =>
//       userVote(pollItemId, userId, score),
//   });
// }

// async function getPollItems(pollId: number) {
//   const response = await api.get<PollItem[]>(API_PATH.POLL_ITEMS, {
//     params: { pollId },
//   });
//   return response.data;
// }

// export function useGetPollItems() {
//   return useQuery<PollItem[], Error>({
//     queryKey: [QUERY_KEY.POLL_ITEMS],
//     queryFn: () => getPollItems(pollId),
//   });
// }
