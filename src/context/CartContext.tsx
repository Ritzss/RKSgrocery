import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types/shop';

interface CartState {
  items: CartItem[];
  total: number;
}

const CART_STORAGE_KEY = 'rks-grocery-cart';

const getInitialState = (): CartState => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : { items: [], total: 0 };
  } catch (error) {
    console.warn('Failed to load cart from storage:', error);
    return { items: [], total: 0 };
  }
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        newState = {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        };
      } else {
        const newItems = [...state.items, { product: action.payload, quantity: 1 }];
        newState = {
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        };
      }
      break;
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      newState = {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };
      break;
    }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const updatedItems = state.items.filter(item => item.product.id !== action.payload.productId);
        newState = {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        };
      } else {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        newState = {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
        };
      }
      break;
    }
    case 'CLEAR_CART':
      newState = { items: [], total: 0 };
      break;
    default:
      return state;
  }

  // Persist to localStorage
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.warn('Failed to save cart to storage:', error);
  }

  return newState;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  // Sync cart state with other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const newState = JSON.parse(e.newValue);
          if (JSON.stringify(newState) !== JSON.stringify(state)) {
            dispatch({ type: 'CLEAR_CART' });
            newState.items.forEach(item => {
              dispatch({ type: 'ADD_ITEM', payload: item.product });
              if (item.quantity > 1) {
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { productId: item.product.id, quantity: item.quantity }
                });
              }
            });
          }
        } catch (error) {
          console.warn('Failed to process storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [state]);

  const addItem = (product: Product) => {
    if (!product || typeof product.id === 'undefined') {
      console.warn('Invalid product data provided to addItem');
      return;
    }
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    if (typeof productId === 'undefined') {
      console.warn('Invalid productId provided to removeItem');
      return;
    }
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (typeof productId === 'undefined' || typeof quantity === 'undefined') {
      console.warn('Invalid parameters provided to updateQuantity');
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};