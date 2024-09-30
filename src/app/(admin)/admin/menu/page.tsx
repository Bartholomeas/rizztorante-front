'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MenuList } from "@/components/menu/MenuList";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddMenuForm } from "@/components/menu/forms/AddMenuForm";

export default function MenuPage() {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
      <Dialog open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
        <DialogTrigger asChild>
          <Button>Add New Menu</Button>
        </DialogTrigger>
        <DialogContent>
          <AddMenuForm onSuccess={() => setIsAddMenuOpen(false)} />
        </DialogContent>
      </Dialog>
      <MenuList />
    </div>
  );
}