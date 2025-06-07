import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Ad } from '../../types';
import { Link } from 'react-router-dom';
import { formatCurrency, formatTimeAgo } from '../../utils/helpers';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <Link to={`/ads/${ad.id}`} className="group block">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in border border-gray-100 hover:border-primary-100 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={ad.images[0]} 
            alt={ad.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Featured Badge */}
          {ad.featured && (
            <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm bg-opacity-90">
              Featured
            </div>
          )}
          
          {/* Favorite Button */}
          <button 
            className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full text-gray-600 hover:text-red-500 transition-colors shadow-lg backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
              // Favorite logic would go here
            }}
          >
            <Heart size={18} className="transform group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Price Tag */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
            <span className="font-bold text-gray-900">{formatCurrency(ad.price)}</span>
            {ad.negotiable && (
              <span className="text-xs text-gray-600 ml-1">• Negotiable</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 line-clamp-2 min-h-[2.5rem] transition-colors">
            {ad.title}
          </h3>
          
          {/* Location and Time */}
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="ml-1 truncate">{ad.location}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="truncate">{formatTimeAgo(ad.postedAt)}</span>
          </div>
          
          {/* Seller Info */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center">
            {ad.seller.avatar ? (
              <img 
                src={ad.seller.avatar} 
                alt={ad.seller.name} 
                className="w-8 h-8 rounded-full mr-2 border-2 border-white shadow-sm object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium mr-2">
                {ad.seller.name.charAt(0)}
              </div>
            )}
            <span className="text-sm text-gray-600 truncate">{ad.seller.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AdCard;