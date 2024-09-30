import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  isClosed: z.boolean(),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type SpecialDateFormProps = {
  specialDate?: {
    id: string;
    date: string;
    isClosed: boolean;
    openingTime: string | null;
    closingTime: string | null;
    description: string | null;
  };
  onSuccess: (data: FormData & { id: string }) => void;
};

export function SpecialDateForm({ specialDate, onSuccess }: SpecialDateFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: specialDate ? {
      date: specialDate.date,
      isClosed: specialDate.isClosed,
      openingTime: specialDate.openingTime || undefined,
      closingTime: specialDate.closingTime || undefined,
      description: specialDate.description || undefined,
    } : {
      date: '',
      isClosed: false,
      openingTime: '',
      closingTime: '',
      description: '',
    },
  });

  const onSubmit = (data: FormData) => {
    onSuccess({
      ...data,
      id: specialDate?.id || Date.now().toString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isClosed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Closed
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opening Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="closingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Closing Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}