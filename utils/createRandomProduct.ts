import { v4 as uuid } from 'uuid';
import { WOMEN_PANTS_MOCK } from '@/mocks/mocks';

export const createRandomProduct = () => {
  const random =
    WOMEN_PANTS_MOCK[Math.floor(Math.random() * WOMEN_PANTS_MOCK.length)];
  const product = { ...random, id: `product-${uuid()}` };
  return product;
};
