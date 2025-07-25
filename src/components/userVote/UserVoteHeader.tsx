import { Badge } from '@/components/ui/badge';

interface UserVoteHeaderProps {
  user: { teamId: number; name: string };
}

export default function UserVoteHeader({ user }: UserVoteHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-secondary">팀원 투표</h2>
      <div className="flex items-center space-x-3">
        <Badge className="bg-primary/10 text-primary">
          팀{user.teamId} - {user.name}
        </Badge>
      </div>
    </div>
  );
}
