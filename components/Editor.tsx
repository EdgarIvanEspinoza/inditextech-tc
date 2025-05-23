'use client';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { WOMEN_PANTS_MOCK } from '@/mocks/mocks';
import { Product, RowData } from '@/types/types';
import { ProductCardOverlay } from '@/components/ProductCard/ProductCardOverlay';
import { SortableRow } from '@/components/Row/SortableRow';

export const Editor = () => {
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 'row-1',
      products: WOMEN_PANTS_MOCK.slice(0, 3),
      align: 'start',
    },
    {
      id: 'row-2',
      products: WOMEN_PANTS_MOCK.slice(3, 6),
      align: 'center',
    },
    {
      id: 'row-3',
      products: WOMEN_PANTS_MOCK.slice(6, 10),
      align: 'end',
    },
  ]);

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));
  const isRowId = (id: import('@dnd-kit/core').UniqueIdentifier) =>
    String(id).startsWith('row-');

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const product = rows
      .flatMap((row) => row.products)
      .find((p) => p.id === active.id);

    setActiveProduct(product ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveProduct(null);

    if (!over || active.id === over.id) return;

    if (isRowId(active.id) && isRowId(over.id)) {
      const oldIndex = rows.findIndex((r) => r.id === active.id);
      const newIndex = rows.findIndex((r) => r.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setRows(arrayMove(rows, oldIndex, newIndex));
      }
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const sourceRowIndex = rows.findIndex((row) =>
      row.products.find((p) => p.id === activeId)
    );

    const sourceRow = rows[sourceRowIndex];
    const activeIndex = sourceRow.products.findIndex((p) => p.id === activeId);

    const updatedRows = [...rows];
    const [movedItem] = updatedRows[sourceRowIndex].products.splice(
      activeIndex,
      1
    );

    // Si soltó sobre un producto
    const destinationRowIndex = rows.findIndex((row) =>
      row.products.find((p) => p.id === overId)
    );

    if (destinationRowIndex !== -1) {
      const overIndex = rows[destinationRowIndex].products.findIndex(
        (p) => p.id === overId
      );
      updatedRows[destinationRowIndex].products.splice(overIndex, 0, movedItem);
    } else {
      // Si soltó sobre la fila vacía
      const rowTargetIndex = rows.findIndex((row) => row.id === overId);
      if (rowTargetIndex !== -1) {
        updatedRows[rowTargetIndex].products.push(movedItem);
      } else {
        // Fallback: volver al origen
        updatedRows[sourceRowIndex].products.splice(activeIndex, 0, movedItem);
      }
    }

    setRows(updatedRows);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={rows.map((r) => r.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4 p-8">
          {rows.map((row) => (
            <SortableRow
              key={row.id}
              rowId={row.id}
              products={row.products}
              align={row.align}
              onAlignChangeAction={(newAlign) => {
                setRows((prev) =>
                  prev.map((r) =>
                    r.id === row.id ? { ...r, align: newAlign } : r
                  )
                );
              }}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeProduct ? <ProductCardOverlay product={activeProduct} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
