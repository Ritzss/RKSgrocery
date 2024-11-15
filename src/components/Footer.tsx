import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About R.K.S GROCERY</h3>
            <p className="text-sm">We deliver fresh, high-quality groceries right to your doorstep.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Delivery Information</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400 transition">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Dairy & Eggs</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Bakery</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Meat & Seafood</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400 transition"><Facebook /></a>
              <a href="#" className="hover:text-green-400 transition"><Twitter /></a>
              <a href="#" className="hover:text-green-400 transition"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; 2024 R.K.S GROCERY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;