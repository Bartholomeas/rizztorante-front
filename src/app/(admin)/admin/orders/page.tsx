import { OrdersKanban } from '@/components/orders/OrdersKanban';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-light text-gray-800">Orders Management</h1>
      <OrdersKanban />
    </div>
  );
}