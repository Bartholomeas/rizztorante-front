import { CustomerList } from '@/components/customers/CustomerList';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-light text-gray-800">Customer Management</h1>
      <CustomerList />
    </div>
  );
}