'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b">
          {/* Mobile Drawer */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu size={24} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[100dvh]">
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <span className="text-2xl font-semibold">Admin Panel</span>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X size={24} />
                </Button>
              </div>
              <Sidebar onClose={() => setOpen(false)} />
            </DrawerContent>
          </Drawer>
          <div className="ml-auto">
            {/* Add user profile or logout button here */}
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}