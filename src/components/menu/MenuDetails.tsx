'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddCategoryForm } from "./AddCategoryForm";
import { EditCategoryForm } from "./EditCategoryForm";
import { AddPositionForm } from "./AddPositionForm";
import { EditPositionForm } from "./EditPositionForm";
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Position = {
  id: string;
  name: string;
  price: number;
};

type Category = {
  id: string;
  name: string;
  positions: Position[];
};

type Menu = {
  id: string;
  name: string;
  categories: Category[];
};

type MenuDetailsProps = {
  menu: Menu;
};

export function MenuDetails({ menu: initialMenu }: MenuDetailsProps) {
  const [menu, setMenu] = useState<Menu>(initialMenu);

  const handleAddCategory = (newCategory: Category) => {
    setMenu({ ...menu, categories: [...menu.categories, newCategory] });
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.filter(category => category.id !== categoryId)
    });
  };

  const handleAddPosition = (categoryId: string, newPosition: Position) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => {
        if (category.id === categoryId) {
          return { ...category, positions: [...category.positions, newPosition] };
        }
        return category;
      })
    });
  };

  const handleUpdatePosition = (categoryId: string, updatedPosition: Position) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            positions: category.positions.map(position => 
              position.id === updatedPosition.id ? updatedPosition : position
            )
          };
        }
        return category;
      })
    });
  };

  const handleDeletePosition = (categoryId: string, positionId: string) => {
    setMenu({
      ...menu,
      categories: menu.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            positions: category.positions.filter(position => position.id !== positionId)
          };
        }
        return category;
      })
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{menu.name} Menu</h1>
        <Link href="/admin/menu" passHref>
          <Button variant="outline">Back to Menus</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {menu.categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" className="mr-2">Edit Category</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <EditCategoryForm category={category} onSuccess={handleUpdateCategory} />
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteCategory(category.id)}>Delete Category</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.positions.map(position => (
                  <TableRow key={position.id}>
                    <TableCell>{position.name}</TableCell>
                    <TableCell>${position.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="sm" className="mr-2">Edit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <EditPositionForm position={position} onSuccess={(updatedPosition) => handleUpdatePosition(category.id, updatedPosition)} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeletePosition(category.id, position.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Add Position</Button>
                </DialogTrigger>
                <DialogContent>
                  <AddPositionForm categoryId={category.id} onSuccess={(newPosition) => handleAddPosition(category.id, newPosition)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Category</Button>
          </DialogTrigger>
          <DialogContent>
            <AddCategoryForm menuId={menu.id} onSuccess={handleAddCategory} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}