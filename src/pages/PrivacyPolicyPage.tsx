import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-1 text-gray-600">Last updated: March 15, 2024</p>
          </div>
          
          <div className="px-6 py-5 prose max-w-none">
            <p className="text-gray-600 mb-6">
              At TradeYard, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Name, email address, and phone number when you create an account</li>
              <li>Profile information such as your location and preferences</li>
              <li>Information about items you post for sale</li>
              <li>Communications between you and other users</li>
              <li>Payment information when applicable</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-6">
              We do not sell or rent your personal information to third parties. We may share your 
              information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>With other users as part of the normal operation of our services</li>
              <li>With service providers who assist in our operations</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent where applicable</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@tradeyard.com
              <br />
              Phone: +234 812 345 6789
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;