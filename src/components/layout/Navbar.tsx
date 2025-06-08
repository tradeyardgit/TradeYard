import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  ChevronDown,
  MapPin,
  Grid3X3
} from 'lucide-react';
import Button from '../ui/Button';
import { locations } from '../../data/locations';
import { categories } from '../../data/categories';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All Nigeria');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSearchLocation, setSelectedSearchLocation] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLocationSelect = (locationName: string) => {
    setSelectedLocation(locationName);
    setLocationDropdownOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build search URL with query parameters
    const searchParams = new URLSearchParams();
    
    if (searchQuery.trim()) {
      searchParams.set('q', searchQuery.trim());
    }
    
    if (selectedCategory) {
      searchParams.set('category', selectedCategory);
    }
    
    if (selectedSearchLocation) {
      searchParams.set('location', selectedSearchLocation);
    }
    
    // Navigate to search results or category page
    if (selectedCategory && !searchQuery.trim()) {
      // If only category is selected, go to category page
      navigate(`/category/${selectedCategory}?${searchParams.toString()}`);
    } else {
      // Otherwise go to general search results (we'll use home page for now)
      navigate(`/?${searchParams.toString()}`);
    }
    
    // Close mobile search if open
    setMobileSearchOpen(false);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSearchLocation('');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary-600">TradeYard</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative flex bg-gray-50 rounded-xl border border-gray-200 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
                {/* Category Selector */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-transparent border-0 py-3 pl-4 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-0 rounded-l-xl min-w-[140px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <Grid3X3 size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-300"></div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-3 px-4 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Divider */}
                <div className="w-px bg-gray-300"></div>

                {/* Location Selector */}
                <div className="relative">
                  <select
                    value={selectedSearchLocation}
                    onChange={(e) => setSelectedSearchLocation(e.target.value)}
                    className="appearance-none bg-transparent border-0 py-3 pl-4 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-0 min-w-[120px]"
                  >
                    <option value="">All Nigeria</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <MapPin size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-r-xl transition-colors flex items-center"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Location selector (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <button
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            >
              <MapPin size={16} className="mr-1" />
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
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="p-4">
            <form onSubmit={handleSearch} className="space-y-3">
              {/* Category Selector */}
              <div className="relative">
                <Grid3X3 size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                />
              </div>

              {/* Location Selector */}
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedSearchLocation}
                  onChange={(e) => setSelectedSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                >
                  <option value="">All Nigeria</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}, {location.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Actions */}
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  <Search size={18} className="mr-2" />
                  Search
                </button>
                
                {(searchQuery || selectedCategory || selectedSearchLocation) && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4">
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
                className="flex items-center px-4 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors"
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