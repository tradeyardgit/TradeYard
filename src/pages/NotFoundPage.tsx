import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-primary-500 flex justify-center">
            <Search size={64} />
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="mt-3 text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            to="/"
            variant="primary"
            icon={<Home size={18} />}
          >
            Back to Home
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            icon={<ArrowLeft size={18} />}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;