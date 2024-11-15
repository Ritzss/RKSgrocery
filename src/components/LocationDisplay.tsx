import React from 'react';
import { Navigation2 } from 'lucide-react';
import { Location } from '../types/shop';

interface LocationDisplayProps {
  location: Location | null;
  loading: boolean;
  error: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ location, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center text-gray-600 text-sm md:text-base p-2">
        <p>Detecting your location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-sm md:text-base p-2">
        <p>{error}</p>
      </div>
    );
  }

  if (!location) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6 mx-2 md:mx-0">
      <div className="flex items-center gap-2 mb-2">
        <Navigation2 className="text-green-600 h-4 w-4 md:h-5 md:w-5" />
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">Your Current Location</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div className="text-xs md:text-sm">
          <span className="text-gray-600">Latitude:</span>
          <span className="ml-2 font-mono">{location.lat.toFixed(6)}°</span>
        </div>
        <div className="text-xs md:text-sm">
          <span className="text-gray-600">Longitude:</span>
          <span className="ml-2 font-mono">{location.lng.toFixed(6)}°</span>
        </div>
      </div>
    </div>
  );
};

export default LocationDisplay;