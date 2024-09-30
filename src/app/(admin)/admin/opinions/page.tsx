import { OpinionList } from '@/components/opinions/OpinionList';

export default function OpinionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-light text-gray-800">Opinions Management</h1>
      <OpinionList />
    </div>
  );
}