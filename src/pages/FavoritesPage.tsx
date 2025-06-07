import React from 'react';
import { Heart } from 'lucide-react';
import AdCard from '../components/ui/AdCard';
import { mockAds } from '../data/mockAds';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  // For demo purposes, we'll show some random ads as favorites
  const favoriteAds = mockAds.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
          <span className="text-gray-500">{favoriteAds.length} items</span>
        </div>

        {favoriteAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Start adding items to your favorites by clicking the heart icon on any ad.
            </p>
            <Button
              as={Link}
              to="/"
              variant="primary"
            >
              Browse Ads
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;