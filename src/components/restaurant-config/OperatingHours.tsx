'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OperatingHourForm } from './OperatingHourForm';

type OperatingHour = {
  id: string;
  dayOfWeek: number;
  isClosed: boolean;
  isFullDay: boolean;
  openingTime: string;
  closingTime: string;
};

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function OperatingHours() {
  const [operatingHours, setOperatingHours] = useState<OperatingHour[]>([]);

  const handleAddOperatingHour = (newHour: OperatingHour) => {
    setOperatingHours([...operatingHours, newHour]);
  };

  const handleUpdateOperatingHour = (updatedHour: OperatingHour) => {
    setOperatingHours(operatingHours.map(hour => 
      hour.id === updatedHour.id ? updatedHour : hour
    ));
  };

  const handleDeleteOperatingHour = (id: string) => {
    setOperatingHours(operatingHours.filter(hour => hour.id !== id));
  };

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Operating Hour</Button>
        </DialogTrigger>
        <DialogContent>
          <OperatingHourForm onSuccess={handleAddOperatingHour} />
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Opening Time</TableHead>
            <TableHead>Closing Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {operatingHours.map((hour) => (
            <TableRow key={hour.id}>
              <TableCell>{daysOfWeek[hour.dayOfWeek]}</TableCell>
              <TableCell>{hour.isClosed ? 'Closed' : hour.isFullDay ? 'Open 24h' : 'Open'}</TableCell>
              <TableCell>{hour.isClosed ? '-' : hour.isFullDay ? '00:00' : hour.openingTime}</TableCell>
              <TableCell>{hour.isClosed ? '-' : hour.isFullDay ? '24:00' : hour.closingTime}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <OperatingHourForm operatingHour={hour} onSuccess={handleUpdateOperatingHour} />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteOperatingHour(hour.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}