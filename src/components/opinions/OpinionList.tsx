'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditOpinionForm } from "./forms/EditOpinionForm";

type Opinion = {
  id: string;
  userEmail: string;
  userName: string;
  rating: number;
  description: string;
  imageUrl: string;
  isApproved: boolean;
};

const mockOpinions: Opinion[] = [
  { id: '1', userEmail: 'user1@example.com', userName: 'John Doe', rating: 4, description: 'Great food! The atmosphere was wonderful and the service was top-notch. I especially loved the pasta dishes.', imageUrl: 'https://example.com/image1.jpg', isApproved: false },
  { id: '2', userEmail: 'user2@example.com', userName: 'Jane Smith', rating: 5, description: 'Excellent service! The staff was very attentive and the food was delicious. I highly recommend the chef\'s special.', imageUrl: 'https://example.com/image2.jpg', isApproved: true },
];

export function OpinionList() {
  const [opinions, setOpinions] = useState<Opinion[]>(mockOpinions);

  const handleApprove = (id: string) => {
    setOpinions(opinions.map(opinion => 
      opinion.id === id ? { ...opinion, isApproved: true } : opinion
    ));
  };

  const handleDisapprove = (id: string) => {
    setOpinions(opinions.map(opinion => 
      opinion.id === id ? { ...opinion, isApproved: false } : opinion
    ));
  };

  const handleDelete = (id: string) => {
    setOpinions(opinions.filter(opinion => opinion.id !== id));
  };

  const averageRating = opinions.reduce((sum, opinion) => sum + opinion.rating, 0) / opinions.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opinions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opinions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opinions.filter(o => !o.isApproved).length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4 mb-6">
        <Select defaultValue="20">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Show" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Show 10</SelectItem>
            <SelectItem value="20">Show 20</SelectItem>
            <SelectItem value="50">Show 50</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Search opinions" className="max-w-sm" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">User</TableHead>
              <TableHead className="font-medium">Rating</TableHead>
              <TableHead className="font-medium">Opinion</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opinions.map((opinion) => (
              <TableRow key={opinion.id}>
                <TableCell>
                  <div>{opinion.userName}</div>
                  <div className="text-sm text-gray-500">{opinion.userEmail}</div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={i < opinion.rating ? "text-yellow-400" : "text-gray-300"} size={16} />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs overflow-hidden text-ellipsis">
                    <img src={opinion.imageUrl} alt="Opinion" className="w-16 h-16 object-cover rounded float-left mr-2 mb-2" />
                    {opinion.description}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${opinion.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {opinion.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  {!opinion.isApproved && (
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 mr-2" onClick={() => handleApprove(opinion.id)}>
                      Approve
                    </Button>
                  )}
                  {opinion.isApproved && (
                    <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 mr-2" onClick={() => handleDisapprove(opinion.id)}>
                      Disapprove
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(opinion.id)}>
                    <Trash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 font-light">Showing 1 to {opinions.length} of {opinions.length} entries</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}