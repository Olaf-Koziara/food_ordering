import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onLogin(token.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Login administatora
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Token administatora"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Wpisz token administatora"
          />
          Token domyślny: admin
          <Button type="submit" className="w-full">
            Zaloguj
          </Button>
        </form>
      </Card>
    </div>
  );
};
