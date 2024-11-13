import { Request, Response } from "express";
import Order from "../models/order";
import Cart from "../models/cart";
import Payment from "../models/payment";

function generateTrasactionId() {
  let characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 40; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `TX-${result}`;
}
// Place a new order
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // Access the user ID from the authenticated request
    const { items, total, shippingAddress } = req.body;
    console.log(userId);
    const newOrder = new Order({
      user: userId,
      items,
      total,
      shippingAddress,
      status: "pending",
      isPaid: false,
      isDelivered: false,
    });
    console.log("order saved");
    await newOrder.save();
    const newPayment = new Payment({
      order: newOrder._id,
      paymentMethod: "paypal",
      amount: total,
      status: "paid",
      transactionId: generateTrasactionId(),
      paidAt: new Date(),
    });

    await newPayment.save();
    console.log("payment saved");
    // update the status the order into paid true
    await Order.findByIdAndUpdate(newOrder._id, { isPaid: true });
    console.log("order status updated");
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("items.product").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get orders for the logged-in user
export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user?._id }).populate(
      "items.product"
    ).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a specific order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllOrdersThisWeekByDay = async (req: Request, res: Response): Promise<Response> => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay()); // Set to start of the current week (Sunday)
    startOfWeek.setUTCHours(0, 0, 0, 0); // Set to midnight (00:00) at the beginning of the week

    const orders = await Order.find({
      createdAt: { $gte: startOfWeek, $lt: now },
    }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).send("Orders not found");
    }

    // Initialize result object with each day of the week
    const result: Record<string, number> = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    // Helper function to get the day of the week from a date
    const getDayOfWeek = (dateStr: Date): number => {
      return new Date(dateStr).getUTCDay();
    };

    // Map day indexes to names
    const dayMap: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Iterate over each order and count orders by day of the week
    orders.forEach((order) => {
      const dayIndex = getDayOfWeek(order.createdAt);
      const dayName = dayMap[dayIndex];
      result[dayName]++;
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send("Server error");
  }
};


// Update order status (Admin only)
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  console.log("req.user");
  console.log(req.user);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Cancel an order (Admin only)
export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
