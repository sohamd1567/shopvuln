"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type Order = {
  id: string;
  items: string;
  total: number;
  status: string;
  address: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
};

export default function OrderPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      const response = await fetch(`/api/orders/${params.orderId}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to load order");
        return;
      }

      setOrder(data);
    }

    loadOrder();
  }, [params.orderId]);

  if (error) {
    return <p className="rounded border bg-white p-5 text-red-700">{error}</p>;
  }

  if (!order) {
    return <p className="rounded border bg-white p-5">Loading order...</p>;
  }

  const items = JSON.parse(order.items) as OrderItem[];

  return (
    <div className="rounded border bg-white p-6">
      <h1 className="mb-2 text-3xl font-semibold">Order Details</h1>
      <p className="mb-6 text-sm text-slate-600">Order {order.id}</p>

      <dl className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-slate-600">Customer</dt>
          <dd>{order.user.name} ({order.user.email})</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-600">Status</dt>
          <dd>{order.status}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-600">Date</dt>
          <dd>{new Date(order.createdAt).toLocaleDateString()}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-600">Total</dt>
          <dd>${order.total.toFixed(2)}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-slate-600">Shipping Address</dt>
          <dd>{order.address}</dd>
        </div>
      </dl>

      <h2 className="mb-3 text-xl font-semibold">Items</h2>
      <div className="divide-y rounded border">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between px-4 py-3">
            <span>
              {item.name} x {item.qty}
            </span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
