import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Order } from './types';

type OrderDetailsModalProps = {
  order: Order;
};

export function OrderDetailsModal({ order }: OrderDetailsModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Order Details: {order.orderNumber}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <h3 className="font-semibold">Customer Information</h3>
        <p>Name: {order.user.name}</p>
        <p>Email: {order.user.email}</p>
        <h3 className="font-semibold mt-4">Order Items</h3>
        <ul>
          {order.cart.items.map((item, index) => (
            <li key={index}>{item.name} x{item.quantity}</li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">Total: ${order.cart.totalAmount.toFixed(2)}</p>
      </div>
    </DialogContent>
  );
}