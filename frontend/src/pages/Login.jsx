import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';
import { APP_NAME } from '../utils/constants';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication transition
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/30 text-blue-400 group-hover:border-blue-400 transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg text-slate-100">{APP_NAME}</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">
            Sign in to your account
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">
            Access pre-deployment audits and explainable risk reports
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-800 bg-slate-900/90 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="auditor@organization.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-300"
                >
                  Password <span className="text-red-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Mock password reset. You can sign in with any credentials.')}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/40"
                />
                <span className="text-xs text-slate-400">Remember this device</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Platform
            </Button>
          </form>

          {/* Alternative Quick Sign-in Note */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don&apos;t have an account yet?{' '}
              <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </Card>

        {/* Quick Demo Access Note */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          Decision-support prototype: You can enter any email/password to sign in.
        </p>
      </div>
    </div>
  );
};

export default Login;
