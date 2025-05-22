'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Product } from '@/types/types';

type ProductCardProps = {
  product: Product;
  onRemove?: (id: string) => void;
};

export const ProductCard = ({ product, onRemove }: ProductCardProps) => {
  return (
    <Card className="relative w-[180px] h-[220px] overflow-hidden">
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/70 hover:bg-white"
          onClick={() => onRemove(product.id)}
        >
          <X className="w-4 h-4" />
        </Button>
      )}

      <CardHeader className="p-0">
        <div className="relative w-full h-[150px]">
          <Image
            src={product.deliveryUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2 text-center">
        <CardTitle className="text-sm font-medium truncate">
          {product.name}
        </CardTitle>
        <p className="text-muted-foreground text-xs mt-1">
          € {(product.price / 100).toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
};
