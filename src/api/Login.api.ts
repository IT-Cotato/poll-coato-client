import { useMutation } from '@tanstack/react-query';
import { API_PATH, QUERY_KEY } from '@/route/path';
import api from './Instance';

export interface LoginResponse {
  userId: number;
  role: 'ADMIN' | 'MEMBER';
  email: string;
  name: string;
  teamId: number | null;
}

async function login(email: string): Promise<LoginResponse> {
  const response = await api.get<LoginResponse>(API_PATH.LOGIN, {
    params: { email, pollId: 1 },
  });
  return response.data;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, string>({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: (email) => login(email),
    onSuccess: ({ userId, role, teamId }: LoginResponse) => {
      localStorage.setItem('userId', String(userId));
      localStorage.setItem('teamId', String(teamId));
      localStorage.setItem('role', role);
    },
  });
}
