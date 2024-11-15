import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = React.useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">
              {showCheckout ? 'Checkout' : 'Your Cart'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        {showCheckout ? (
          <div className="flex-1 overflow-y-auto p-4">
            <CheckoutForm onClose={onClose} />
          </div>
        ) : state.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 mb-4 bg-white rounded-lg p-3 shadow-sm">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">₹{item.product.price} per {item.product.unit}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                          className="text-green-600 hover:text-green-700 p-1"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-green-600 hover:text-green-700 p-1"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold text-green-600">₹{state.total.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;