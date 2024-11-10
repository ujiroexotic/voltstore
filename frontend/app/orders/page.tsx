"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useGetUserOrdersQuery } from "@/redux/slices/ordersApiSlice"; // Adjust this import to match your RTK slice
import { UserOrders } from "@/types/orders";

const TrackingDetails = () => {
  const { data: orders, isLoading, error } = useGetUserOrdersQuery();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (error) {
      setMessage("There was an error fetching the orders.");
    }
  }, [error]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{message}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <p className="mt-4 leading-relaxed text-gray-500">
        Below are your recent orders with their current status.
      </p>
      
      {orders && orders.length > 0 ? (
        orders.map((order: UserOrders) => (
          <div key={order._id} className="mt-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
            <p>Delivered: {order.isDelivered ? "Yes" : "No"}</p>
            <h3 className="text-lg font-medium mt-4">Items:</h3>
            <ul className="list-disc pl-6">
              {order.items.map((item) => (
                <li key={item._id} className="my-2">
                  <span className="font-medium">{item.product.name}</span> - {item.quantity} x ${item.price.toFixed(2)}
                  <p className="text-sm text-gray-500">{item.product.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">Total Amount: ${order.total.toFixed(2)}</p>
            <h3 className="text-lg font-medium mt-4">Shipping Address:</h3>
            <p>{order.shippingAddress.address}, {order.shippingAddress.street}, {order.shippingAddress.city},{order.shippingAddress.state} {order.shippingAddress.country}</p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">You have no orders to display.</p>
      )}
    </div>
  );
};

export default TrackingDetails;
