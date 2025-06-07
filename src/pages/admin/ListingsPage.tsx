import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Edit2, Trash2, Eye, PlusCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import AddListingForm from '../../components/admin/AddListingForm';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  status: string;
  images: string[];
  seller: {
    name: string;
  };
}

const ListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [listingToEdit, setListingToEdit] = useState<Listing | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('ads')
        .select(`
          *,
          seller:profiles(name)
        `)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setListings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleEditClick = (listing: Listing) => {
    setListingToEdit(listing);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (listingId: string) => {
    setListingToDelete(listingId);
    setIsDeleteModalOpen(true);
  };

  const handleViewClick = (listingId: string) => {
    navigate(`/ads/${listingId}`);
  };

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return;

    try {
      const { error: deleteError } = await supabase
        .from('ads')
        .delete()
        .eq('id', listingToDelete);

      if (deleteError) throw deleteError;

      setListings(listings.filter(listing => listing.id !== listingToDelete));
      setIsDeleteModalOpen(false);
      setListingToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting listing');
    }
  };

  const handleAddListingSuccess = () => {
    setIsAddListingModalOpen(false);
    fetchListings();
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setListingToEdit(null);
    fetchListings();
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">Error loading listings</p>
          <p className="mt-1 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
        <Button
          variant="primary"
          icon={<PlusCircle size={18} />}
          onClick={() => setIsAddListingModalOpen(true)}
        >
          Add Listing
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search listings..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            icon={<Filter size={18} />}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                        <div className="text-sm text-gray-500">{listing.seller.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {listing.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {formatCurrency(listing.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {listing.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      listing.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="text-gray-400 hover:text-primary-600"
                        onClick={() => handleViewClick(listing.id)}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-primary-600"
                        onClick={() => handleEditClick(listing)}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-red-600"
                        onClick={() => handleDeleteClick(listing.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Listing Modal */}
      <Modal
        isOpen={isAddListingModalOpen}
        onClose={() => setIsAddListingModalOpen(false)}
        title="Add New Listing"
      >
        <AddListingForm
          onSuccess={handleAddListingSuccess}
          onCancel={() => setIsAddListingModalOpen(false)}
        />
      </Modal>

      {/* Edit Listing Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setListingToEdit(null);
        }}
        title="Edit Listing"
      >
        <AddListingForm
          onSuccess={handleEditSuccess}
          onCancel={() => {
            setIsEditModalOpen(false);
            setListingToEdit(null);
          }}
          initialData={listingToEdit}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setListingToDelete(null);
        }}
        title="Delete Listing"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this listing? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setListingToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListingsPage;