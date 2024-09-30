import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, ShoppingCart, Users, Settings, MessageSquare } from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Menu Management', href: '/admin/menu', icon: Menu },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Opinions', href: '/admin/opinions', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white text-gray-700 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-light">Stax Food Admin</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-150 ease-in-out ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="font-light">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <p className="text-sm text-gray-400 font-light">© 2024 Stax Food Admin</p>
      </div>
    </div>
  );
}