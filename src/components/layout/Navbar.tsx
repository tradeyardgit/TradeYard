import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  User, 
  Heart, 
  Bell, 
  Menu, 
  X,
  LogIn,
  UserPlus,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import Button from '../ui/Button';
import { locations } from '../../data/locations';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState('All Nigeria');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
    setLocationDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary-600">TradeYard</span>
          </Link>

          {/* Location selector (hidden on mobile) */}
          <div className="hidden md:block relative">
            <button
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            >
              <span className="mr-1">{selectedLocation}</span>
              <ChevronDown size={16} className={`transform transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {locationDropdownOpen && (
              <div className="absolute mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in">
                <div className="py-2 max-h-96 overflow-y-auto">
                  <button
                    className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => handleLocationSelect('All Nigeria')}
                  >
                    All Nigeria
                  </button>
                  {locations.map(loc => (
                    <button
                      key={loc.id}
                      className="block w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => handleLocationSelect(loc.name)}
                    >
                      {loc.name}, {loc.state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button 
              variant="primary"
              icon={<PlusCircle size={18} />}
              as={Link}
              to="/post-ad"
              className="font-semibold"
            >
              Sell
            </Button>
            
            <Link to="/favorites" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              <Heart size={18} className="mr-1" />
              <span>Favorites</span>
            </Link>
            
            <Link to="/login" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
              <LogIn size={18} className="mr-1" />
              <span>Login</span>
            </Link>
            
            <Button
              variant="primary"
              as={Link}
              to="/register"
              icon={<UserPlus size={18} />}
              className="rounded-xl"
            >
              Register
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle search"
            >
              <Search size={24} />
            </button>
            
            <Button 
              variant="primary"
              size="sm"
              icon={<PlusCircle size={16} />}
              as={Link}
              to="/post-ad"
              className="rounded-xl"
            >
              Sell
            </Button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-gray-200 animate-slide-up">
          <div className="p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search for anything..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-up border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-900 mb-3">Location</h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                <button
                  className="block w-full px-3 py-2.5 rounded-lg text-left font-medium text-gray-700 hover:bg-white transition-colors"
                  onClick={() => handleLocationSelect('All Nigeria')}
                >
                  All Nigeria
                </button>
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    className="block w-full px-3 py-2.5 rounded-lg text-left font-medium text-gray-700 hover:bg-white transition-colors"
                    onClick={() => handleLocationSelect(loc.name)}
                  >
                    {loc.name}, {loc.state}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/favorites"
                className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart size={20} className="mr-3" />
                <span className="font-medium">Favorites</span>
              </Link>
              
              <Link
                to="/login"
                className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn size={20} className="mr-3" />
                <span className="font-medium">Login</span>
              </Link>
              
              <Link
                to="/register"
                className="flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus size={20} className="mr-3" />
                <span className="font-medium">Register</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;