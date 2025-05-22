'use client';

import { ProductCard } from '@/components/ProductCard/ProductCard';
import { WOMEN_PANTS_MOCK } from '@/mocks/mocks';

export default function Home() {
  const handleRemove = (id: string) => {
    console.log(`Product with id ${id} removed`);
  };
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {WOMEN_PANTS_MOCK.map((product) => {
        return (
          <ProductCard
            product={product}
            key={product.id}
            onRemove={handleRemove}
          />
        );
      })}
    </div>
  );
}
