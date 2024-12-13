import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { forgotPassword } from '@/routes/apiforUser';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import { AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(''); // Reset message trước khi gửi yêu cầu

    try {
      const result = await forgotPassword(email); // Gửi yêu cầu
      if (result && result.message) {
        setMessage(result.message); // Cập nhật thông báo
        // navigate('/confirm_reset_password'); // Chuyển hướng đến trang xác nhận
      } else {
        setMessage('Không tim thấy Email'); // Trường hợp không có message
      }
    } catch (error) {
      // Nếu xảy ra lỗi mạng hoặc lỗi khác
      setMessage('Không tim thấy Email');
    } finally {
      setIsLoading(false); // Ngừng trạng thái tải
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
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                No worries, we'll send you reset instructions.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Sending...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </div>
              {message && (
                <div
                  className={`rounded-md ${
                    message === 'Password reset link has been sent!'
                      ? 'bg-green-50'
                      : 'bg-red-50'
                  } p-4`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle
                        className={`h-5 w-5 ${
                          message === 'Password reset link has been sent!'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          message === 'Password reset link has been sent!'
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}
                      >
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
