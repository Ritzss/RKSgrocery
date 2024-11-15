import React from 'react';
import Layout from '../components/Layout';
import ShopSelector from '../components/ShopSelector';
import LocationDisplay from '../components/LocationDisplay';
import { useGeolocation } from '../hooks/useGeolocation';

function Home() {
  const { location, error, loading } = useGeolocation();

  return (
    <Layout>
      <div className="text-center px-4 md:px-0">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Welcome to R.K.S GROCERY</h1>
        <p className="text-base md:text-xl mb-4">Your one-stop shop for fresh groceries!</p>
        <LocationDisplay location={location} loading={loading} error={error} />
        <div className="flex justify-center mb-6 md:mb-8">
          <ShopSelector />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Fresh Produce</h2>
            <img src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                 alt="Fresh Produce" 
                 className="w-full h-32 md:h-48 object-cover rounded-md mb-3 md:mb-4" />
            <p className="text-sm md:text-base">Discover our wide range of fresh fruits and vegetables.</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Daily Essentials</h2>
            <img src="https://images.unsplash.com/photo-1536304447766-da0ed4ce1b73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                 alt="Daily Essentials" 
                 className="w-full h-32 md:h-48 object-cover rounded-md mb-3 md:mb-4" />
            <p className="text-sm md:text-base">Stock up on everyday items for your home and pantry.</p>
          </div>
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Special Offers</h2>
            <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                 alt="Special Offers" 
                 className="w-full h-32 md:h-48 object-cover rounded-md mb-3 md:mb-4" />
            <p className="text-sm md:text-base">Check out our latest deals and discounts on popular items.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;