// These are the types for the products we are expecting from the backend.
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
};
  //These are the types for the quantity. It's an extension of product because we plan to utilize backend sync
  export interface CartItem extends Product {
    quantity: number; // Quantity of the product in the cart
  }
  
  export interface CartContextType {
    cart: CartItem[]; // Array of items in the cart
    addToCart: (product: Product, quantity: number) => void; // Function to add a product to the cart
    removeFromCart: (productId: string) => void; // Function to remove a product from the cart
    clearCart: () => void; // Function to clear the cart
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<void>;
  }
  