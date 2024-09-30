import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { name: 'Dashboard', href: '/admin' },
  { 
    name: 'Menu', 
    href: '/admin/menu',
    subItems: [
      { name: 'Categories', href: '/admin/menu/categories' },
      { name: 'Items', href: '/admin/menu/items' },
    ]
  },
  { name: 'Orders', href: '/admin/orders' },
  { name: 'Customers', href: '/admin/customers' },
  { name: 'Settings', href: '/admin/settings' },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="h-full bg-white">
      <nav className="mt-4">
        {sidebarItems.map((item) => (
          <div key={item.name}>
            <Link href={item.href} 
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${pathname === item.href ? 'bg-gray-200' : ''}`}
              onClick={onClose}
            >
              <span>{item.name}</span>
              {item.subItems && (
                <ChevronRight size={20} className="ml-auto" />
              )}
            </Link>
            {item.subItems && (
              <div className="ml-4">
                {item.subItems.map((subItem) => (
                  <Link key={subItem.name} href={subItem.href}
                    className={`flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 ${pathname === subItem.href ? 'bg-gray-100' : ''}`}
                    onClick={onClose}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}