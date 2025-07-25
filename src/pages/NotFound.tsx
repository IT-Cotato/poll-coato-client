import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/route/path';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">404 - 페이지를 찾을 수 없습니다.</h2>
      <Button onClick={() => navigate(PATH.HOME)}>홈으로 돌아가기</Button>
    </div>
  );
}
