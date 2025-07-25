import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function MemberVoteInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>부원 투표 점수 (20점)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-3">
            부원 투표 평가 항목:
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700">
            <div>• 주제에 대한 공감 (5점)</div>
            <div>• 기획 발표에 대한 점수 (5점)</div>
            <div>• 디자인 발표에 대한 점수 (5점)</div>
            <div>• 프론트 시연 결과에 대한 평가 (5점)</div>
          </div>
          <div className="mt-3 p-3 bg-red-100 rounded">
            <span className="font-medium text-red-800">감점 항목:</span>
            <span className="text-red-700 ml-2">
              부원 투표에 참여하지 않는 팀 감점: 팀원당 -5점
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
