import React from 'react';
import { Shield, AlertTriangle, Eye, MapPin, CreditCard, MessageSquare, UserCheck, HelpCircle } from 'lucide-react';

const SafetyTipsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Safety Tips</h1>
            <p className="mt-1 text-gray-600">
              Your safety is our priority. Follow these guidelines for a secure trading experience.
            </p>
          </div>
          
          <div className="px-6 py-5">
            {/* Meeting in Person */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Meeting in Person</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Meet in a public, well-lit place during daylight hours
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Bring a friend or family member with you
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Tell someone where you're going and when you\'ll be back
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Trust your instincts - if something feels wrong, leave
                </li>
              </ul>
            </div>

            {/* Payments and Money */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Payments and Money</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Never send money in advance
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Be wary of deals that seem too good to be true
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Inspect items thoroughly before paying
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Keep proof of payment
                </li>
              </ul>
            </div>

            {/* Online Communication */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Online Communication</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Keep communication within our platform
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Don't share personal financial information
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Be wary of users pushing to communicate outside the platform
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Report suspicious messages immediately
                </li>
              </ul>
            </div>

            {/* Avoiding Scams */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Avoiding Scams</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Research market prices to identify unrealistic offers
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Be cautious of sellers refusing to meet in person
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Verify the item's authenticity and condition
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Don't trust sellers who pressure you to act quickly
                </li>
              </ul>
            </div>

            {/* Account Security */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Account Security</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Use a strong, unique password
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Never share your login credentials
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Enable two-factor authentication if available
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Log out when using shared devices
                </li>
              </ul>
            </div>

            {/* Report Issues */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <div className="flex items-start">
                <HelpCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Need Help?</h3>
                  <p className="mt-1 text-gray-600">
                    If you encounter any suspicious activity or need assistance, please contact our 
                    support team immediately at support@tradeyard.xyz or call +234 9066414474.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTipsPage;