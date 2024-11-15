import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Navigation2 } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance, formatDistance } from '../utils/distance';
import { Shop, Location } from '../types/shop';
import ShopMap from './ShopMap';

// Popular areas in Delhi with their coordinates
const delhiAreas = [
  { name: 'Malviya Nagar', coordinates: { lat: 28.5355, lng: 77.2167 } },
  { name: 'Connaught Place', coordinates: { lat: 28.6289, lng: 77.2074 } },
  { name: 'Lajpat Nagar', coordinates: { lat: 28.5700, lng: 77.2400 } },
  { name: 'Karol Bagh', coordinates: { lat: 28.6619, lng: 77.1905 } },
  { name: 'Dwarka', coordinates: { lat: 28.5823, lng: 77.0500 } },
  { name: 'Rohini', coordinates: { lat: 28.7400, lng: 77.1200 } },
  { name: 'Vasant Kunj', coordinates: { lat: 28.5200, lng: 77.1500 } },
  { name: 'Greater Kailash', coordinates: { lat: 28.5500, lng: 77.2400 } }
];

const initialShops: Shop[] = [
  { 
    id: 1, 
    name: 'Krishna Grocery Store', 
    address: '23, Malviya Nagar Market',
    timing: '7:00 AM - 10:00 PM',
    distance: '0.5 km',
    coordinates: { lat: 28.5355, lng: 77.2167 },
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 2, 
    name: 'Sharma General Store', 
    address: 'Shop 5, DDA Market',
    timing: '8:00 AM - 9:30 PM',
    distance: '0.8 km',
    coordinates: { lat: 28.5375, lng: 77.2189 },
    image: 'https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 3, 
    name: 'New Delhi Supermart', 
    address: '45, Community Center',
    timing: '8:30 AM - 9:00 PM',
    distance: '1.2 km',
    coordinates: { lat: 28.5392, lng: 77.2145 },
    image: 'https://images.unsplash.com/photo-1602665742701-389671bc40c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 4, 
    name: 'Gupta Brothers Store', 
    address: '12, Main Market Road',
    timing: '7:30 AM - 10:00 PM',
    distance: '1.5 km',
    coordinates: { lat: 28.5412, lng: 77.2198 },
    image: 'https://images.unsplash.com/photo-1631651363531-ee7f0f30cd88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
];

const ShopSelector: React.FC = () => {
  const { location: userLocation, error, loading } = useGeolocation();
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [customLocation, setCustomLocation] = useState<Location | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAreaSelectorOpen, setIsAreaSelectorOpen] = useState(false);

  const currentLocation = customLocation || userLocation;

  useEffect(() => {
    if (currentLocation) {
      const shopsWithinRange = initialShops
        .map(shop => {
          const distance = calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            shop.coordinates.lat,
            shop.coordinates.lng
          );
          return {
            ...shop,
            distance: formatDistance(distance),
            distanceValue: distance
          };
        })
        .filter(shop => shop.distanceValue <= 2)
        .sort((a, b) => a.distanceValue - b.distanceValue);

      setShops(shopsWithinRange);
      if (shopsWithinRange.length > 0 && !selectedShop) {
        setSelectedShop(shopsWithinRange[0]);
      }
    }
  }, [currentLocation, selectedShop]);

  const handleAreaSelect = (area: { name: string; coordinates: Location }) => {
    setSelectedArea(area.name);
    setCustomLocation(area.coordinates);
    setIsAreaSelectorOpen(false);
    setSelectedShop(null);
  };

  const handleUseCurrentLocation = () => {
    setSelectedArea('');
    setCustomLocation(null);
    setIsAreaSelectorOpen(false);
    setSelectedShop(null);
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-green-600 text-sm md:text-base p-2">
        <Loader2 className="animate-spin h-4 w-4 md:h-5 md:w-5" />
        <span>Finding nearby stores...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Location Selector */}
      <div className="relative w-full max-w-xs md:max-w-md mx-auto">
        <button
          onClick={() => setIsAreaSelectorOpen(!isAreaSelectorOpen)}
          className="w-full flex items-center space-x-2 bg-white text-green-600 px-3 md:px-6 py-2 md:py-3 rounded-lg shadow-md hover:bg-green-50 transition"
        >
          <Navigation2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          <span className="text-left flex-1 truncate">
            {selectedArea || 'Current Location'}
          </span>
        </button>

        {isAreaSelectorOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-40 border border-gray-100">
            <button
              onClick={handleUseCurrentLocation}
              className="w-full text-left px-4 py-3 hover:bg-green-50 transition border-b"
            >
              <div className="flex items-center gap-2">
                <Navigation2 className="h-4 w-4 text-green-600" />
                <span>Use Current Location</span>
              </div>
            </button>
            <div className="max-h-60 overflow-y-auto">
              {delhiAreas.map((area) => (
                <button
                  key={area.name}
                  onClick={() => handleAreaSelect(area)}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 transition"
                >
                  {area.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shop Selector */}
      {currentLocation ? (
        shops.length === 0 ? (
          <div className="text-center text-gray-600 p-4">
            <p>No stores found within 2km of {selectedArea || 'your location'}.</p>
            <p className="text-sm mt-2">Please try a different location or contact support for assistance.</p>
          </div>
        ) : (
          <>
            <div className="relative w-full max-w-xs md:max-w-md mx-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center space-x-2 bg-white text-green-600 px-3 md:px-6 py-2 md:py-3 rounded-lg shadow-md hover:bg-green-50 transition"
              >
                <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <div className="text-left flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base truncate">
                    {selectedShop ? selectedShop.name : 'Select a store'}
                  </div>
                  {selectedShop && (
                    <div className="text-xs md:text-sm text-gray-600 flex items-center gap-2 flex-wrap">
                      <span className="truncate">{selectedShop.timing}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {selectedShop.distance}
                      </span>
                    </div>
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-30 border border-gray-100 max-h-[60vh] overflow-y-auto">
                  {shops.map((shop) => (
                    <button
                      key={shop.id}
                      onClick={() => handleShopSelect(shop)}
                      className={`block w-full text-left px-3 md:px-4 py-2 md:py-3 hover:bg-green-50 transition ${
                        selectedShop?.id === shop.id ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={shop.image}
                          alt={shop.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <div className="font-semibold text-sm md:text-base truncate">{shop.name}</div>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                              {shop.distance}
                            </span>
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 truncate">{shop.address}</div>
                          <div className="text-xs text-green-600 mt-1">{shop.timing}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ShopMap
              userLocation={currentLocation}
              shops={shops}
              selectedShop={selectedShop}
              onShopSelect={handleShopSelect}
            />
          </>
        )
      ) : (
        <div className="text-center text-red-500 p-4">
          {error || 'Unable to determine location. Please enable location services or select an area.'}
        </div>
      )}
    </div>
  );
};

export default ShopSelector;