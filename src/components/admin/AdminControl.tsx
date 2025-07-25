import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useVoteControl } from '@/api/AdminControl.api';

const STATUS_LABELS = {
  OFF: '시작 전',
  ACTIVE: '투표 진행',
  CLOSED: '투표 마감 및 결과 계산',
  RESULT: '결과 표시',
};

type Status = keyof typeof STATUS_LABELS;

export default function AdminControl() {
  const [status, setStatus] = useState<Status>('OFF');
  const voteMutation = useVoteControl();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Status);
  };

  const handleSubmit = () => {
    voteMutation.mutate({ status });
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>투표 제어</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <select
            value={status}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            disabled={voteMutation.isPending}
          >
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <Button
            onClick={handleSubmit}
            disabled={voteMutation.isPending}
            className="bg-primary text-white"
          >
            상태 변경
          </Button>
          {voteMutation.isPending && <span>변경 중...</span>}
          {voteMutation.isSuccess && (
            <span className="text-green-600">변경 완료</span>
          )}
          {voteMutation.isError && (
            <span className="text-red-600">에러 발생</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
