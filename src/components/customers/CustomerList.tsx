'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
};

const mockCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', totalOrders: 15, totalSpent: 450.50, lastOrderDate: new Date('2024-03-15') },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', totalOrders: 8, totalSpent: 275.25, lastOrderDate: new Date('2024-03-10') },
];

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <Select defaultValue="20">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Show 10</SelectItem>
            <SelectItem value="20">Show 20</SelectItem>
            <SelectItem value="50">Show 50</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search customers" className="max-w-sm" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Email</TableHead>
              <TableHead className="font-medium">Total Orders</TableHead>
              <TableHead className="font-medium">Total Spent</TableHead>
              <TableHead className="font-medium">Last Order</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.totalOrders}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastOrderDate.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/customers/${customer.id}`} passHref>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 font-light">Showing 1 to {customers.length} of {customers.length} entries</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}