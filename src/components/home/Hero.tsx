import React from 'react';
import { ArrowRight, TrendingUp, Users, Shield } from 'lucide-react';
import { mockAds } from '../../data/mockAds';
import AdCard from '../ui/AdCard';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const featuredAds = mockAds.filter(ad => ad.featured).slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Buy and Sell Anything
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of buyers and sellers on Nigeria's most trusted marketplace. Find great deals or sell your items instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  as={Link}
                  to="/post-ad"
                  variant="primary"
                  size="lg"
                  className="font-semibold flex items-center justify-center"
                >
                  Start Selling
                  <ArrowRight size={20} className="ml-2" />
                </Button>
                
                <Button
                  as={Link}
                  to="/category/electronics"
                  variant="secondary"
                  size="lg"
                  className="font-semibold"
                >
                  Browse Listings
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                  <p className="text-sm text-muted-foreground">Happy Sellers</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <p className="text-sm text-muted-foreground">Secure</p>
                </div>
              </div>
            </div>

            {/* Right - Featured Grid */}
            <div className="grid grid-cols-2 gap-4 auto-rows-max">
              {featuredAds.slice(0, 4).map((ad, idx) => (
                <div 
                  key={ad.id}
                  className={idx === 0 ? 'col-span-1 row-span-2' : 'col-span-1'}
                >
                  <div className="h-full rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                    <AdCard ad={ad} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/30 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose TradeYard?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for seamless buying and selling experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Quick Listings</h3>
              <p className="text-muted-foreground">Post your items in seconds with our streamlined listing process. Photos, price, and description - that's all you need.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Connect Directly</h3>
              <p className="text-muted-foreground">Chat with buyers or sellers in real-time. Negotiate prices and arrange meetups safely on our platform.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Stay Safe</h3>
              <p className="text-muted-foreground">Verified users, secure transactions, and protection policies ensure your peace of mind on every deal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* All Featured Ads */}
      {featuredAds.length > 0 && (
        <div className="bg-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Featured Listings</h2>
                <p className="text-muted-foreground mt-2">Browse popular items trending right now</p>
              </div>
              <Link 
                to="/featured"
                className="hidden lg:flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                View All
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredAds.map((ad) => (
                <div key={ad.id} className="hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                  <AdCard ad={ad} />
                </div>
              ))}
            </div>

            <div className="flex lg:hidden justify-center mt-8">
              <Button as={Link} to="/featured" variant="secondary">
                View All Featured Listings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
