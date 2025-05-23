'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Product } from '@/types/types';

type ProductCardProps = {
  product: Product;
  onRemove?: (id: string) => void;
  attributes?: any;
  listeners?: any;
  zoom: number;
  disableDelete: boolean;
};

export const ProductCard = ({
  product,
  onRemove,
  attributes,
  listeners,
  zoom,
  disableDelete,
}: ProductCardProps) => {
  return (
    <Card
      className="flex-col relative overflow-hidden transition-all duration-200 ease-in-out shadow-md hover:shadow-lg rounded-md cursor-pointer"
      style={{
        width: `${180 * zoom}px`,
        height: `${220 * zoom}px`,
      }}
    >
      {onRemove && !disableDelete && (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onRemove?.(product.id)}
          className="absolute top-1 right-1 text-red-500 hover:text-red-700 z-10 bg-white/50"
        >
          <X size={14} />
        </Button>
      )}
      <CardHeader className="p-0 h-[70%]" {...attributes} {...listeners}>
        <div className="relative w-full h-full">
          <Image
            src={product.deliveryUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent
        className="px-4 py-2 text-center"
        {...attributes}
        {...listeners}
      >
        <CardTitle
          className="font-medium truncate h-[30%]"
          style={{
            fontSize: `${14 * zoom}px`,
            lineHeight: `${18 * zoom}px`,
          }}
        >
          {product.name}
        </CardTitle>

        <p
          className="text-muted-foreground mt-1"
          style={{
            fontSize: `${12 * zoom}px`,
            lineHeight: `${14 * zoom}px`,
          }}
        >
          € {(product.price / 100).toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};
