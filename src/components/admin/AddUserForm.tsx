import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { locations } from '../../data/locations';
import { sendEmail, emailTemplates } from '../../lib/email';

interface AddUserFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: any;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onSuccess, onCancel, initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    role: initialData?.role || 'user'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (initialData) {
        // Update existing user
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            name: formData.name,
            phone: formData.phone,
            location: formData.location,
            role: formData.role
          })
          .eq('id', initialData.id);

        if (updateError) throw updateError;
      } else {
        // Create new user
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
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              name: formData.name,
              phone: formData.phone,
              location: formData.location,
              role: formData.role
            });

          if (profileError) throw profileError;

          // Send welcome email
          await sendEmail({
            to: formData.email,
            ...emailTemplates.welcome(formData.name)
          });
        }
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {!initialData && (
        <>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!initialData}
            minLength={6}
          />
        </>
      )}

      <Input
        label="Phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}, {location.state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          loading={isLoading}
        >
          {initialData ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;