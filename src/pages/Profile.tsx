import React, { useState } from 'react';
import Layout from '../components/Layout';
import { User, Mail, Phone, MapPin, Clock, Package, CreditCard } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  total: number;
  items: { name: string; quantity: number }[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2024-02-28',
    status: 'delivered',
    total: 450,
    items: [
      { name: 'Fresh Tomatoes', quantity: 2 },
      { name: 'Organic Bananas', quantity: 1 }
    ]
  },
  {
    id: 'ORD002',
    date: '2024-02-25',
    status: 'delivered',
    total: 850,
    items: [
      { name: 'Basmati Rice', quantity: 1 },
      { name: 'Garam Masala', quantity: 2 }
    ]
  }
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'profile'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Details
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'orders'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Order History
            </button>
          </div>

          {activeTab === 'profile' ? (
            <div className="p-6">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-semibold">John Doe</h2>
                  <p className="text-gray-500">Member since Jan 2024</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Default Address</p>
                    <p className="font-medium">123 Main Street, New Delhi, 110001</p>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-6">
                {mockOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {order.date}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Package className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{item.quantity}x {item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-500">Total:</span>
                      </div>
                      <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;