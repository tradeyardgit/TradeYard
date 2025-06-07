import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockAds } from '../data/mockAds';
import { Ad } from '../types';
import Button from '../components/ui/Button';
import { 
  Heart, 
  Share2, 
  Flag, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { formatCurrency, formatTimeAgo } from '../utils/helpers';

const AdDetailPage: React.FC = () => {
  const { adId } = useParams<{ adId: string }>();
  const [ad, setAd] = useState<Ad | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [similarAds, setSimilarAds] = useState<Ad[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (adId) {
      const foundAd = mockAds.find(ad => ad.id === adId);
      if (foundAd) {
        setAd(foundAd);
        
        // Find similar ads (same category, different id)
        const similar = mockAds
          .filter(a => a.category === foundAd.category && a.id !== foundAd.id)
          .slice(0, 3);
        setSimilarAds(similar);
      }
    }
    
    // Reset states when ad changes
    setActiveImageIndex(0);
    setIsContactVisible(false);
    setIsFavorited(false);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [adId]);

  if (!ad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Ad not found</h2>
          <p className="mt-2 text-gray-600">The ad you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === ad.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? ad.images.length - 1 : prevIndex - 1
    );
  };

  const toggleContact = () => {
    setIsContactVisible(!isContactVisible);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    
    if (!isFavorited) {
      alert('Added to favorites! ❤️');
    } else {
      alert('Removed from favorites');
    }
  };

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const shareData = {
      title: ad.title,
      text: `Check out this ${ad.title} for ${formatCurrency(ad.price)}`,
      url: window.location.href
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! 📋');
      }
    } catch (error) {
      // If both Web Share API and clipboard fail, show the URL
      alert(`Share this ad: ${window.location.href}`);
    }
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const reportReasons = [
      'Scam or fraud',
      'Inappropriate content',
      'Misleading information',
      'Duplicate listing',
      'Other'
    ];
    
    const reason = prompt(`Why are you reporting this ad?\n\nSelect a reason:\n${reportReasons.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n\nEnter the number (1-5):`);
    
    if (reason && parseInt(reason) >= 1 && parseInt(reason) <= 5) {
      const selectedReason = reportReasons[parseInt(reason) - 1];
      alert(`Thank you for reporting this ad.\nReason: ${selectedReason}\n\nOur team will review this report within 24 hours.`);
    } else if (reason !== null) {
      alert('Invalid selection. Please try again.');
    }
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Clean phone number (remove spaces, dashes, and country code formatting)
    const cleanPhone = ad.seller.phone.replace(/[\s\-\+]/g, '').replace(/^234/, '');
    
    // Construct the WhatsApp message
    const message = `Hi! I found your number on TradeYard and I'm interested in your listing: "${ad.title}". Is this item still available?\n\nItem Link: ${window.location.href}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Construct WhatsApp URL
    const whatsappUrl = `https://wa.me/234${cleanPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">›</span>
          <Link to={`/category/${ad.category}`} className="hover:text-gray-700">
            {ad.category.charAt(0).toUpperCase() + ad.category.slice(1)}
          </Link>
          {ad.subcategory && (
            <>
              <span className="mx-2">›</span>
              <Link to={`/category/${ad.category}?subcategory=${ad.subcategory}`} className="hover:text-gray-700">
                {ad.subcategory}
              </Link>
            </>
          )}
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium truncate">{ad.title}</span>
        </nav>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Ad Content */}
          <div className="lg:w-2/3">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="relative aspect-video bg-gray-100">
                <img 
                  src={ad.images[activeImageIndex]} 
                  alt={ad.title} 
                  className="w-full h-full object-contain"
                />
                
                {ad.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {ad.images.length > 1 && (
                <div className="flex overflow-x-auto p-2 space-x-2">
                  {ad.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                        activeImageIndex === index 
                          ? 'border-primary-500' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Ad Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">{ad.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{ad.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>Posted {formatTimeAgo(ad.postedAt)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Eye size={16} className="mr-1" />
                    <span>{Math.floor(Math.random() * 1000) + 50} views</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(ad.price)}
                    {ad.negotiable && (
                      <span className="text-sm font-normal text-gray-500 ml-2">Negotiable</span>
                    )}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <Button
                    onClick={toggleContact}
                    variant="primary"
                    size="lg"
                    icon={<Phone size={18} />}
                    className="sm:w-auto w-full"
                  >
                    Show Contact
                  </Button>
                  
                  <Button
                    onClick={handleChatClick}
                    variant="secondary"
                    size="lg"
                    icon={<MessageCircle size={18} />}
                    className="sm:w-auto w-full"
                  >
                    Chat on WhatsApp
                  </Button>
                  
                  <div className="flex gap-2 ml-auto">
                    <Button
                      onClick={handleFavoriteClick}
                      variant="outline"
                      size="lg"
                      icon={<Heart size={18} className={isFavorited ? 'fill-red-500 text-red-500' : ''} />}
                      className="p-2"
                      aria-label="Add to favorites"
                    />
                    
                    <Button
                      onClick={handleShareClick}
                      variant="outline"
                      size="lg"
                      icon={<Share2 size={18} />}
                      className="p-2"
                      aria-label="Share"
                    />
                    
                    <Button
                      onClick={handleReportClick}
                      variant="outline"
                      size="lg"
                      icon={<Flag size={18} />}
                      className="p-2"
                      aria-label="Report"
                    />
                  </div>
                </div>
                
                {/* Contact Information (Toggle) */}
                {isContactVisible && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                    <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-500 mr-3" />
                        <a href={`tel:${ad.seller.phone}`} className="text-primary-600 hover:underline">
                          {ad.seller.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-500 mr-3" />
                        <a href={`mailto:${ad.seller.email}`} className="text-primary-600 hover:underline">
                          {ad.seller.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 flex items-start">
                      <ShieldCheck size={16} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                      <p>For your safety, don't make advance payments before seeing the item.</p>
                    </div>
                  </div>
                )}
                
                {/* Description */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                  <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                    {ad.description}
                  </div>
                </div>
                
                {/* Additional Details (Condition) */}
                {ad.condition && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex justify-between py-3 px-4 bg-gray-50 rounded-md">
                        <span className="text-gray-600">Condition</span>
                        <span className="font-medium text-gray-900">{ad.condition}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex items-start">
                  <ShieldCheck size={24} className="text-primary-600 mr-3 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Safety Tips</h2>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Meet in a safe, public place</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Inspect the item before paying</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Never send money in advance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Report suspicious behavior</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Seller Info & Similar Ads */}
          <div className="lg:w-1/3 space-y-6">
            {/* Seller Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h2>
                
                <div className="flex items-center">
                  {ad.seller.avatar ? (
                    <img 
                      src={ad.seller.avatar} 
                      alt={ad.seller.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{ad.seller.name}</h3>
                    <p className="text-sm text-gray-500">Member since {new Date(ad.seller.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    onClick={handleChatClick}
                    variant="outline"
                    fullWidth
                    icon={<MessageCircle size={18} />}
                  >
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Posted In */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Posted In</h2>
                
                <div className="flex items-center">
                  <MapPin size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{ad.location}</span>
                </div>
              </div>
            </div>
            
            {/* Similar Ads */}
            {similarAds.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Similar Ads</h2>
                  
                  <div className="space-y-4">
                    {similarAds.map((similarAd) => (
                      <Link key={similarAd.id} to={`/ads/${similarAd.id}`} className="block group">
                        <div className="flex items-start">
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={similarAd.images[0]} 
                              alt={similarAd.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-3 flex-grow">
                            <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                              {similarAd.title}
                            </h3>
                            <p className="text-sm font-bold text-gray-900 mt-1">
                              {formatCurrency(similarAd.price)}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {similarAd.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link 
                      to={`/category/${ad.category}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center"
                    >
                      View More Similar Ads
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDetailPage;