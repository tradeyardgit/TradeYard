import React from 'react';
import CategoryMenu from '../components/layout/CategoryMenu';
import FeaturedAds from '../components/home/FeaturedAds';
import { mockAds } from '../data/mockAds';

const HomePage: React.FC = () => {
  // Filter featured ads
  const featuredAds = mockAds.filter(ad => ad.featured);
  
  // Group ads by category
  const electronicAds = mockAds.filter(ad => ad.category === 'electronics');
  const vehicleAds = mockAds.filter(ad => ad.category === 'vehicles');
  const propertyAds = mockAds.filter(ad => ad.category === 'property');
  
  // Get recent ads
  const recentAds = [...mockAds].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6"></h2>
          <CategoryMenu displayStyle="grid" />
        </div>
        
        {/* Featured Ads */}
        <FeaturedAds 
          ads={featuredAds} 
          title="Featured Ads" 
          seeAllLink="/featured"
        />
        
        {/* Recent Ads */}
        <FeaturedAds 
          ads={recentAds} 
          title="Latest Ads" 
          seeAllLink="/recent"
        />
        
        {/* Category-specific Ads */}
        {electronicAds.length > 0 && (
          <FeaturedAds 
            ads={electronicAds} 
            title="Electronics" 
            seeAllLink="/category/electronics"
          />
        )}
        
        {vehicleAds.length > 0 && (
          <FeaturedAds 
            ads={vehicleAds} 
            title="Vehicles" 
            seeAllLink="/category/vehicles"
          />
        )}
        
        {propertyAds.length > 0 && (
          <FeaturedAds 
            ads={propertyAds} 
            title="Real Estate" 
            seeAllLink="/category/property"
          />
        )}
        
        {/* How it works section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">How TradeYard Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up for free and join our community of buyers and sellers across Nigeria.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Post Your Ad</h3>
              <p className="text-gray-600">Easily list your items for sale with photos, descriptions, and your preferred price.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect & Sell</h3>
              <p className="text-gray-600">Chat with buyers, negotiate prices, and complete your sale safely.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;