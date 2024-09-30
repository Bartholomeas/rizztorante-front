import { Clock, DollarSign, Utensils, Truck, CheckCircle, XCircle } from 'lucide-react';
import { OrderStatus } from './types';

export const orderStatuses: OrderStatus[] = ['PENDING', 'PAID', 'IN_PROGRESS', 'IN_DELIVERY', 'DELIVERED', 'FINISHED'];

export const statusConfig = {
  PENDING: { color: 'bg-yellow-50', icon: Clock },
  PAID: { color: 'bg-green-50', icon: DollarSign },
  IN_PROGRESS: { color: 'bg-blue-50', icon: Utensils },
  IN_DELIVERY: { color: 'bg-purple-50', icon: Truck },
  DELIVERED: { color: 'bg-indigo-50', icon: CheckCircle },
  FINISHED: { color: 'bg-gray-50', icon: XCircle },
};