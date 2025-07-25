import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { useState, type FormEvent, type ChangeEvent } from 'react';

export default function AdminScore() {
  // 더미 데이터
  const teams = [
    { id: 1, name: '1팀' },
    { id: 2, name: '2팀' },
    { id: 3, name: '3팀' },
  ];
  const criteriaStructure = {
    section1: {
      title: '기술 구현',
      criteria: [
        { name: '기술 난이도', maxScore: 10 },
        { name: '완성도', maxScore: 10 },
      ],
      deductions: ['기술 미구현 시 -5점'],
    },
    section2: {
      title: '창의성',
      criteria: [{ name: '아이디어 참신성', maxScore: 10 }],
    },
  };
  const [scores, setScores] = useState<any>({});
  const [isPending, setIsPending] = useState(false);
  const event = { resultsFinalized: false };

  const handleScoreChange = (
    sectionKey: string,
    criterionIdx: number,
    teamId: number,
    value: number,
  ) => {
    setScores((prev: any) => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        [criterionIdx]: {
          ...(prev[sectionKey]?.[criterionIdx] || {}),
          [teamId]: value,
        },
      },
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => setIsPending(false), 1000); // 더미 저장
  };

  const Input = (props: any) => (
    <input
      {...props}
      onChange={(e) => {
        props.onChange?.(e);
      }}
    />
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>심사위원 점수 (80점)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {Object.entries(criteriaStructure).map(([key, section]) => (
            <div key={key} className="border rounded-lg p-6 bg-slate-50">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                {section.title}
              </h3>
              <div className="grid gap-4">
                {section.criteria.map((criterion, idx) => (
                  <div
                    key={`${key}-${idx}`}
                    className="bg-white rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium">
                        {criterion.name}
                      </Label>
                      <span className="text-xs text-slate-500">
                        최대 {criterion.maxScore}점
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {teams.map((team) => (
                        <div key={team.id} className="text-center">
                          <Label className="text-xs text-slate-600 mb-1 block">
                            {team.name}
                          </Label>
                          <Input
                            type="number"
                            min={0}
                            max={criterion.maxScore}
                            placeholder="0"
                            className="w-full text-center"
                            value={scores[key]?.[idx]?.[team.id] || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleScoreChange(
                                key,
                                idx,
                                team.id,
                                Number(e.target.value),
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {'deductions' in section && section.deductions && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">감점 요소:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {section.deductions?.map(
                      (deduction: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{deduction}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending || event.resultsFinalized}
              className="bg-primary hover:bg-primary/90"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              점수 저장
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
