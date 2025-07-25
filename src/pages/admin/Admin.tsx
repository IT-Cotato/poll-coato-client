import { Badge } from '@/components/ui/badge';
import AdminControl from '@/components/admin/AdminControl';
import AdminScore from '@/components/admin/AdminScore';
import MemberVoteInfo from '@/components/admin/MemberVoteInfo';

const admin = { name: '홍길동' };

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-secondary">심사위원 대시보드</h2>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary">관리자</Badge>
          <span className="text-lg font-medium text-slate-700">
            {admin.name}
          </span>
        </div>
      </div>
      <AdminControl />
      <AdminScore />
      <MemberVoteInfo />
    </div>
  );
}
