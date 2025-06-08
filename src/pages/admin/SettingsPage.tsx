import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate settings update
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Settings updated successfully!');
    }, 1500);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Site Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Site Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Site Name"
                  type="text"
                  defaultValue="TradeYard"
                />
                
                <Input
                  label="Support Email"
                  type="email"
                  defaultValue="support@tradeyard.xyz"
                />
                
                <Input
                  label="Contact Phone"
                  type="tel"
                  defaultValue="+234 812 345 6789"
                />
              </div>
            </div>

            {/* Ad Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ad Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Images per Ad
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md">
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Duration (days)
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md">
                    <option>30</option>
                    <option>60</option>
                    <option>90</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="auto-approve"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="auto-approve" className="ml-2 block text-sm text-gray-700">
                    Auto-approve new listings
                  </label>
                </div>
              </div>
            </div>

            {/* Email Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center">
                  <input
                    id="welcome-email"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="welcome-email" className="ml-2 block text-sm text-gray-700">
                    Send welcome email to new users
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="notification-email"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notification-email" className="ml-2 block text-sm text-gray-700">
                    Send email notifications for new messages
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                icon={<Save size={18} />}
              >
                Save Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;