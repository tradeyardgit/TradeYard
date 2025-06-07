import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { categories } from '../../data/categories';
import { locations } from '../../data/locations';
import { Upload, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface AddListingFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddListingForm: React.FC<AddListingFormProps> = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    location: '',
    condition: '',
    negotiable: false,
    featured: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });

    if (e.target.name === 'category') {
      const category = categories.find(cat => cat.id === value);
      setSelectedCategory(value);
      setSubcategories(category?.subcategories || []);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
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

      setImages([...images, ...uploadedUrls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading images');
    } finally {
      setIsLoading(false);
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

      setImages(images.filter((_, i) => i !== index));
    } catch (err) {
      setError('Error removing image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: insertError } = await supabase
        .from('ads')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          subcategory: formData.subcategory,
          location: formData.location,
          images,
          seller_id: user.id,
          condition: formData.condition,
          negotiable: formData.negotiable,
          featured: formData.featured,
          status: 'active'
        });

      if (insertError) throw insertError;

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <Input
        label="Price"
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {subcategories.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subcategory
          </label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select subcategory</option>
            {subcategories.map(sub => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select location</option>
          {locations.map(location => (
            <option key={location.id} value={location.id}>
              {location.name}, {location.state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images
        </label>
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="h-24 w-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
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
                className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors"
                disabled={isLoading}
              >
                <Upload size={20} />
                <span className="mt-1 text-xs">Add Photo</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Condition
        </label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select condition</option>
          <option value="New">New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
        </select>
      </div>

      <div className="flex items-center space-x-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="negotiable"
            checked={formData.negotiable}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">Negotiable</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700">Featured</span>
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          loading={isLoading}
        >
          Create Listing
        </Button>
      </div>
    </form>
  );
};

export default AddListingForm;