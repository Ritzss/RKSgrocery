import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Phone, Star, Navigation } from 'lucide-react';
import L from 'leaflet';
import { Order, Location } from '../types/shop';

interface DeliveryTrackerProps {
  order: Order;
}

const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ order }) => {
  const [deliveryLocation, setDeliveryLocation] = useState<Location>(
    order.deliveryPerson?.location || order.shopLocation
  );

  // Simulate delivery person movement
  useEffect(() => {
    if (order.status === 'out_for_delivery') {
      const interval = setInterval(() => {
        setDeliveryLocation(prev => {
          const lat = prev.lat + (Math.random() - 0.5) * 0.001;
          const lng = prev.lng + (Math.random() - 0.5) * 0.001;
          return { lat, lng };
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [order.status]);

  // Custom icons
  const deliveryIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const customerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const shopIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Calculate map bounds
  const bounds = L.latLngBounds(
    [order.customerLocation, order.shopLocation, deliveryLocation]
  );

  return (
    <div className="space-y-4">
      {order.deliveryPerson && (
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4">
            <img
              src={order.deliveryPerson.image}
              alt={order.deliveryPerson.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{order.deliveryPerson.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{order.deliveryPerson.rating} • {order.deliveryPerson.totalDeliveries} deliveries</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`tel:${order.deliveryPerson.phone}`}
                  className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </a>
                <div className="text-sm text-gray-600">
                  Estimated delivery by {order.estimatedDeliveryTime}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">Order Status</div>
              <div className="text-green-600 font-semibold capitalize">
                {order.status.replace(/_/g, ' ')}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          bounds={bounds}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Shop Marker */}
          <Marker position={[order.shopLocation.lat, order.shopLocation.lng]} icon={shopIcon}>
            <Popup>Store Location</Popup>
          </Marker>

          {/* Customer Marker */}
          <Marker position={[order.customerLocation.lat, order.customerLocation.lng]} icon={customerIcon}>
            <Popup>Delivery Location</Popup>
          </Marker>

          {/* Delivery Person Marker */}
          {order.status === 'out_for_delivery' && (
            <Marker position={[deliveryLocation.lat, deliveryLocation.lng]} icon={deliveryIcon}>
              <Popup>
                <div className="text-center">
                  <div className="font-semibold">{order.deliveryPerson?.name}</div>
                  <div className="text-sm text-gray-600">Your delivery partner</div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Route Lines */}
          <Polyline
            positions={[
              [order.shopLocation.lat, order.shopLocation.lng],
              [deliveryLocation.lat, deliveryLocation.lng],
              [order.customerLocation.lat, order.customerLocation.lng]
            ]}
            color="#16a34a"
            weight={3}
            opacity={0.6}
            dashArray="10"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default DeliveryTracker;