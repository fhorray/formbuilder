import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <div className="flex items-start justify-between p-6 border-b bg-white">
      <div>
        <h1 className="text-lg font-semibold">Form Builder</h1>
        <p className="text-sm text-gray-500">
          Add and customize forms for your needs
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <XIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};
