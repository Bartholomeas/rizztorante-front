'use client';

import { useParams } from 'next/navigation';
import { MenuDetails } from '@/components/menu/MenuDetails';

// Mock data - replace with actual API call in a real application
const mockMenu = {
  id: '1',
  name: 'Italian',
  categories: [
    {
      id: '1',
      name: 'Pizza',
      positions: [
        { id: '1', name: 'Margherita', price: 10 },
        { id: '2', name: 'Pepperoni', price: 12 },
      ],
    },
    {
      id: '2',
      name: 'Pasta',
      positions: [
        { id: '3', name: 'Spaghetti Carbonara', price: 14 },
        { id: '4', name: 'Penne Arrabbiata', price: 13 },
      ],
    },
  ],
};

export default function MenuDetailsPage() {
  const params = useParams();
  const menuId = params.id as string;

  // In a real application, you would fetch the menu data based on the menuId
  // For now, we'll use the mock data
  const menu = mockMenu;

  return <MenuDetails menu={menu} />;
}