import React, { useState } from 'react';
import { useLogin } from '@/api/Login.api';
import { PATH } from '@/route/path';

import { CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import logo from '@/assets/감직이.svg';
import EmailInput from '@/components/EmailInput';

export default function Home() {
  const loginMutation = useLogin();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = () => {
    loginMutation.mutate(email);
  };

  const role = localStorage.getItem('role');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="text-center mb-12">
        <div className="mb-8">
          <div className="w-24 h-24 gradient-primary rounded-2xl mx-auto flex items-center justify-center mb-6">
            <img src={logo} alt="logo" className="p-2" />
          </div>
          <h2 className="text-4xl font-bold text-secondary mb-4">POLLTATO</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            COKERTHON 부원 투표를 진행하는 플랫폼입니다.
            <br />
            6번째 코테이토 해커톤에 참여하신 모두 고생많으셨습니다!
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {role === null && (
            <EmailInput
              email={email}
              setEmail={setEmail}
              onSubmit={handleEmailSubmit}
            />
          )}
          {role === 'ADMIN' && (
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  심사위원으로 시작
                </h3>
                <p className="text-slate-600 mb-6">
                  투표를 개설하고 팀을 관리하며 평가 기준을 설정할 수 있습니다.
                </p>
                <Link to={PATH.ADMIN}>
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    심사위원으로 시작하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
          {role === 'MEMBER' && (
            <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-8">
                <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  팀원으로 참여
                </h3>
                <p className="text-slate-600 mb-6">
                  팀에 소속되어 다른 팀들을 평가하고 투표에 참여할 수 있습니다.
                </p>
                <Link to={PATH.VOTE}>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    팀원으로 참여하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
