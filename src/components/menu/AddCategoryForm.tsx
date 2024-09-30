import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

type FormData = z.infer<typeof formSchema>;

type AddCategoryFormProps = {
  menuId: string;
  onSuccess: (newCategory: { id: string; name: string; positions: [] }) => void;
};

export function AddCategoryForm({ menuId, onSuccess }: AddCategoryFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: FormData) => {
    const newCategory = {
      id: Date.now().toString(), // This is a temporary ID. In a real app, this would come from the backend.
      name: data.name,
      positions: [],
    };
    onSuccess(newCategory);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Category</Button>
      </form>
    </Form>
  );
}