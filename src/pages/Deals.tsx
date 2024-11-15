import React from 'react';
import Layout from '../components/Layout';
import { Tag, Clock, ShoppingBag } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  category: string;
}

const deals: Deal[] = [
  {
    id: 1,
    title: 'Fresh Vegetables Bundle',
    description: 'Get 20% off on our fresh vegetable bundle including tomatoes, potatoes, onions, and more!',
    discount: '20% OFF',
    validUntil: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Vegetables'
  },
  {
    id: 2,
    title: 'Premium Spices Pack',
    description: 'Buy any 3 premium spices and get 1 free! Perfect for your Indian cooking needs.',
    discount: 'Buy 3 Get 1',
    validUntil: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Spices'
  },
  {
    id: 3,
    title: 'Dairy Products Sale',
    description: 'Save big on all dairy products including milk, yogurt, and cheese!',
    discount: '15% OFF',
    validUntil: '2024-03-18',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Dairy'
  }
];

const Deals: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Special Deals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                  {deal.discount}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">{deal.category}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{deal.title}</h2>
                <p className="text-gray-600 mb-4">{deal.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Valid until {deal.validUntil}</span>
                  </div>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Shop Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Deals;