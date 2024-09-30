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

type AddMenuFormProps = {
  onSuccess: (newMenu: { id: string; name: string; categories: []; }) => void;
};

export function AddMenuForm({ onSuccess }: AddMenuFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: FormData) => {
    const newMenu = {
      id: Date.now().toString(), // This is a temporary ID. In a real app, this would come from the backend.
      name: data.name,
      categories: [],
    };
    onSuccess(newMenu);
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
                <Input placeholder="Enter menu name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Menu</Button>
      </form>
    </Form>
  );
}