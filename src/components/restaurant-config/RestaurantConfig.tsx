'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OperatingHours } from './OperatingHours';
import { SpecialDates } from './SpecialDates';

export function RestaurantConfig() {
  return (
    <Tabs defaultValue="operating-hours">
      <TabsList>
        <TabsTrigger value="operating-hours">Operating Hours</TabsTrigger>
        <TabsTrigger value="special-dates">Special Dates</TabsTrigger>
      </TabsList>
      <TabsContent value="operating-hours">
        <OperatingHours />
      </TabsContent>
      <TabsContent value="special-dates">
        <SpecialDates />
      </TabsContent>
    </Tabs>
  );
}