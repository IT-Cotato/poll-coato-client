import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm, FormProvider } from 'react-hook-form';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// 더미 팀 데이터
const dummyTeams = [
  { id: '1', teamId: 1, name: '1팀' },
  { id: '2', teamId: 2, name: '2팀' },
  { id: '3', teamId: 3, name: '3팀' },
  { id: '4', teamId: 4, name: '4팀' },
  { id: '5', teamId: 5, name: '5팀' },
];

const dummyCriteria = [
  { id: 'a', name: '기여도', maxScore: 5 },
  { id: 'b', name: '협업', maxScore: 5 },
  { id: 'c', name: '책임감', maxScore: 5 },
  { id: 'd', name: '창의성', maxScore: 5 },
];

export default function Vote() {
  const teamId = Number(localStorage.getItem('teamId'));
  const [selectedTeamId, setSelectedTeamId] = useState('');
  // 내 팀 제외한 팀 목록
  const votableTeams = dummyTeams.filter((team) => Number(team.id) !== teamId);
  // 투표 점수 상태 (criteriaId: score)
  // const [scores, setScores] = useState<{ [criteriaId: string]: number }>({});

  // react-hook-form 적용
  const methods = useForm<{ scores: { [criteriaId: string]: number } }>({
    defaultValues: { scores: {} },
  });
  const { watch, setValue, reset, handleSubmit } = methods;

  // 투표 진행 현황 더미
  const getTeamCompletionStatus = (team: { id: string }) => {
    if (team.id === '1') return { completed: true, progress: 100 };
    if (team.id === '2') return { completed: false, progress: 60 };
    return { completed: false, progress: 0 };
  };

  // 점수 선택 핸들러
  const handleScoreSelect = (criteriaId: string, score: number) => {
    setValue(`scores.${criteriaId}`, score);
  };

  // 기존 점수 반환
  const getExistingScore = (criteriaId: string) =>
    watch(`scores.${criteriaId}`) || 0;

  // 투표 저장 핸들러
  const onSubmitVotes = (data: any) => {
    alert('저장됨: ' + JSON.stringify(data));
    setSelectedTeamId('');
    reset({ scores: {} });
  };

  // 저장 중 더미
  const saveVotesMutation = { isPending: false };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-secondary">팀원 투표</h2>
        <div className="flex items-center space-x-3">
          <Badge className="bg-primary/10 text-primary">팀{teamId}</Badge>
        </div>
      </div>

      {/* Voting Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>투표 진행 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {votableTeams.map((team) => {
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
                        {team.teamId}
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

      {/* Voting Form */}
      {selectedTeamId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>평가하기</span>
              <Badge className="bg-primary/10 text-primary">
                {votableTeams.find((t) => t.id === selectedTeamId)?.name}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmitVotes)}
                className="space-y-6"
              >
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-bold text-secondary mb-4">
                    부원 투표 점수 (20점)
                  </h3>

                  <div className="space-y-6">
                    {dummyCriteria.map((criteria) => (
                      <div key={criteria.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium text-slate-700">
                            {criteria.name} ({criteria.maxScore}점)
                          </Label>
                          <div className="flex items-center space-x-1">
                            {[0, 1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                type="button"
                                variant={
                                  getExistingScore(criteria.id) === score
                                    ? 'default'
                                    : 'outline'
                                }
                                size="sm"
                                className={`w-10 h-10 ${getExistingScore(criteria.id) === score ? 'bg-primary text-white' : ''}`}
                                onClick={() =>
                                  handleScoreSelect(criteria.id, score)
                                }
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">
                      감점 요소:
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          부원 투표에 참여하지 않는 팀 감점 : 팀원당 -5점
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedTeamId('');
                      reset({ scores: {} });
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled={saveVotesMutation.isPending}
                  >
                    {saveVotesMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    투표 저장
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
