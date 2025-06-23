import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { categories } from '../data/categories';
import { locations } from '../data/locations';
import { Image, Upload, X, Info, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useAIProductAnalysis } from '../hooks/useAIProductAnalysis';

const PostAdPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    location: '',
    condition: '',
    negotiable: false,
    phone: '',
    showEmail: false
  });

  // Use the AI analysis hook
  const {
    isAnalyzing,
    aiSuggestions,
    showAiSuggestions,
    error: aiError,
    analyzeImageWithAI,
    applyAISuggestions,
    dismissAISuggestions,
    setError: setAiError
  } = useAIProductAnalysis({
    formData,
    setFormData,
    setSelectedCategory,
    setSubcategories
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field errors
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Handle category change
    if (name === 'category') {
      const category = categories.find(cat => cat.id === value);
      setSelectedCategory(value);
      setSubcategories(category?.subcategories || []);
      // Reset subcategory when category changes
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
      return;
    }

    setIsUploading(true);
    setAiError(null);

    try {
      // Check if user is authenticated before uploading
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        setErrors(prev => ({ 
          ...prev, 
          images: 'You must be logged in to upload images. Please log in and try again.' 
        }));
        return;
      }

      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from('ad-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('ad-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setImages(prev => [...prev, ...uploadedUrls]);

      // Clear image errors
      if (errors.images) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.images;
          return newErrors;
        });
      }

      // Analyze the first uploaded image with AI if it's the first image and form is mostly empty
      if (images.length === 0 && uploadedUrls.length > 0 && !formData.title && !formData.category) {
        await analyzeImageWithAI(uploadedUrls[0]);
      }

    } catch (err) {
      setErrors(prev => ({ ...prev, images: err instanceof Error ? err.message : 'Error uploading images' }));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = async (index: number) => {
    try {
      const imageUrl = images[index];
      const fileName = imageUrl.split('/').pop();

      if (fileName) {
        await supabase.storage
          .from('ad-images')
          .remove([fileName]);
      }

      setImages(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      setErrors(prev => ({ ...prev, images: 'Error removing image' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim() || formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Redirect to login if not authenticated
        navigate('/login');
        return;
      }

      const { error: insertError } = await supabase
        .from('ads')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          subcategory: formData.subcategory || null,
          location: formData.location,
          images,
          seller_id: user.id,
          condition: formData.condition || null,
          negotiable: formData.negotiable,
          status: 'active'
        });

      if (insertError) throw insertError;

      // Success - redirect to home or success page
      alert('Your ad has been submitted successfully and will be reviewed shortly!');
      navigate('/');

    } catch (err) {
      setErrors(prev => ({ 
        ...prev, 
        submit: err instanceof Error ? err.message : 'An error occurred while posting your ad' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Post an Ad</h1>
            <p className="mt-1 text-sm text-gray-600">
              Upload photos and let our AI help you create the perfect listing
            </p>
          </div>

          {/* AI Error Display */}
          {aiError && (
            <div className="mx-6 mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {aiError}
            </div>
          )}

          {/* AI Suggestions Panel */}
          {showAiSuggestions && aiSuggestions && (
            <div className="mx-6 mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-900">AI Suggestions</h3>
                  <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {Math.round(aiSuggestions.confidence * 100)}% confident
                  </span>
                </div>
                <button
                  onClick={dismissAISuggestions}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Suggested Title:</p>
                  <p className="text-gray-900">{aiSuggestions.title}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Category:</p>
                  <p className="text-gray-900">{aiSuggestions.category} → {aiSuggestions.subcategory}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Condition:</p>
                  <p className="text-gray-900">{aiSuggestions.condition}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tags:</p>
                  <p className="text-gray-900">{aiSuggestions.tags.join(', ')}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Suggested Description:</p>
                <p className="text-gray-900 text-sm">{aiSuggestions.description}</p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={applyAISuggestions}
                  variant="primary"
                  size="sm"
                  icon={<Sparkles size={16} />}
                >
                  Apply Suggestions
                </Button>
                <Button
                  onClick={dismissAISuggestions}
                  variant="outline"
                  size="sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
            {/* Image Upload - Prominently Featured */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Photos <span className="text-red-500">*</span>
                {isAnalyzing && (
                  <span className="ml-2 text-purple-600 text-sm flex items-center">
                    <Loader2 size={14} className="animate-spin mr-1" />
                    AI analyzing your product...
                  </span>
                )}
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
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded-b-md">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {images.length < 5 && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || isAnalyzing}
                        className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUploading ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          <Upload size={20} />
                        )}
                        <span className="mt-1 text-xs">
                          {isUploading ? 'Uploading...' : 'Add Photo'}
                        </span>
                      </button>
                    </>
                  )}
                </div>
                
                {errors.images && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.images}
                  </p>
                )}
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800 flex items-start">
                    <Sparkles size={16} className="mr-2 mt-0.5 flex-shrink-0" /> 
                    <span>
                      <strong>AI-Powered Listing:</strong> Upload your first photo and our AI will automatically suggest a title, category, description, and more to help you create the perfect listing!
                    </span>
                  </p>
                </div>
                
                <p className="text-xs text-gray-500 flex items-center">
                  <Info size={14} className="mr-1" /> 
                  Add up to 5 photos. First image will be the cover (main) image.
                </p>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
            
            {/* Subcategory Selection (conditional) */}
            {subcategories.length > 0 && (
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">Select a subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Ad Title */}
            <div>
              <Input
                label="Ad Title"
                id="title"
                name="title"
                type="text"
                required
                placeholder="e.g., iPhone 13 Pro Max - 256GB - Like New"
                maxLength={70}
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
              />
              <p className="mt-1 text-xs text-gray-500">
                Max 70 characters
              </p>
            </div>
            
            {/* Ad Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe your item, include condition, features, and any other relevant details"
                minLength={20}
                maxLength={4000}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Min 20 characters, max 4000 characters ({formData.description.length}/4000)
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
                  name="price"
                  required
                  min="0"
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="flex items-center">
                    <input
                      id="negotiable"
                      name="negotiable"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={formData.negotiable}
                      onChange={handleChange}
                    />
                    <label htmlFor="negotiable" className="ml-2 text-sm text-gray-600">
                      Negotiable
                    </label>
                  </div>
                </div>
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
            
            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">Used - Fair</option>
              </select>
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                id="location"
                name="location"
                required
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}, {location.state}</option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
            
            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
              
              <div className="space-y-4">
                <Input
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g., +234 812 345 6789"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
                
                <div className="flex items-center">
                  <input
                    id="showEmail"
                    name="showEmail"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={formData.showEmail}
                    onChange={handleChange}
                  />
                  <label htmlFor="showEmail" className="ml-2 text-sm text-gray-600">
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
                  I agree to the <Link to="/terms" className="text-primary-600 hover:text-primary-500">Terms and Conditions</Link> and <Link to="/privacy-policy" className=\"text-primary-600 hover:text-primary-500">Privacy Policy</Link>
                </label>
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {errors.submit}
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto"
                disabled={isUploading || isAnalyzing}
              >
                {isSubmitting ? 'Posting Ad...' : 'Post Ad'}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 text-primary-600 mr-2" />
            AI-Powered Listing Tips
          </h2>
          
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Upload clear, well-lit photos for better AI analysis</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Our AI can identify brands, models, and suggest optimal pricing</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Review and customize AI suggestions to match your item perfectly</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Include multiple angles and close-ups for comprehensive analysis</span>
            </li>
            <li className="flex">
              <span className="text-primary-600 mr-2">•</span>
              <span>Respond quickly to interested buyers for faster sales</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostAdPage;