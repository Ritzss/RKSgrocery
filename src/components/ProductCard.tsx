import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types/shop';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, addItem, removeItem, updateQuantity } = useCart();
  const cartItem = state.items.find(item => item.product.id === product.id);

  const handleAddToCart = () => {
    if (!product || typeof product.id === 'undefined') {
      console.warn('Invalid product data');
      return;
    }
    addItem(product);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (typeof newQuantity !== 'number' || typeof product.id === 'undefined') {
      console.warn('Invalid quantity or product data');
      return;
    }
    if (newQuantity === 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  if (!product || typeof product.id === 'undefined') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-green-600 font-semibold">₹{product.price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">Per {product.unit}</p>
        
        {!cartItem ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              className="text-green-600 hover:text-green-700 p-1"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-semibold">{cartItem.quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
              className="text-green-600 hover:text-green-700 p-1"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;