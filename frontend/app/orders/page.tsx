"use client";

import { useEffect, useState } from "react";
import { useGetUserOrdersQuery } from "@/redux/slices/ordersApiSlice";
import { UserOrders, OrderItem } from "@/types/orders";
import Image from "next/image";

const OrderTrackingPage = () => {
  const { data: orders = [], isLoading, error} = useGetUserOrdersQuery();
  const [message, setMessage] = useState("");
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    if (error) {
      setMessage("There was an error fetching the orders.");
    }
    if (Array.isArray(orders) && orders.length > 0) {
      const urls: { [key: string]: string } = {};
      
      orders.forEach((order: UserOrders) => {
        order.items.forEach((item: OrderItem) => {
          if (item.product.imageUrls && item.product.imageUrls[0]?.data) {
            const IMG = new Blob([new Uint8Array(item.product.imageUrls[0].data)], {
              type: item.product.imageUrls[0].type,
            });
            const url = URL.createObjectURL(IMG);
            urls[item._id] = url;
          }
        });
      });
      
      setImageUrls(urls);
      
      return () => {
        Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [orders, error]);

    if (isLoading) {
      return <p className="text-center text-red-600">Loading...</p>;
    }

    if (error) {
      return <p className="text-center text-red-600">{message}</p>;
    }
    
    return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3x1 font-bold mb-4 text-center">Your Orders</h1>
      <p className="text-center text-gray-600 mb-6">
        Here are your recent orders along with with their curreny status.
        </p>
        
        {orders.length > 0 ? (
          orders.map((order: UserOrders) => (
          <div key={order._id} className="mt-8 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
            <p className="text-gray-600">Status: <span className="font-medium">{order.status}</span></p>
            <p className="text-gray-600">Paid: <span className="font-medium">{order.isPaid ? "Yes" : "No"}</span></p>
            <p className="text-gray-600">Delivered: <span className="font-medium">{order.isDelivered ? "Yes" : "No"}</span></p>            
            <h3 className="text-lg font-medium mt-4">Items: </h3>
            
            <ul className="mt-2 space-y-4">
              {order.items.map((item) => (
                <li key={item._id} className="flex items-start space-x-4">
                  
                    {imageUrls[item._id] && (
                      <Image
                      src={imageUrls[item._id]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-lg shadow-sm"
                      />
                      )}
                      <div>
                        <p className="font-medium text-lg">{item.product.name}</p>
                         <p className="text-sm text-gray-500">{item.product.description}</p>
                      <p className="text-gray-600">
                       Quantity: {item.quantity} &times; ${item.price.toFixed(2)} 
                       </p>
                       </div>
          
                </li>
              ))}
              </ul>
              <p className="mt-4 font-semibold">Total Amount: ${order.total.toFixed(2)}</p>
              <h3 className="text-lg font-medium mt-4">Shipping Address:</h3>
              <p className="text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.street},
                 {order.shippingAddress.city}, {order.shippingAddress.state} 
                 {order.shippingAddress.country}</p>
                 <p className="text-gray-500 mt-2">Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          ))
        ): (
        <p className="text-gray-500 text-center mt-4">You have no orders to display.</p>
        )}
        </div>
      );
    };
    export default OrderTrackingPage;