import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import { confirmPasswordReset } from '@/routes/apiforUser';

export default function ConfirmPasswordForm() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setMessage('');

    try {
      const result = await confirmPasswordReset({ password, id }); // Truyền id vào payload
      setMessage(result.message === 'Password has been reset successfully');
      if (message === 'Password has been reset successfully') {
        navigate('/auth'); // Chuyển hướng sau khi thành công
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center bg-gray-50 p-6">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Reset Your Password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please enter your new password below
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
Confirm New Password
                  </label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>
              <div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Resetting Password...' : 'Set New Password'}
                </Button>
              </div>
              {message && (
                <div
                  className={`alert ${message.includes('error') ? 'alert-error' : 'alert-success'}`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
