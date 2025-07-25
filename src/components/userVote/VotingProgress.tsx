import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock } from 'lucide-react';

interface Team {
  id: string;
  teamNumber: number;
  name: string;
}

interface VotingProgressProps {
  votableTeams: Team[];
  selectedTeamId: string;
  setSelectedTeamId: (id: string) => void;
  getTeamCompletionStatus: (team: Team) => {
    completed: boolean;
    progress: number;
  };
}

export default function VotingProgress({
  votableTeams,
  selectedTeamId,
  setSelectedTeamId,
  getTeamCompletionStatus,
}: VotingProgressProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>투표 진행 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {votableTeams.map((team: Team) => {
            const status = getTeamCompletionStatus(team);
            return (
              <div
                key={team.id}
                className={`bg-slate-50 rounded-lg p-4 text-center cursor-pointer transition-colors hover:bg-slate-100 ${
                  selectedTeamId === team.id
                    ? 'ring-2 ring-primary bg-primary/5'
                    : ''
                }`}
                onClick={() => setSelectedTeamId(team.id)}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    status.completed
                      ? 'bg-green-100'
                      : status.progress > 0
                        ? 'bg-yellow-100'
                        : 'bg-slate-100'
                  }`}
                >
                  {status.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : status.progress > 0 ? (
                    <Clock className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <span className="text-slate-400 font-medium">
                      {team.teamNumber}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {team.name}
                </span>
                <p
                  className={`text-xs ${
                    status.completed
                      ? 'text-green-600'
                      : status.progress > 0
                        ? 'text-yellow-600'
                        : 'text-slate-500'
                  }`}
                >
                  {status.completed
                    ? '완료'
                    : status.progress > 0
                      ? '진행중'
                      : '미완료'}
                </p>
                <Progress value={status.progress} className="mt-2 h-1" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
