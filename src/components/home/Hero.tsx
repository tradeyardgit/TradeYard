import React from 'react';
import { Search, MapPin, Sparkles, Upload, Camera } from 'lucide-react';
import { categories } from '../../data/categories';
import { locations } from '../../data/locations';
import FeaturedAds from '../home/FeaturedAds';
import { mockAds } from '../../data/mockAds';
import AdCard from '../ui/AdCard';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const featuredAds = mockAds.filter(ad => ad.featured).slice(0, 6);

  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,rgba(255,255,255,0.1)_12%,transparent_12.5%,transparent_87%,rgba(255,255,255,0.1)_87.5%,rgba(255,255,255,0.1))] bg-[length:20px_35px] opacity-20 animate-[slide_20s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,255,255,0.1),transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary-100">
            Post Ads for FREE!
          </h1>
          
          <p className="text-xl sm:text-2xl text-primary-100 mb-8">
            Upload a photo and let AI create your perfect listing
          </p>

          {/* AI-Powered CTA */}
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full mr-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white">AI-Powered Listings</h3>
                  <p className="text-primary-100">Upload a photo, get instant suggestions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-primary-100 mb-6">
                <div className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  <span>Smart photo analysis</span>
                </div>
                <div className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  <span>Auto-generated titles</span>
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span>Optimized descriptions</span>
                </div>
              </div>
              
              <Button
                as={Link}
                to="/post-ad"
                variant="primary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-primary-50 font-semibold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                icon={<Sparkles size={20} />}
              >
                Try AI Listing Now
              </Button>
            </div>
          </div>

          {/* Featured Ads Section */}
          {featuredAds.length > 0 && (
            <div className="mt-24">
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-4 sm:p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-8 text-center">Featured Listings</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
                  {featuredAds.map((ad) => (
                    <div key={ad.id} className="transform hover:scale-105 transition-transform duration-300">
                      <AdCard ad={ad} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;