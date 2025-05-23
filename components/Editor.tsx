'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { ProductCardOverlay } from '@/components/ProductCard/ProductCardOverlay';
import { Button } from '@/components/ui/button';
import { useEditorState } from '@/hooks/useEditorState';
import { SortableRow } from './Row/SortableRow';
import { createRandomProduct } from '@/utils/createRandomProduct';

export const Editor = () => {
  const {
    rows,
    addRow,
    updateRowAlign,
    moveProduct,
    moveProductToRow,
    reorderRows,
    removeRow,
    addProductToRow,
    removeProduct,
  } = useEditorState();

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () =>
    setZoom((z) => Math.min(Number(z.toFixed(2)) + 0.1, 1.5));
  const handleZoomOut = () =>
    setZoom((z) => Math.max(Number(z.toFixed(2)) - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1);

  const activeProduct =
    rows.flatMap((r) => r.products).find((p) => p.id === activeProductId) ||
    null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveProductId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveProductId(null);
      return;
    }

    const isRow = (id: string) => id.startsWith('row-');

    if (isRow(active.id as string) && isRow(over.id as string)) {
      reorderRows(active.id as string, over.id as string);
    } else if (!isRow(active.id as string) && !isRow(over.id as string)) {
      moveProduct(active.id as string, over.id as string);
    } else if (!isRow(active.id as string) && isRow(over.id as string)) {
      moveProductToRow(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-2 items-center justify-end mb-4">
        {zoom !== 1 && (
          <Button variant="ghost" onClick={handleZoomReset} size="sm">
            Reset
          </Button>
        )}
        <Button variant="ghost" onClick={handleZoomOut} size="sm">
          −
        </Button>
        <span className="text-sm w-12 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button variant="ghost" onClick={handleZoomIn} size="sm">
          +
        </Button>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <Button onClick={addRow}>+ Añadir fila</Button>
        </div>

        <SortableContext
          items={rows.map((r) => r.id)}
          strategy={verticalListSortingStrategy}
        >
          {rows.map((row) => (
            <SortableRow
              key={row.id}
              rowId={row.id}
              products={row.products}
              align={row.align}
              onAlignChangeAction={(align) => updateRowAlign(row.id, align)}
              onDelete={() => removeRow(row.id)}
              onAddProduct={() => {
                addProductToRow(row.id, createRandomProduct());
              }}
              onRemoveProduct={(productId) => removeProduct(productId)}
              zoom={zoom}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay dropAnimation={{ duration: 150, easing: 'ease' }}>
        {activeProduct ? <ProductCardOverlay product={activeProduct} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
