import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Best Seller Badge */}
          {product.bestSeller && (
            <div className="absolute top-2 left-2 bg-green-400 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center">
              <Star size={12} className="mr-0.5 sm:mr-1" />
              Best Seller
            </div>
          )}

          {/* Discount Badge */}
          {product.oldPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
              View Details
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-5">
          {/* Category */}
          <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">{product.category}</p>

          {/* Product Name */}
          <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4 line-clamp-2 group-hover:text-green-400 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm sm:text-base text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
