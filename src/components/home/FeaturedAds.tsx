import React from 'react';
import { Ad } from '../../types';
import AdCard from '../ui/AdCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedAdsProps {
  ads: Ad[];
  title: string;
  seeAllLink?: string;
}

const FeaturedAds: React.FC<FeaturedAdsProps> = ({ 
  ads, 
  title, 
  seeAllLink 
}) => {
  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
          {title}
        </h2>
        {seeAllLink && (
          <Link 
            to={seeAllLink} 
            className="group flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            See all
            <ChevronRight size={20} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedAds;