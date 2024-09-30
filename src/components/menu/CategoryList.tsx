'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { PositionList } from "./PositionList";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddPositionForm } from "./AddPositionForm";
import { EditCategoryForm } from "./EditCategoryForm";

type Category = {
  id: string;
  name: string;
  // Add other category properties
};

export function CategoryList({ menuId }: { menuId: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddPositionOpen, setIsAddPositionOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);

  useEffect(() => {
    // Fetch categories for the given menuId
    // setCategories(fetchedCategories);
  }, [menuId]);

  const handleDeleteCategory = async (id: string) => {
    // Call API to delete category
    // Update categories state
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="mb-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <Button onClick={() => setSelectedCategory(category)}>View Positions</Button>
          <Button onClick={() => {
            setSelectedCategory(category);
            setIsEditCategoryOpen(true);
          }}>Edit</Button>
          <Button variant="destructive" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
          
          {selectedCategory?.id === category.id && (
            <div className="mt-4">
              <Dialog open={isAddPositionOpen} onOpenChange={setIsAddPositionOpen}>
                <DialogTrigger asChild>
                  <Button>Add Position</Button>
                </DialogTrigger>
                <DialogContent>
                  <AddPositionForm categoryId={category.id} onSuccess={() => setIsAddPositionOpen(false)} />
                </DialogContent>
              </Dialog>
              <PositionList categoryId={category.id} />
            </div>
          )}
        </div>
      ))}

      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent>
          {selectedCategory && (
            <EditCategoryForm category={selectedCategory} onSuccess={() => setIsEditCategoryOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}