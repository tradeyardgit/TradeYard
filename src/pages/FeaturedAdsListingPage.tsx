import React from 'react';
import { mockAds } from '../data/mockAds';
import AdCard from '../components/ui/AdCard';
import { Star } from 'lucide-react';

const FeaturedAdsListingPage: React.FC = () => {
  const featuredAds = mockAds.filter(ad => ad.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Featured Ads</h1>
            <p className="text-gray-600">Premium listings from our trusted sellers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedAdsListingPage;