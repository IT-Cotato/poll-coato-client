import { useMutation } from '@tanstack/react-query';
import { API_PATH, QUERY_KEY } from '@/route/path';

export interface voteControlResponse {
  status: string;
}

async function voteControl(status: string): Promise<voteControlResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url =
    baseUrl +
    API_PATH.ADMIN_CONTROL.replace(':workspaceId', '1').replace(':pollId', '1');
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('투표 제어 실패');
  return response.json();
}

export function useVoteControl() {
  return useMutation<voteControlResponse, Error, { status: string }>({
    mutationKey: [QUERY_KEY.ADMIN_CONTROL],
    mutationFn: ({ status }) => voteControl(status),
  });
}
