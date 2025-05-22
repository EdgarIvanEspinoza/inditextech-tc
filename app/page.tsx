'use client';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableProductCard } from '@/components/ProductCard/SortableProductCard';
import { WOMEN_PANTS_MOCK } from '@/mocks/mocks';
import { Product } from '@/types/types';

type RowData = {
  id: string;
  products: Product[];
};

export default function Home() {
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 'row-1',
      products: WOMEN_PANTS_MOCK.slice(0, 3),
    },
    {
      id: 'row-2',
      products: WOMEN_PANTS_MOCK.slice(3, 6),
    },
    {
      id: 'row-3',
      products: WOMEN_PANTS_MOCK.slice(6, 10),
    },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let sourceRowIndex = -1;
    let destinationRowIndex = -1;

    rows.forEach((row, index) => {
      if (row.products.find((p) => p.id === active.id)) sourceRowIndex = index;
      if (row.products.find((p) => p.id === over.id))
        destinationRowIndex = index;
    });

    if (sourceRowIndex === -1 || destinationRowIndex === -1) return;

    const sourceRow = rows[sourceRowIndex];
    const destRow = rows[destinationRowIndex];

    const activeIndex = sourceRow.products.findIndex((p) => p.id === active.id);
    const overIndex = destRow.products.findIndex((p) => p.id === over.id);

    let updatedRows = [...rows];

    const [movedItem] = updatedRows[sourceRowIndex].products.splice(
      activeIndex,
      1
    );
    updatedRows[destinationRowIndex].products.splice(overIndex, 0, movedItem);

    setRows(updatedRows);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="space-y-4 p-4">
        {rows.map((row) => (
          <SortableContext
            key={row.id}
            items={row.products.map((p) => p.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-4 p-2 border rounded-md min-h-[260px]">
              {row.products.map((product) => (
                <SortableProductCard key={product.id} product={product} />
              ))}
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
