import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

type EditCategoryFormProps = {
  category: { id: string; name: string };
  onSuccess: () => void;
};

export function EditCategoryForm({ category, onSuccess }: EditCategoryFormProps) {
  const form = useForm({
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async (data: any) => {
    // Implement API call to update category
    console.log('Updating category:', category.id, data);
    onSuccess();
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
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Update Category</Button>
      </form>
    </Form>
  );
}