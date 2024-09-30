import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Order } from './types';
import { OrderDetailsModal } from './OrderDetailsModal';

type SingleOrderProps = {
  order: Order;
  icon: React.ElementType;
};

export function SingleOrder({ order, icon: Icon }: SingleOrderProps) {
  return (
    <Card className="mb-2 bg-white">
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Icon className="mr-2" size={16} />
          {order.orderNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs">{order.user.name}</p>
        <p className="text-xs">{new Date(order.createdAt).toLocaleString()}</p>
        <p className="text-sm font-semibold mt-1">${order.cart.totalAmount.toFixed(2)}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2 w-full" size="sm">View Details</Button>
          </DialogTrigger>
          <OrderDetailsModal order={order} />
        </Dialog>
      </CardContent>
    </Card>
  );
}