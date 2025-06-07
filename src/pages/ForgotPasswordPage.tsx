import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sendEmail, emailTemplates } from '../lib/email';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;

      // Send password reset email
      await sendEmail({
        to: email,
        ...emailTemplates.passwordReset(`${window.location.origin}/reset-password`)
      });

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-100">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                type="email"
                id="email"
                icon={<Mail size={18} />}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={isSubmitting}
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="rounded-full bg-green-100 p-3 mx-auto w-fit">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Check your email</h3>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a password reset link to {email}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link 
            to="/login" 
            className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;