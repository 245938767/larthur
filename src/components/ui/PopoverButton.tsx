import { useState } from 'react';
import { CategoryWithCount } from '@/api/categoryApi';

import { clsxm } from '@/lib/helper';

import { Button } from './Button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface UsePopOverButtonProps {
  call: () => void;
  data: CategoryWithCount;
}
const PopOverButton: React.FC<UsePopOverButtonProps> = ({ call, data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <a
            className={clsxm(
              'inline-flex items-center gap-2 justify-center text-sm outline-offset-2 transition active:transition-none',
              'group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
            )}
            href="#"
          >
            Delete
          </a>
        </PopoverTrigger>
        <PopoverContent>
          <div className="mb-4">
            <h1 className="block text-xl text-black dark:text-white">
              Are you sure to delete it
            </h1>
          </div>
          <div className="flex w-full justify-end">
            <Button
              variant="secondary"
              className="hover:text-red-700"
              onClick={async () => {
                await call();
                setOpen(false);
              }}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setOpen(false);
              }}
              className="ml-2 hover:text-black"
            >
              Cancel
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopOverButton;
