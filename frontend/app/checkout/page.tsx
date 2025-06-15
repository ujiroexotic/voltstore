"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/redux/slices/ordersApiSlice";
import { useCart } from "@/components/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cartItems } = useCart();

  const [total, setTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    state: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    const calcTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(calcTotal);
  }, [cartItems]);

  const handleConfirmOrder = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      }));

      const result = await createOrder({
        items: orderItems,
        total,
        shippingAddress,
        paymentInfo,
      }).unwrap();

      console.log("Order created:", result);
      router.push("/orders");
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              {[
                "address",
                "city",
                "state",
                "postalCode",
                "street",
                "country",
              ].map((field) => (
                <Input
                  key={field}
                  type="text"
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  className="mb-2"
                  value={shippingAddress[field as keyof typeof shippingAddress]}
                  onChange={(e) =>
                    setShippingAddress((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                />
              ))}
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Cardholder's Name"
                className="mb-2"
                value={paymentInfo.cardholderName}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cardholderName: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Card Number"
                className="mb-2"
                value={paymentInfo.cardNumber}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Expiration Date (MM/YY)"
                className="mb-2"
                value={paymentInfo.expirationDate}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    expirationDate: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="CVV"
                className="mb-2"
                value={paymentInfo.cvv}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cvv: e.target.value,
                  }))
                }
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleConfirmOrder}
                disabled={isLoading || cartItems.length === 0}
              >
                {isLoading ? "Placing Order..." : "Confirm Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="flex items-center justify-center h-16 border-t p-4">
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-gray-700 mx-2"
          prefetch={false}
        >
          Terms of Service
        </Link>
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-gray-700 mx-2"
          prefetch={false}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className="text-sm text-gray-500 hover:text-gray-700 mx-2"
          prefetch={false}
        >
          Contact Us
        </Link>
      </footer>
    </div>
  );
}

