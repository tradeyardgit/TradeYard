import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { XIcon as Icon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface CategoryMenuProps {
  displayStyle?: 'grid' | 'horizontal';
  maxItems?: number;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ 
  displayStyle = 'grid',
  maxItems = categories.length 
}) => {
  const getIcon = (iconName: string): React.ReactNode => {
    const LucideIcon = (Icons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return LucideIcon ? <LucideIcon size={28} /> : null;
  };

  return (
    <div className={`
      ${displayStyle === 'grid' 
        ? 'grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6' 
        : 'flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4'}
    `}>
      {categories.slice(0, maxItems).map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.id}`}
          className={`
            group flex flex-col items-center justify-center 
            p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl
            border border-gray-100 hover:border-primary-100
            transform hover:-translate-y-1 transition-all duration-300
            ${displayStyle === 'horizontal' ? 'min-w-[120px] flex-shrink-0' : ''}
          `}
        >
          <div className="text-primary-500 group-hover:text-primary-600 transition-colors mb-3">
            {getIcon(category.icon)}
          </div>
          <span className="text-sm font-medium text-center text-gray-800 group-hover:text-primary-600 transition-colors">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategoryMenu;