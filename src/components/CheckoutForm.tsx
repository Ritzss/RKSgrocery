import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import DeliveryTracker from './DeliveryTracker';
import { Order, DeliveryPerson } from '../types/shop';
import PaymentForm from './PaymentForm';

interface CheckoutFormProps {
  onClose: () => void;
}

const mockDeliveryPerson: DeliveryPerson = {
  id: 'dp1',
  name: 'Rajesh Kumar',
  phone: '+919876543210',
  image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  location: { lat: 28.5355, lng: 77.2167 },
  rating: 4.8,
  totalDeliveries: 1458
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onClose }) => {
  const { state, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const handlePaymentComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate order creation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create mock order
      const newOrder: Order = {
        id: 'ORD' + Math.random().toString(36).substr(2, 9),
        items: state.items,
        total: state.total + 40,
        status: 'confirmed',
        deliveryPerson: mockDeliveryPerson,
        estimatedDeliveryTime: '30-45 minutes',
        customerLocation: { lat: 28.5412, lng: 77.2198 },
        shopLocation: { lat: 28.5355, lng: 77.2167 },
        createdAt: new Date().toISOString()
      };

      setOrder(newOrder);

      // Simulate order status updates
      setTimeout(() => {
        setOrder(prev => prev ? { ...prev, status: 'preparing' } : null);
      }, 5000);

      setTimeout(() => {
        setOrder(prev => prev ? { ...prev, status: 'out_for_delivery' } : null);
      }, 10000);

      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order creation failed');
      setLoading(false);
    }
  };

  if (order) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-center">Order Tracking</h3>
        <DeliveryTracker order={order} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{state.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-semibold">₹40.00</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">₹{(state.total + 40).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-green-600" />
        </div>
      ) : (
        <PaymentForm 
          total={state.total + 40} 
          onPaymentComplete={handlePaymentComplete} 
        />
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;