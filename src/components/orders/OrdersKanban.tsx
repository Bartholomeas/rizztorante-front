'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatBox } from './StatBox';
import { OrderCategory } from './OrderCategory';
import { Order, OrderStatus } from './types';
import { orderStatuses } from './config';
import { Star } from 'lucide-react';
import { HistoricalOrdersTable } from './HistoricalOrdersTable';

export function OrdersKanban() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [historicalOrders, setHistoricalOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch orders from API
    // For now, we'll use mock data
    const mockOrders = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        createdAt: new Date('2024-03-15T10:30:00'),
        orderStatus: 'PENDING',
        user: { name: 'John Doe', email: 'john@example.com' },
        cart: {
          items: [{ name: 'Pizza', quantity: 1 }, { name: 'Coke', quantity: 2 }],
          totalAmount: 25.99
        }
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        createdAt: new Date('2024-03-15T11:15:00'),
        orderStatus: 'PAID',
        user: { name: 'Jane Smith', email: 'jane@example.com' },
        cart: {
          items: [{ name: 'Burger', quantity: 1 }, { name: 'Fries', quantity: 1 }],
          totalAmount: 15.99
        }
      },
      {
        id: '3',
        orderNumber: 'ORD-003',
        createdAt: new Date('2024-03-15T12:00:00'),
        orderStatus: 'IN_PROGRESS',
        user: { name: 'Bob Johnson', email: 'bob@example.com' },
        cart: {
          items: [{ name: 'Salad', quantity: 1 }, { name: 'Water', quantity: 1 }],
          totalAmount: 12.99
        }
      },
    ];

    // Filter orders: active are pending or today's orders, historical are completed before today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setActiveOrders(mockOrders.filter(order => 
      order.orderStatus !== 'FINISHED' || new Date(order.createdAt) >= today
    ));

    setHistoricalOrders(mockOrders.filter(order => 
      order.orderStatus === 'FINISHED' && new Date(order.createdAt) < today
    ));
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newOrders = Array.from(activeOrders);
    const movedOrder = newOrders.find(order => order.id === draggableId);
    if (movedOrder) {
      movedOrder.orderStatus = destination.droppableId as OrderStatus;
    }

    setActiveOrders(newOrders);
    // Here you would also update the order status in your backend
  };

  const getTodayStats = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const todayOrders = activeOrders.filter(order => new Date(order.createdAt).setHours(0, 0, 0, 0) === today);
    return {
      inProgress: todayOrders.filter(order => ['PAID', 'IN_PROGRESS', 'IN_DELIVERY'].includes(order.orderStatus)).length,
      finished: todayOrders.filter(order => order.orderStatus === 'FINISHED').length,
      total: todayOrders.length,
    };
  };

  const stats = getTodayStats();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatBox title="Today's In Progress" value={stats.inProgress} icon={<Star className="h-4 w-4 text-yellow-500" />} />
        <StatBox title="Today's Finished" value={stats.finished} icon={<Star className="h-4 w-4 text-green-500" />} />
        <StatBox title="Today's Total Orders" value={stats.total} icon={<Star className="h-4 w-4 text-blue-500" />} />
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="historical">Historical Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {orderStatuses.map(status => (
                <OrderCategory
                  key={status}
                  status={status}
                  orders={activeOrders.filter(order => order.orderStatus === status)}
                />
              ))}
            </div>
          </DragDropContext>
        </TabsContent>
        <TabsContent value="historical">
          <HistoricalOrdersTable orders={historicalOrders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}