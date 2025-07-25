import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Team {
  id: string;
  name: string;
  rank: number;
  finalScore: number;
  judgeAverage: number;
  memberAverage: number;
}

interface FinalRankingProps {
  teams: Team[];
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-600" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-yellow-700" />;
    default:
      return (
        <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-slate-600">
          {rank}
        </span>
      );
  }
}

function getRankColor(rank: number) {
  switch (rank) {
    case 1:
      return 'from-yellow-100 to-yellow-50 border-yellow-300';
    case 2:
      return 'from-gray-100 to-gray-50 border-gray-300';
    case 3:
      return 'from-orange-100 to-orange-50 border-orange-300';
    default:
      return 'from-slate-50 to-slate-25 border-slate-200';
  }
}

export default function FinalRanking({ teams }: FinalRankingProps) {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl">최종 순위</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`bg-gradient-to-r ${getRankColor(team.rank)} rounded-lg p-6 border-l-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {getRankIcon(team.rank)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-secondary">
                      {team.name}
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {team.finalScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-600">
                    심사위원 {team.judgeAverage.toFixed(1)} + 팀원{' '}
                    {team.memberAverage.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
