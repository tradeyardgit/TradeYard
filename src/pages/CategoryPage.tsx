import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdCard from '../components/ui/AdCard';
import { mockAds } from '../data/mockAds';
import { categories } from '../data/categories';
import { locations } from '../data/locations';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { Ad, Category } from '../types';

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [ads, setAds] = useState<Ad[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<{min: string; max: string}>({min: '', max: ''});
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    if (categoryId) {
      // Find the category
      const foundCategory = categories.find(cat => cat.id === categoryId);
      setCategory(foundCategory || null);
      
      // Filter ads by category
      const filteredAds = mockAds.filter(ad => ad.category === categoryId);
      setAds(filteredAds);
    } else {
      setAds(mockAds);
    }
  }, [categoryId]);

  const applyFilters = () => {
    let filteredAds = [...mockAds];
    
    // Filter by category
    if (categoryId) {
      filteredAds = filteredAds.filter(ad => ad.category === categoryId);
    }
    
    // Filter by subcategory
    if (selectedSubcategory) {
      filteredAds = filteredAds.filter(ad => ad.subcategory === selectedSubcategory);
    }
    
    // Filter by location
    if (selectedLocation) {
      filteredAds = filteredAds.filter(ad => ad.location === selectedLocation);
    }
    
    // Filter by price range
    if (priceRange.min) {
      filteredAds = filteredAds.filter(ad => ad.price >= parseInt(priceRange.min));
    }
    
    if (priceRange.max) {
      filteredAds = filteredAds.filter(ad => ad.price <= parseInt(priceRange.max));
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredAds = filteredAds.filter(
        ad => ad.title.toLowerCase().includes(query) || 
              ad.description.toLowerCase().includes(query)
      );
    }
    
    // Sort ads
    if (sortBy === 'newest') {
      filteredAds.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    } else if (sortBy === 'price_low_high') {
      filteredAds.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high_low') {
      filteredAds.sort((a, b) => b.price - a.price);
    }
    
    setAds(filteredAds);
    
    // Close mobile filters if open
    if (filtersOpen) {
      setFiltersOpen(false);
    }
  };

  const resetFilters = () => {
    setPriceRange({min: '', max: ''});
    setSelectedLocation('');
    setSearchQuery('');
    setSelectedSubcategory('');
    setSortBy('newest');
    
    if (categoryId) {
      const filteredAds = mockAds.filter(ad => ad.category === categoryId);
      setAds(filteredAds);
    } else {
      setAds(mockAds);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {category ? category.name : 'All Categories'}
          </h1>
          <p className="text-gray-600 mt-1">
            {ads.length} ads found
          </p>
        </div>
        
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search in this category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-auto flex">
              <Button 
                onClick={() => setFiltersOpen(!filtersOpen)}
                variant="outline"
                className="sm:hidden flex-grow"
                icon={<SlidersHorizontal size={18} />}
              >
                Filters
              </Button>
              
              <div className="hidden sm:flex items-center space-x-4">
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                </select>
                
                <Button 
                  onClick={applyFilters}
                  variant="primary"
                >
                  Apply Filters
                </Button>
                
                <Button 
                  onClick={resetFilters}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters (Expandable) */}
          <div className={`${filtersOpen ? 'block' : 'hidden'} sm:hidden mt-4 pt-4 border-t border-gray-200`}>
            <div className="space-y-4">
              {category?.subcategories && category.subcategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory
                  </label>
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                  >
                    <option value="">All Subcategories</option>
                    {category.subcategories.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Nigeria</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}, {location.state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range (₦)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="block w-1/2 py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="block w-1/2 py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  onClick={applyFilters}
                  variant="primary"
                  fullWidth
                >
                  Apply Filters
                </Button>
                
                <Button 
                  onClick={resetFilters}
                  variant="outline"
                  fullWidth
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Desktop Filters (Side Column) */}
          <div className="hidden sm:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-20">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              
              {category?.subcategories && category.subcategories.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Subcategory</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="all-subcategories"
                        name="subcategory"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        checked={selectedSubcategory === ''}
                        onChange={() => setSelectedSubcategory('')}
                      />
                      <label htmlFor="all-subcategories" className="ml-3 text-sm text-gray-700">
                        All Subcategories
                      </label>
                    </div>
                    
                    {category.subcategories.map((sub) => (
                      <div key={sub} className="flex items-center">
                        <input
                          id={`subcategory-${sub}`}
                          name="subcategory"
                          type="radio"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          checked={selectedSubcategory === sub}
                          onChange={() => setSelectedSubcategory(sub)}
                        />
                        <label htmlFor={`subcategory-${sub}`} className="ml-3 text-sm text-gray-700">
                          {sub}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Nigeria</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}, {location.state}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Price Range (₦)</h3>
                <div className="flex flex-col space-y-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="pt-2 space-y-3">
                <Button 
                  onClick={applyFilters}
                  variant="primary"
                  fullWidth
                >
                  Apply Filters
                </Button>
                
                <Button 
                  onClick={resetFilters}
                  variant="outline"
                  fullWidth
                >
                  Reset All
                </Button>
              </div>
            </div>
          </div>
          
          {/* Ad Listings */}
          <div className="flex-grow">
            {ads.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No ads found</h3>
                <p className="text-gray-600 mb-4">Try changing your search criteria or browse other categories.</p>
                <Button onClick={resetFilters} variant="primary">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                {ads.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;