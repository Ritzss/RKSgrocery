import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';

interface PaymentFormProps {
  total: number;
  onPaymentComplete: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ total, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (paymentMethod === 'card') {
        // Basic card validation
        if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
          throw new Error('Invalid card number');
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
          throw new Error('Invalid expiry date');
        }
        if (!/^\d{3}$/.test(cvv)) {
          throw new Error('Invalid CVV');
        }
      } else if (paymentMethod === 'upi') {
        if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
          throw new Error('Invalid UPI ID');
        }
      }

      onPaymentComplete();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <div className="text-xl font-semibold mb-2">Select Payment Method</div>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
              paymentMethod === 'card'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <CreditCard className={paymentMethod === 'card' ? 'text-green-600' : 'text-gray-400'} />
            <span className="text-sm">Card</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('upi')}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
              paymentMethod === 'upi'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <Smartphone className={paymentMethod === 'upi' ? 'text-green-600' : 'text-gray-400'} />
            <span className="text-sm">UPI</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('cod')}
            className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
              paymentMethod === 'cod'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
          >
            <Wallet className={paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'} />
            <span className="text-sm">Cash</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === 'card' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'upi' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="username@upi"
              required
            />
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              Please keep exact change ready for the delivery person.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;