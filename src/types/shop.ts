export interface Shop {
  id: number;
  name: string;
  address: string;
  timing: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  distanceValue?: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  image: string;
  location: Location;
  rating: number;
  totalDeliveries: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  deliveryPerson?: DeliveryPerson;
  estimatedDeliveryTime?: string;
  customerLocation: Location;
  shopLocation: Location;
  createdAt: string;
}