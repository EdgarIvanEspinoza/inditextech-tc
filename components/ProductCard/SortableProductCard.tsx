import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/types';

type Props = {
  product: Product;
  onRemove?: (id: string) => void;
  zoom: number;
  disableDelete: boolean;
};

export const SortableProductCard = ({
  product,
  onRemove,
  zoom,
  disableDelete,
}: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ProductCard
        {...{ product, onRemove, attributes, listeners, zoom, disableDelete }}
      />
    </div>
  );
};
