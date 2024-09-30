import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  dayOfWeek: z.string().min(1, 'Day of week is required'),
  isClosed: z.boolean(),
  isFullDay: z.boolean(),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type OperatingHourFormProps = {
  operatingHour?: {
    id: string;
    dayOfWeek: number;
    isClosed: boolean;
    isFullDay: boolean;
    openingTime: string;
    closingTime: string;
  };
  onSuccess: (data: FormData & { id: string }) => void;
};

export function OperatingHourForm({ operatingHour, onSuccess }: OperatingHourFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: operatingHour ? {
      dayOfWeek: operatingHour.dayOfWeek.toString(),
      isClosed: operatingHour.isClosed,
      isFullDay: operatingHour.isFullDay,
      openingTime: operatingHour.openingTime,
      closingTime: operatingHour.closingTime,
    } : {
      dayOfWeek: '',
      isClosed: false,
      isFullDay: false,
      openingTime: '',
      closingTime: '',
    },
  });

  const onSubmit = (data: FormData) => {
    onSuccess({
      ...data,
      id: operatingHour?.id || Date.now().toString(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="dayOfWeek"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day of Week</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                    <SelectItem key={index} value={index.toString()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          name="isFullDay"
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
                  Open 24 hours
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
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}