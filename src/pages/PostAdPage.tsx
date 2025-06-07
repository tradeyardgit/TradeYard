import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { categories } from '../data/categories';
import { locations } from '../data/locations';
import { Image, Upload, X, Info, AlertCircle } from 'lucide-react';

const PostAdPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // This would normally be file upload handling
  // For this demo, we'll just use placeholder images
  const handleImageUpload = () => {
    if (images.length >= 5) {
      setErrors({...errors, images: 'You can upload a maximum of 5 images'});
      return;
    }
    
    // Add a placeholder image
    const placeholderImages = [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
      'https://images.pexels.com/photos/12719149/pexels-photo-12719149.jpeg'
    ];
    
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    setImages([...images, placeholderImages[randomIndex]]);
    
    // Clear any image-related errors
    if (errors.images) {
      const { images, ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    
    if (categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      setSubcategories(category?.subcategories || []);
    } else {
      setSubcategories([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const formErrors: Record<string, string> = {};
    
    if (images.length === 0) {
      formErrors.images = 'Please upload at least one image';
    }
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Submit logic would go here
    // For demo purposes, we'll just simulate a submission
    setTimeout(() => {
      alert('Your ad has been submitted for review and will be visible soon!');
      setIsSubmitting(false);
      // Reset form or redirect
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Post an Ad</h1>
            <p className="mt-1 text-sm text-gray-600">
              Fill out the form below to list your item for sale
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                required
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            {/* Subcategory Selection (conditional) */}
            {subcategories.length > 0 && (
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory <span className="text-red-500">*</span>
                </label>
                <select
                  id="subcategory"
                  required
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Ad Title */}
            <Input
              label="Ad Title"
              id="title"
              type="text"
              required
              placeholder="e.g., iPhone 13 Pro Max - 256GB - Like New"
              maxLength={70}
            />
            
            {/* Ad Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                required
                rows={5}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your item, include condition, features, and any other relevant details"
                minLength={20}
                maxLength={4000}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                Min 20 characters, max 4000 characters
              </p>
            </div>
            
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (₦) <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₦</span>
                </div>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="flex items-center">
                    <input
                      id="negotiable"
                      name="negotiable"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="negotiable" className="ml-2 text-sm text-gray-600">
                      Negotiable
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                id="location"
                required
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}, {location.state}</option>
                ))}
              </select>
            </div>
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Images <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex flex-col space-y-2">
                <div className="flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Uploaded preview ${index + 1}`} 
                        className="h-24 w-24 object-cover rounded-md border border-gray-300"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors"
                    >
                      <Upload size={20} />
                      <span className="mt-1 text-xs">Add Photo</span>
                    </button>
                  )}
                </div>
                
                {errors.images && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.images}
                  </p>
                )}
                
                <p className="text-xs text-gray-500 flex items-center">
                  <Info size={14} className="mr-1" /> 
                  Add up to 5 photos. First image will be the cover (main) image.
                </p>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
              
              <div className="space-y-4">
                <Input
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  required
                  placeholder="e.g., +234 812 345 6789"
                />
                
                <div className="flex items-center">
                  <input
                    id="show-email"
                    name="show-email"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="show-email" className="ml-2 text-sm text-gray-600">
                    Show my email in the ad
                  </label>
                </div>
              </div>
            </div>
            
            {/* Terms */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto"
              >
                Post Ad
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Tips for a great ad</h2>
          
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Use a clear, specific title that describes your item</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Include details about brand, model, age and any damages</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Add high-quality photos from different angles</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Set a reasonable price (check similar items for reference)</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Respond quickly to interested buyers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostAdPage;