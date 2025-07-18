import React from 'react';
import { mockAds } from '../data/mockAds';
import AdCard from '../components/ui/AdCard';
import { Clock } from 'lucide-react';

const RecentAdsListingPage: React.FC = () => {
  const recentAds = [...mockAds].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recently Added</h1>
            <p className="text-gray-600">The latest listings from our marketplace</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAdsListingPage;