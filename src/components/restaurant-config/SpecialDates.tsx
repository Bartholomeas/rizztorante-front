'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SpecialDateForm } from './SpecialDateForm';

type SpecialDate = {
  id: string;
  date: string;
  isClosed: boolean;
  openingTime: string | null;
  closingTime: string | null;
  description: string | null;
};

export function SpecialDates() {
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>([]);

  const handleAddSpecialDate = (newDate: SpecialDate) => {
    setSpecialDates([...specialDates, newDate]);
  };

  const handleUpdateSpecialDate = (updatedDate: SpecialDate) => {
    setSpecialDates(specialDates.map(date => 
      date.id === updatedDate.id ? updatedDate : date
    ));
  };

  const handleDeleteSpecialDate = (id: string) => {
    setSpecialDates(specialDates.filter(date => date.id !== id));
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Special Date</Button>
        </DialogTrigger>
        <DialogContent>
          <SpecialDateForm onSuccess={handleAddSpecialDate} />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Opening Time</TableHead>
            <TableHead>Closing Time</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialDates.map((date) => (
            <TableRow key={date.id}>
              <TableCell>{date.date}</TableCell>
              <TableCell>{date.isClosed ? 'Closed' : 'Open'}</TableCell>
              <TableCell>{date.isClosed ? '-' : date.openingTime}</TableCell>
              <TableCell>{date.isClosed ? '-' : date.closingTime}</TableCell>
              <TableCell>{date.description}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <SpecialDateForm specialDate={date} onSuccess={handleUpdateSpecialDate} />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteSpecialDate(date.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}