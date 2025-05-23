export type Product = {
  id: string;
  name: string;
  price: number;
  deliveryUrl: string;
};

export type RowData = {
  id: string;
  products: Product[];
  align: 'start' | 'center' | 'end';
};
