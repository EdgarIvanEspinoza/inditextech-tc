'use client';

import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Product } from '@/types/types';
import { SortableProductCard } from '@/components/ProductCard/SortableProductCard';
import { AlignmentSelector } from '@/components/AlignmentSelector';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Label } from '../ui/label';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';

interface Props {
  rowId: string;
  products: Product[];
  align: 'start' | 'center' | 'end';
  onAlignChangeAction: (align: 'start' | 'center' | 'end') => void;
  onDelete?: () => void;
  onAddProduct?: () => void;
  onRemoveProduct?: (productId: string) => void;
  zoom: number;
}

export const SortableRow = ({
  rowId,
  products,
  align,
  onAlignChangeAction,
  onDelete,
  onAddProduct,
  onRemoveProduct,
  zoom,
}: Props) => {
  const {
    setNodeRef: setSortableRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id: rowId });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: rowId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={(node) => {
        setSortableRef(node);
        setDroppableRef(node);
      }}
      style={style}
      className={`w-full border rounded-md p-2 transition-all ${
        isOver ? 'bg-muted/30' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-muted-foreground"
          >
            <GripVertical size={18} />
          </span>
          <AlignmentSelector
            value={align}
            onChangeAction={onAlignChangeAction}
          />
          <span className="text-xs text-muted-foreground">
            <Label>{'Alineación: '}</Label>
            {align === 'start'
              ? 'Izquierda'
              : align === 'center'
              ? 'Centro'
              : 'Derecha'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onAddProduct && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onAddProduct}
                  className="text-green-600 hover:text-green-800"
                >
                  <Plus size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 rounded-md shadow-md">
                <p>Add product</p>
              </TooltipContent>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onDelete}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 rounded-md shadow-md">
                <p>Delete Row</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className={`flex gap-4 justify-${align}`}>
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={horizontalListSortingStrategy}
        >
          {products.map((product) => (
            <SortableProductCard
              disableDelete={products.length === 1}
              key={product.id}
              product={product}
              onRemove={onRemoveProduct}
              zoom={zoom}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
