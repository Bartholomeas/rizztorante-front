export type OrderStatus = 'PENDING' | 'PAID' | 'IN_PROGRESS' | 'IN_DELIVERY' | 'DELIVERED' | 'FINISHED';

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: Date;
  orderStatus: OrderStatus;
  user: {
    name: string;
    email: string;
  };
  cart: {
    items: { name: string; quantity: number }[];
    totalAmount: number;
  };
};