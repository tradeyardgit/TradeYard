import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I create an account?",
    answer: "Click on the 'Register' button in the top right corner of the page. Fill in your details including name, email, and phone number. Verify your email address, and you're ready to go!",
    category: "Account"
  },
  {
    question: "Is it free to post ads?",
    answer: "Yes, posting basic ads on TradeYard is completely free. However, we offer premium features like featured listings for additional visibility.",
    category: "Posting Ads"
  },
  {
    question: "How do I post an ad?",
    answer: "Log in to your account, click on the 'Sell' button, select a category, fill in the item details including photos and price, and submit your ad for review.",
    category: "Posting Ads"
  },
  {
    question: "How long does it take for my ad to appear?",
    answer: "Most ads are reviewed and published within 24 hours. Premium ads are prioritized and usually appear within a few hours.",
    category: "Posting Ads"
  },
  {
    question: "How do I edit my ad?",
    answer: "Go to your account dashboard, find the ad you want to edit, click on 'Edit', make your changes, and save. Your ad will be reviewed again before being republished.",
    category: "Managing Ads"
  },
  {
    question: "How do I delete my ad?",
    answer: "Go to your account dashboard, find the ad you want to remove, click on 'Delete', and confirm. The ad will be permanently removed from our platform.",
    category: "Managing Ads"
  },
  {
    question: "How do I contact a seller?",
    answer: "Click on the ad you're interested in, then use either the 'Show Contact' or 'Chat with Seller' button to communicate with the seller.",
    category: "Buying"
  },
  {
    question: "Is it safe to buy on TradeYard?",
    answer: "While we implement various safety measures, we recommend meeting in public places, inspecting items before purchase, and never sending money in advance.",
    category: "Safety"
  },
  {
    question: "What payment methods are supported?",
    answer: "Payment methods are arranged between buyers and sellers. We recommend cash for in-person transactions or secure payment platforms for online transactions.",
    category: "Payments"
  },
  {
    question: "How do I report a suspicious ad or user?",
    answer: "Use the 'Report' button on the ad or user profile. Provide as much detail as possible to help our team investigate the issue.",
    category: "Safety"
  }
];

const FAQsPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
            <p className="mt-1 text-gray-600">Find answers to common questions about using TradeYard.</p>
          </div>
          
          <div className="px-6 py-5">
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category:
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${selectedCategory === category
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Contact Support */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Can't find what you're looking for?{' '}
                <a href="/contact" className="text-primary-600 hover:text-primary-500 font-medium">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;