import { Product } from '@/types/types';
import { useDroppable } from '@dnd-kit/core';
import { SortableProductCard } from '../ProductCard/SortableProductCard';

type RowProps = {
  rowId: string;
  products: Product[];
};

export const DroppableRow = ({ rowId, products }: RowProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: rowId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-full gap-4 p-2 border rounded-md min-h-[260px] justify-center transition-all ${
        isOver ? 'bg-gray-100' : ''
      }`}
    >
      {products.map((product) => (
        <SortableProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
