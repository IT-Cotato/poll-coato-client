import FinalRanking from '@/components/result/FinalRanking';
import ScoreTable from '@/components/result/ScoreTable';
import ParticipationStatus from '@/components/result/ParticipationStatus';

// 더미 데이터
const dummyResults = {
  teams: [
    {
      id: '1',
      name: '1팀',
      rank: 1,
      finalScore: 95.2,
      judgeAverage: 48.1,
      memberAverage: 47.1,
      memberParticipation: { total: 5, completed: 5 },
    },
    {
      id: '2',
      name: '2팀',
      rank: 2,
      finalScore: 89.7,
      judgeAverage: 45.0,
      memberAverage: 44.7,
      memberParticipation: { total: 5, completed: 4 },
    },
    {
      id: '3',
      name: '3팀',
      rank: 3,
      finalScore: 80.3,
      judgeAverage: 40.0,
      memberAverage: 40.3,
      memberParticipation: { total: 5, completed: 3 },
    },
    {
      id: '4',
      name: '4팀',
      rank: 4,
      finalScore: 70.0,
      judgeAverage: 35.0,
      memberAverage: 35.0,
      memberParticipation: { total: 5, completed: 2 },
    },
  ],
  overallParticipation: {
    judges: { percentage: 100, total: 5, completed: 5 },
    members: { percentage: 70, total: 20, completed: 14 },
  },
};

export default function Result() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-2">투표 결과</h2>
        <p className="text-slate-600">COTATO 6th Hackthon</p>
      </div>
      <FinalRanking teams={dummyResults.teams} />
      <ScoreTable teams={dummyResults.teams} />
      <ParticipationStatus
        overallParticipation={dummyResults.overallParticipation}
        teams={dummyResults.teams}
      />
    </div>
  );
}
