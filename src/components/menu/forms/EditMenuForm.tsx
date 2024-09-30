import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, 'Menu name is required'),
});

type FormData = z.infer<typeof formSchema>;

type EditMenuFormProps = {
  menu: { id: string; name: string };
  onSuccess: (updatedMenu: { id: string; name: string }) => void;
};

export function EditMenuForm({ menu, onSuccess }: EditMenuFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: menu.name,
    },
  });

  const onSubmit = (data: FormData) => {
    const updatedMenu = {
      ...menu,
      name: data.name,
    };
    onSuccess(updatedMenu);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Menu Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Menu</Button>
      </form>
    </Form>
  );
}