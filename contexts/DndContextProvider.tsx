import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { ReactNode } from 'react';

type DndContextProviderProps = {
  children: ReactNode;
  onDragEnd?: Parameters<typeof DndContext>[0]['onDragEnd'];
};

export const DndContextProvider = ({
  children,
  onDragEnd,
}: DndContextProviderProps) => {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  );
};
