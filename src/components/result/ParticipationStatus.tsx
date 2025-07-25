import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Participation {
  judges: { percentage: number; total: number; completed: number };
  members: { percentage: number; total: number; completed: number };
}

interface Team {
  id: string;
  name: string;
  memberParticipation: { total: number; completed: number };
}

interface ParticipationStatusProps {
  overallParticipation: Participation;
  teams: Team[];
}

export default function ParticipationStatus({
  overallParticipation,
  teams,
}: ParticipationStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>참여 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium text-slate-700 mb-3">심사위원 참여율</h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">전체 참여율</span>
                <span className="font-semibold text-green-600">
                  {overallParticipation.judges.percentage.toFixed(0)}%
                </span>
              </div>
              <Progress
                value={overallParticipation.judges.percentage}
                className="mb-1"
              />
              <p className="text-xs text-slate-500">
                {overallParticipation.judges.total}명 중{' '}
                {overallParticipation.judges.completed}명 참여 완료
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-3">팀원 참여율</h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">전체 참여율</span>
                <span
                  className={`font-semibold ${
                    overallParticipation.members.percentage >= 80
                      ? 'text-green-600'
                      : overallParticipation.members.percentage >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}
                >
                  {overallParticipation.members.percentage.toFixed(0)}%
                </span>
              </div>
              <Progress
                value={overallParticipation.members.percentage}
                className="mb-1"
              />
              <p className="text-xs text-slate-500">
                {overallParticipation.members.total}명 중{' '}
                {overallParticipation.members.completed}명 참여 완료
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-slate-700 mb-3">팀별 미참여 인원</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {teams.map((team) => {
              const nonParticipants =
                team.memberParticipation.total -
                team.memberParticipation.completed;
              return (
                <div
                  key={team.id}
                  className="bg-slate-50 rounded-lg p-3 text-center"
                >
                  <div
                    className={`text-lg font-semibold ${nonParticipants === 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {nonParticipants}명
                  </div>
                  <div className="text-sm text-slate-600">{team.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
