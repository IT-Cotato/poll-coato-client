import { useMutation } from '@tanstack/react-query';
import { API_PATH, QUERY_KEY } from '@/route/path';
import { PATH } from '@/route/path';
import { useNavigate } from 'react-router-dom';

export interface LoginResponse {
  userId: number;
  role: 'Admin' | 'User';
  email: string;
  name: string;
  teamId: number | null;
}

async function login(email: string): Promise<LoginResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(baseUrl + API_PATH.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('로그인 실패');
  return response.json();
}

export function useLogin() {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, string>({
    mutationKey: [QUERY_KEY.LOGIN],
    mutationFn: (email) => login(email),
    onSuccess: ({ userId, role, teamId }: LoginResponse) => {
      localStorage.setItem('userId', String(userId));
      localStorage.setItem('teamId', String(teamId));
      localStorage.setItem('role', role);
      navigate(PATH.HOME);
    },
  });
}
