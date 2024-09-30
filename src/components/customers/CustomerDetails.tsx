'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from 'next/link';

type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
  favoriteItems: { name: string; count: number }[];
  orderHistory: {
    id: string;
    date: Date;
    total: number;
    status: string;
  }[];
};

const mockCustomer: Customer = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  totalOrders: 15,
  totalSpent: 450.50,
  lastOrderDate: new Date('2024-03-15'),
  favoriteItems: [
    { name: 'Pizza Margherita', count: 5 },
    { name: 'Spaghetti Carbonara', count: 3 },
    { name: 'Tiramisu', count: 2 },
  ],
  orderHistory: [
    { id: 'ORD-001', date: new Date('2024-03-15'), total: 35.99, status: 'Delivered' },
    { id: 'ORD-002', date: new Date('2024-03-10'), total: 42.50, status: 'Delivered' },
    { id: 'ORD-003', date: new Date('2024-03-05'), total: 28.75, status: 'Delivered' },
  ],
};

export function CustomerDetails({ customerId }: { customerId: string }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // In a real application, fetch customer data based on customerId
    setCustomer(mockCustomer);
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light text-gray-800">Customer Details</h1>
        <Link href="/admin/customers" passHref>
          <Button variant="outline">Back to Customers</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Last Order Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.lastOrderDate.toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Favorite Items</h2>
        <ul>
          {customer.favoriteItems.map((item, index) => (
            <li key={index}>{item.name} (Ordered {item.count} times)</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Order ID</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Total</TableHead>
              <TableHead className="font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.orderHistory.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date.toLocaleDateString()}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}