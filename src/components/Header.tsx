import { Calendar } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-stone-900 border-b border-stone-800 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-orange-500">HealthTick</h1>
        </div>
        <p className="text-stone-400">Calendar Management System</p>
      </div>
    </header>
  );
}
