import { CustomerDetails } from '@/components/customers/CustomerDetails';

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return <CustomerDetails customerId={params.id} />;
}