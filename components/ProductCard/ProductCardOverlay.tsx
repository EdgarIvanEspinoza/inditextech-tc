import { Product } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type Props = {
  product: Product;
};

export function ProductCardOverlay({ product }: Props) {
  return (
    <Card className="w-[180px] h-[260px] opacity-80 pointer-events-none scale-105 shadow-xl">
      <CardHeader className="p-0">
        <div className="relative w-full h-[150px]">
          <Image
            src={product.deliveryUrl}
            alt={product.name}
            fill
            className="object-cover rounded-t-md"
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2 text-center">
        <CardTitle className="text-sm font-medium truncate">
          {product.name}
        </CardTitle>
        <p className="text-muted-foreground text-xs mt-1">
          €{(product.price / 100).toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
