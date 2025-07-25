import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function EmailInput({
  email,
  setEmail,
  onSubmit,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <Card className="border-2 w-1/2 mx-auto border-primary/10 shadow-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-left mb-2 text-secondary font-semibold"
            >
              이메일
            </Label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <Button
            type="button"
            className="w-full bg-primary text-white hover:bg-primary/90"
            onClick={onSubmit}
          >
            완료
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
