'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditPositionForm } from "./forms/EditPositionForm";

type Position = {
  id: string;
  name: string;
  price: number;
};

type PositionListProps = {
  categoryId: string;
  positions: Position[];
  onAddPosition: (newPosition: Position) => void;
  onUpdatePosition: (updatedPosition: Position) => void;
  onDeletePosition: (positionId: string) => void;
};

export function PositionList({ categoryId, positions, onAddPosition, onUpdatePosition, onDeletePosition }: PositionListProps) {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Price</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id}>
              <td>{position.name}</td>
              <td>${position.price.toFixed(2)}</td>
              <td className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2" onClick={() => setSelectedPosition(position)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    {selectedPosition && (
                      <EditPositionForm
                        position={selectedPosition}
                        onSuccess={(updatedPosition) => {
                          onUpdatePosition(updatedPosition);
                          setSelectedPosition(null);
                        }}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => onDeletePosition(position.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}