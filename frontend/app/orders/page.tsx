"use client"
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface Order {
  id: string;
  status: string;
  item: {productName: string; quantity: number; price: number } [];
  totalAmount: number;
}
const TrackingDetails = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      const response = await fetch('/api/orders', {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: Order = await response.json();
        setOrder(data);
        setMessage("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Order not found.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", err);
  }
};

  return (
    <div >
      <h1>Track Your Order</h1>
      <p className="mt-4 leading-relaxed text-gray-500">
              Enter your order ID below to your order status and details.
            </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="orderId">Order ID: </label>
        <input
        type="text"
        id="orderId"
        name="orderId"
        value={orderId}
        onChange={handleChange}
        placeholder="Enter Order ID"/>
        <Button type="submit">Track Order</Button>
        </form>
        {message && <p>{message}</p>}
        {order && (
        <div>
          <h2>Order ID: {order?.id}</h2>
          <p>Status: {order?.status}</p>
          <h3>Items: </h3>
          <ul>
            {order?.item.map((item, index) => (
            <li key={index}>
              {item.productName} - {item.quantity} * ${item.price.toFixed(2)}
            </li>
              ))}            
          </ul>
          <h3>Total Amount: ${order?.totalAmount.toFixed(2)}</h3>
          </div>
        )}
      </div>
      );
    };
export default TrackingDetails;