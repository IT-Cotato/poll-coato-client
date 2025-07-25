import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Team {
  id: string;
  name: string;
  rank: number;
  finalScore: number;
  judgeAverage: number;
  memberAverage: number;
}

interface ScoreTableProps {
  teams: Team[];
}

export default function ScoreTable({ teams }: ScoreTableProps) {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>상세 점수</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">
                  팀명
                </th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                  심사위원 점수
                </th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                  팀원 점수
                </th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                  최종 점수
                </th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">
                  순위
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr
                  key={team.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="py-4 px-6 font-medium">{team.name}</td>
                  <td className="py-4 px-6 text-center">
                    {team.judgeAverage.toFixed(1)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {team.memberAverage.toFixed(1)}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-primary">
                    {team.finalScore.toFixed(1)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge
                      className={
                        team.rank === 1
                          ? 'bg-yellow-500 text-white'
                          : team.rank === 2
                            ? 'bg-gray-400 text-white'
                            : team.rank === 3
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-400 text-white'
                      }
                    >
                      {team.rank}위
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
