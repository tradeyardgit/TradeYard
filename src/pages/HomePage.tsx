import React from 'react';
import Hero from '../components/home/Hero';
import CategoryMenu from '../components/layout/CategoryMenu';
import FeaturedAds from '../components/home/FeaturedAds';
import { mockAds } from '../data/mockAds';

const HomePage: React.FC = () => {
  // Group ads by category
  const electronicAds = mockAds.filter(ad => ad.category === 'electronics');
  const vehicleAds = mockAds.filter(ad => ad.category === 'vehicles');
  const propertyAds = mockAds.filter(ad => ad.category === 'property');
  
  // Get recent ads
  const recentAds = [...mockAds].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <div className="bg-white py-16 lg:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-12">Shop by Category</h2>
          <CategoryMenu displayStyle="grid" />
        </div>
      </div>
      
      {/* Recent Ads */}
      <div className="bg-muted/30 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedAds 
            ads={recentAds} 
            title="Latest Ads" 
            seeAllLink="/recent"
          />
        </div>
      </div>
      
      {/* Electronics Section */}
      {electronicAds.length > 0 && (
        <div className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedAds 
              ads={electronicAds} 
              title="Electronics & Gadgets" 
              seeAllLink="/category/electronics"
            />
          </div>
        </div>
      )}
      
      {/* Vehicles Section */}
      {vehicleAds.length > 0 && (
        <div className="bg-muted/30 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedAds 
              ads={vehicleAds} 
              title="Vehicles" 
              seeAllLink="/category/vehicles"
            />
          </div>
        </div>
      )}
      
      {/* Property Section */}
      {propertyAds.length > 0 && (
        <div className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedAds 
              ads={propertyAds} 
              title="Real Estate" 
              seeAllLink="/category/property"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
