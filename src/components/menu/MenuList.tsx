'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddMenuForm } from "./AddMenuForm";
import { EditMenuForm } from "./EditMenuForm";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Menu = {
  id: string;
  name: string;
};

const mockMenus: Menu[] = [
  { id: '1', name: 'Italian' },
  { id: '2', name: 'Mexican' },
];

export function MenuList() {
  const [menus, setMenus] = useState<Menu[]>(mockMenus);

  const handleAddMenu = (newMenu: Menu) => {
    setMenus([...menus, newMenu]);
  };

  const handleUpdateMenu = (updatedMenu: Menu) => {
    setMenus(menus.map(menu => menu.id === updatedMenu.id ? updatedMenu : menu));
  };

  const handleDeleteMenu = (menuId: string) => {
    setMenus(menus.filter(menu => menu.id !== menuId));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Menu</Button>
          </DialogTrigger>
          <DialogContent>
            <AddMenuForm onSuccess={handleAddMenu} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 mb-6">
        <Select defaultValue="20">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Show 10</SelectItem>
            <SelectItem value="20">Show 20</SelectItem>
            <SelectItem value="50">Show 50</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search menu" className="max-w-sm" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Menu Name</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu) => (
              <TableRow key={menu.id}>
                <TableCell className="font-medium">{menu.name}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/menu/${menu.id}`} passHref>
                    <Button variant="secondary" size="sm" className="mr-2">View</Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <EditMenuForm menu={menu} onSuccess={handleUpdateMenu} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteMenu(menu.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Showing 1 to {menus.length} of {menus.length} entries</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}