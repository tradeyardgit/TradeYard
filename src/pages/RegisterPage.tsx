import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { locations } from '../data/locations';
import { sendEmail, emailTemplates } from '../lib/email';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location) {
      newErrors.location = 'Location is required';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        // Create the user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            name: formData.name,
            phone: formData.phone,
            location: formData.location,
            role: 'user'
          });

        if (profileError) throw profileError;

        await sendEmail({
          to: formData.email,
          ...emailTemplates.welcome(formData.name)
        });

        setActiveStep('success');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Create an Account</h1>
          <p className="text-gray-600">
            Join TradeYard to buy and sell in Nigeria
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-100">
          {activeStep === 'form' ? (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800 mb-1">Registration Failed</h3>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                  label="Full Name"
                  type="text"
                  id="name"
                  name="name"
                  icon={<User size={18} />}
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  error={errors.name}
                  autoComplete="name"
                />

                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  name="email"
                  icon={<Mail size={18} />}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  error={errors.email}
                  autoComplete="email"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  name="phone"
                  icon={<Phone size={18} />}
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  error={errors.phone}
                  autoComplete="tel"
                />


                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Location
                    {!errors.location && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <MapPin size={18} />
                    </div>
                    <select
                      id="location"
                      name="location"
                      className={`pl-10 block w-full py-2.5 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                        errors.location ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
                      }`}
                      value={formData.location}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.location}
                      aria-describedby={errors.location ? 'location-error' : undefined}
                    >
                      <option value="">Select your location</option>
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>
                          {location.name}, {location.state}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.location && (
                    <p id="location-error" className="mt-1.5 text-sm text-red-600" role="alert">
                      {errors.location}
                    </p>
                  )}
                </div>

                <Input
                  label="Password"
                  type="password"
                  id="password"
                  name="password"
                  icon={<Lock size={18} />}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.password}
                  autoComplete="new-password"
                  helperText="At least 6 characters"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  icon={<Lock size={18} />}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />

                <div className="flex items-start pt-1">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                      aria-label="Accept terms and conditions"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600 cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        Terms and Conditions
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  loading={isLoading}
                >
                  Create Account
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="rounded-full bg-green-100 p-4 mx-auto w-fit mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Created Successfully!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Welcome to TradeYard. Redirecting to home page...
              </p>
              <div className="inline-block">
                <div className="animate-spin h-5 w-5 border-2 border-primary-600 border-t-transparent rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        
        {activeStep === 'form' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700 inline-flex items-center transition-colors">
                Sign in <ArrowRight size={16} className="ml-1" />
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;