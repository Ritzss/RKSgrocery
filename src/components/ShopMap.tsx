import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import { Shop, Location } from '../types/shop';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface ShopMapProps {
  userLocation: Location | null;
  shops: Shop[];
  selectedShop: Shop | null;
  onShopSelect: (shop: Shop) => void;
}

// Fix for default marker icons in Leaflet with React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ShopMap: React.FC<ShopMapProps> = ({ userLocation, shops, selectedShop, onShopSelect }) => {
  const [center, setCenter] = useState<[number, number]>([28.6139, 77.2090]);
  const zoom = 13;

  useEffect(() => {
    if (userLocation) {
      setCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-lg relative" style={{ zIndex: 1 }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png"
          maxZoom={19}
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>'
        />

        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-sm">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.coordinates.lat, shop.coordinates.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onShopSelect(shop)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{shop.name}</h3>
                <p className="text-sm text-gray-600">{shop.address}</p>
                <p className="text-sm text-green-600">{shop.timing}</p>
                <p className="text-sm font-medium">{shop.distance}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ShopMap;