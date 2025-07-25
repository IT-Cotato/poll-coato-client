import { Badge } from '@/components/ui/badge';

interface UserVoteHeaderProps {
  teamId: number;
}

export default function UserVoteHeader({ teamId }: UserVoteHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-secondary">팀원 투표</h2>
      <div className="flex items-center space-x-3">
        <Badge className="bg-primary/10 text-primary">팀{teamId}</Badge>
      </div>
    </div>
  );
}
