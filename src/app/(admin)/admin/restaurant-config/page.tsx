import { RestaurantConfig } from '@/components/restaurant-config/RestaurantConfig';

export default function RestaurantConfigPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-light text-gray-800">Restaurant Configuration</h1>
      <RestaurantConfig />
    </div>
  );
}