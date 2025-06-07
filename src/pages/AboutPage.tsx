import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">About TradeYard</h1>
          </div>
          
          <div className="px-6 py-5 prose max-w-none">
            <p className="text-gray-600 mb-6">
              TradeYard is Nigeria's leading online marketplace, connecting buyers and sellers across the country. 
              Our platform provides a safe, convenient, and efficient way to buy and sell a wide variety of items.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              To create Africa's most trusted and vibrant marketplace, empowering millions of people to achieve 
              their entrepreneurial dreams and making commerce accessible to everyone.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-6">
              To be the destination of choice for buyers and sellers in Africa, known for trust, convenience, 
              and innovation in online commerce.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Why Choose TradeYard?</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-3">
              <li>Wide selection of products across multiple categories</li>
              <li>Secure and safe transaction environment</li>
              <li>Easy-to-use platform for buying and selling</li>
              <li>Dedicated customer support</li>
              <li>Nationwide reach across Nigeria</li>
              <li>Free ad posting</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Trust</h3>
                <p className="text-gray-600">Building and maintaining trust with our users is our top priority.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">Continuously improving our platform to serve you better.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600">Creating meaningful connections between buyers and sellers.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">Striving for the highest standards in everything we do.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;