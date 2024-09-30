'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddMenuForm } from "./forms/AddMenuForm";
import { EditMenuForm } from "./forms/EditMenuForm";


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
        <h1 className="text-3xl font-light text-gray-800">Menu Management</h1>
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Menu Name</TableHead>
              <TableHead className="text-right font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu) => (
              <TableRow key={menu.id}>
                <TableCell className="font-light">{menu.name}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/menu/${menu.id}`} passHref>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 mr-2">View</Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 mr-2">Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <EditMenuForm menu={menu} onSuccess={handleUpdateMenu} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteMenu(menu.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 font-light">Showing 1 to {menus.length} of {menus.length} entries</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}