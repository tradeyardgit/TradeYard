import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Terms and Conditions</h1>
            <p className="mt-1 text-gray-600">Last updated: March 15, 2024</p>
          </div>
          
          <div className="px-6 py-5 prose max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to TradeYard. By accessing or using our website, you agree to be bound by these 
              Terms and Conditions. Please read them carefully before using our services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing or using TradeYard, you agree to be bound by these Terms and Conditions 
              and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. User Accounts</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>You must be at least 18 years old to create an account</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Listing Rules</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>All listings must be accurate and truthful</li>
              <li>Prohibited items may not be listed</li>
              <li>Sellers must have the right to sell listed items</li>
              <li>Prices must be reasonable and clearly stated</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Prohibited Activities</h2>
            <p className="text-gray-600 mb-4">Users may not:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Post false or misleading information</li>
              <li>Engage in fraudulent activities</li>
              <li>Harass or abuse other users</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to circumvent our security measures</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Fees and Payments</h2>
            <p className="text-gray-600 mb-6">
              While basic listings are free, certain premium features may require payment. All fees 
              are non-refundable unless otherwise stated.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              All content on TradeYard, including text, graphics, logos, and software, is the property 
              of TradeYard or its content suppliers and is protected by copyright laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              TradeYard shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use or inability to use the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. Users will be notified of any 
              changes by updating the "Last updated" date of these Terms and Conditions.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Information</h2>
            <p className="text-gray-600">
              Questions about the Terms and Conditions should be sent to us at:
              <br />
              Email: legal@tradeyard.com
              <br />
              Phone: +234 812 345 6789
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;