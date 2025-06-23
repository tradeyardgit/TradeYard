import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { locations } from '../data/locations';
import { sendEmail, emailTemplates } from '../lib/email';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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

        // Send welcome email
        await sendEmail({
          to: formData.email,
          ...emailTemplates.welcome(formData.name)
        });

        // Redirect to home page
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Create an Account</h1>
          <p className="text-gray-600">
            Join TradeYard to buy and sell in Nigeria
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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
            />
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <MapPin size={18} />
                </div>
                <select
                  id="location"
                  name="location"
                  className={`pl-10 block w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  value={formData.location}
                  onChange={handleChange}
                  required
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
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
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
            />
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms and Conditions</Link> and <Link to="/privacy-policy" className=\"text-primary-600 hover:text-primary-500">Privacy Policy</Link>
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
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 inline-flex items-center">
              Sign in <ArrowRight size={16} className="ml-1" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;