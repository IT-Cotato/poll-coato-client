import { useState } from 'react';
import UserVoteHeader from '@/components/userVote/UserVoteHeader';
import VotingProgress from '@/components/userVote/VotingProgress';
import VotingForm from '@/components/userVote/VotingForm';

// 더미 유저 데이터
const dummyUser = { teamId: 3, name: '홍길동' };

// 더미 팀 데이터
const dummyTeams = [
  { id: '1', teamNumber: 1, name: '1팀' },
  { id: '2', teamNumber: 2, name: '2팀' },
  { id: '3', teamNumber: 3, name: '3팀' },
  { id: '4', teamNumber: 4, name: '4팀' },
];

// 더미 평가 기준
const dummyCriteria = [
  { id: 'a', name: '기여도', maxScore: 5 },
  { id: 'b', name: '협업', maxScore: 5 },
  { id: 'c', name: '책임감', maxScore: 5 },
  { id: 'd', name: '창의성', maxScore: 5 },
];

export default function Vote() {
  const [selectedTeamId, setSelectedTeamId] = useState('');
  // 투표 점수 상태 (criteriaId: score)
  const [scores, setScores] = useState<{ [criteriaId: string]: number }>({});

  // 투표 진행 현황 더미
  const getTeamCompletionStatus = (team: { id: string }) => {
    if (team.id === '1') return { completed: true, progress: 100 };
    if (team.id === '2') return { completed: false, progress: 60 };
    return { completed: false, progress: 0 };
  };

  // react-hook-form 대체 더미
  const voteForm = {
    watch: (key: string) => scores[key.split('.')[1]],
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      fn(scores);
    },
    reset: ({ scores: newScores }: { scores: any }) =>
      setScores(newScores || {}),
  };

  // 점수 선택 핸들러
  const handleScoreSelect = (criteriaId: string, score: number) => {
    setScores((prev) => ({ ...prev, [criteriaId]: score }));
  };

  // 기존 점수 반환
  const getExistingScore = (criteriaId: string) => scores[criteriaId] || 0;

  // 투표 저장 핸들러
  const onSubmitVotes = (data: any) => {
    alert('저장됨: ' + JSON.stringify(data));
    setSelectedTeamId('');
    setScores({});
  };

  // 저장 중 더미
  const saveVotesMutation = { isPending: false };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserVoteHeader user={dummyUser} />
      <VotingProgress
        votableTeams={dummyTeams}
        selectedTeamId={selectedTeamId}
        setSelectedTeamId={setSelectedTeamId}
        getTeamCompletionStatus={getTeamCompletionStatus}
      />
      <VotingForm
        selectedTeamId={selectedTeamId}
        teamName={dummyTeams.find((t) => t.id === selectedTeamId)?.name || ''}
        memberCriteria={dummyCriteria}
        voteForm={voteForm}
        onSubmitVotes={onSubmitVotes}
        getExistingScore={getExistingScore}
        handleScoreSelect={handleScoreSelect}
        setSelectedTeamId={setSelectedTeamId}
        saveVotesMutation={saveVotesMutation}
      />
    </div>
  );
}
