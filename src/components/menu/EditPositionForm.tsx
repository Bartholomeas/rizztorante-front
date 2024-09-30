import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, 'Position name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
});

type FormData = z.infer<typeof formSchema>;

type EditPositionFormProps = {
  position: { id: string; name: string; price: number };
  onSuccess: (updatedPosition: { id: string; name: string; price: number }) => void;
};

export function EditPositionForm({ position, onSuccess }: EditPositionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: position.name,
      price: position.price,
    },
  });

  const onSubmit = (data: FormData) => {
    const updatedPosition = {
      id: position.id, // Ensure we're passing the id
      name: data.name,
      price: data.price,
    };
    onSuccess(updatedPosition);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Position</Button>
      </form>
    </Form>
  );
}