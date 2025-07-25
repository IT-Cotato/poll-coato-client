import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface Criteria {
  id: string;
  name: string;
  maxScore: number;
}

interface VotingFormProps {
  selectedTeamId: string;
  teamName: string;
  memberCriteria: Criteria[];
  voteForm: any;
  getExistingScore: (criteriaId: string) => number;
  handleScoreSelect: (criteriaId: string, score: number) => void;
  setSelectedTeamId: (id: string) => void;
  saveVotesMutation: { isPending: boolean };
  onSubmitVotes: (data: any) => void;
}

export default function VotingForm({
  selectedTeamId,
  teamName,
  memberCriteria,
  voteForm,
  onSubmitVotes,
  getExistingScore,
  handleScoreSelect,
  setSelectedTeamId,
  saveVotesMutation,
}: VotingFormProps) {
  if (!selectedTeamId) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>평가하기</span>
          <Badge className="bg-primary/10 text-primary">{teamName}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form은 더미로 처리 */}
        <form
          onSubmit={voteForm.handleSubmit(onSubmitVotes)}
          className="space-y-6"
        >
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-secondary mb-4">
              부원 투표 점수 (20점)
            </h3>
            <div className="space-y-6">
              {memberCriteria.map((criteria) => (
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
                            (voteForm.watch(`scores.${criteria.id}`) ||
                              getExistingScore(criteria.id)) === score
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          className={`w-10 h-10 ${
                            (voteForm.watch(`scores.${criteria.id}`) ||
                              getExistingScore(criteria.id)) === score
                              ? 'bg-primary text-white'
                              : ''
                          }`}
                          onClick={() => handleScoreSelect(criteria.id, score)}
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
              <h4 className="font-medium text-red-800 mb-2">감점 요소:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>부원 투표에 참여하지 않는 팀 감점 : 팀원당 -5점</span>
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
                voteForm.reset({ scores: {} });
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
      </CardContent>
    </Card>
  );
}
