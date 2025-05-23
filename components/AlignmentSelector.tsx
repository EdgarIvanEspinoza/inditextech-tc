'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
} from 'lucide-react';

type Props = {
  value: 'start' | 'center' | 'end';
  onChangeAction: (value: 'start' | 'center' | 'end') => void;
};

export const AlignmentSelector = ({ value, onChangeAction }: Props) => {
  return (
    <div className="relative flex items-center justify-start">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            {value === 'start' ? (
              <AlignHorizontalJustifyStart />
            ) : value === 'center' ? (
              <AlignHorizontalJustifyCenter />
            ) : (
              <AlignHorizontalJustifyEnd />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-15 flex flex-col gap-1">
          {['start', 'center', 'end'].map((option) => (
            <Button
              key={option}
              variant={value === option ? 'default' : 'ghost'}
              onClick={() =>
                onChangeAction(option as 'start' | 'center' | 'end')
              }
            >
              {option === 'start' ? (
                <AlignHorizontalJustifyStart />
              ) : option === 'center' ? (
                <AlignHorizontalJustifyCenter />
              ) : (
                <AlignHorizontalJustifyEnd />
              )}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};
