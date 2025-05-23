'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Product } from '@/types/types';
import { SortableProductCard } from '../ProductCard/SortableProductCard';
import { AlignmentSelector } from '../AlignmentSelector';
import { GripVertical } from 'lucide-react';

type SortableRowProps = {
  rowId: string;
  products: Product[];
  align: 'start' | 'center' | 'end';
  onAlignChangeAction: (align: 'start' | 'center' | 'end') => void;
};
export const SortableRow = ({
  rowId,
  products,
  align,
  onAlignChangeAction,
}: SortableRowProps) => {
  const {
    setNodeRef: setRowRef,
    transform,
    transition,
    attributes,
    listeners,
  } = useSortable({ id: rowId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { setNodeRef: setDroppableRef } = useDroppable({ id: rowId });

  return (
    <div className="border rounded-md gap-4 p-2">
      <AlignmentSelector value={align} onChangeAction={onAlignChangeAction} />
      <div
        ref={(node) => {
          setRowRef(node);
          setDroppableRef(node);
        }}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative flex w-full gap-4 p-2 min-h-[260px] justify-${align} transition-all`}
      >
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          {products.map((product) => (
            <SortableProductCard key={product.id} product={product} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
