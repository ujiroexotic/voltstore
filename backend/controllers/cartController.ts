import { Request, Response } from 'express';
import Cart from '../models/cart';
import Product from '../models/Product'; // Import your Product model
import mongoose from 'mongoose';

// Get cart items for a user
export const getCartItems = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user?.id }).populate('items.product');
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to add an item to the cart
export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user?.id; // Assuming you have the user ID from the request
  const { productId, quantity } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      // Check if the item already exists in the cart
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        // Update the quantity
        existingItem.quantity += quantity;
      } else {
        // Push new item with all required fields
        cart.items.push({
          product: productId,
          quantity,
          price: product.price, // Use the product's price
          _id: new mongoose.Types.ObjectId() // Generate a new ID if necessary
        });
      }

      // Save the updated cart
      await cart.save();
    } else {
      // If no cart exists for the user, create a new one
      const newCart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
            price: product.price, // Use the product's price
            _id: new mongoose.Types.ObjectId() // Generate a new ID if necessary
          }
        ],
      });

      await newCart.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// // Add item to cart
// export const addToCart = async (req: Request, res: Response) => {
//   const { productId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ user: req.user?.id });

//     if (!cart) {
//       cart = new Cart({ user: req.user?.id, items: [] });
//     }

//     const existingItem = cart.items.find(item => item.product.toString() === productId);

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity, price: 0 }); // Add price if it's part of CartItem
//     }

//     cart.total = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    
//     const savedCart = await cart.save();
//     res.status(201).json(savedCart);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// Update item quantity in cart
export const updateCartItem = async (req: Request, res: Response) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user?.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item._id?.toString() === req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user?.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id?.toString() !== req.params.id);

    await cart.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Clear the entire cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    // Remove the cart for the logged-in user
    await Cart.findOneAndDelete({ user: req.user?.id });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};