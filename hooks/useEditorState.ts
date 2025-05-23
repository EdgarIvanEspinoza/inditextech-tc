'use client';

import { useState } from 'react';
import { Product } from '@/types/types';
import { v4 as uuid } from 'uuid';
import { WOMEN_PANTS_MOCK } from '@/mocks/mocks';

export type Align = 'start' | 'center' | 'end';

export type RowData = {
  id: string;
  products: Product[];
  align: Align;
};

export function useEditorState() {
  const [rows, setRows] = useState<RowData[]>([
    {
      id: 'row-1',
      products: WOMEN_PANTS_MOCK.slice(0, 3),
      align: 'start',
    },
    {
      id: 'row-2',
      products: WOMEN_PANTS_MOCK.slice(3, 6),
      align: 'center',
    },
    {
      id: 'row-3',
      products: WOMEN_PANTS_MOCK.slice(6, 10),
      align: 'end',
    },
  ]);

  const addRow = () => {
    setRows((prev) => [...prev, { id: uuid(), products: [], align: 'center' }]);
  };

  const removeRow = (rowId: string) => {
    setRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  const updateRowAlign = (rowId: string, align: Align) => {
    setRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, align } : r)));
  };

  const addProductToRow = (rowId: string, product: Product) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId && r.products.length < 3
          ? { ...r, products: [...r.products, product] }
          : r
      )
    );
  };

  const removeProduct = (productId: string) => {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        products: r.products.filter((p) => p.id !== productId),
      }))
    );
  };

  const moveProduct = (activeId: string, overId: string | null) => {
    if (!overId || activeId === overId) return;

    const sourceRowIndex = rows.findIndex((row) =>
      row.products.find((p) => p.id === activeId)
    );
    const destinationRowIndex = rows.findIndex((row) =>
      row.products.find((p) => p.id === overId)
    );

    if (sourceRowIndex === -1 || destinationRowIndex === -1) return;

    const sourceRow = rows[sourceRowIndex];
    const destRow = rows[destinationRowIndex];
    const activeIndex = sourceRow.products.findIndex((p) => p.id === activeId);
    const overIndex = destRow.products.findIndex((p) => p.id === overId);

    const updatedRows = [...rows];
    const [moved] = updatedRows[sourceRowIndex].products.splice(activeIndex, 1);
    updatedRows[destinationRowIndex].products.splice(overIndex, 0, moved);

    setRows(updatedRows);
  };

  const moveProductToRow = (productId: string, targetRowId: string) => {
    const sourceRowIndex = rows.findIndex((row) =>
      row.products.find((p) => p.id === productId)
    );
    const destRowIndex = rows.findIndex((row) => row.id === targetRowId);

    if (sourceRowIndex === -1 || destRowIndex === -1) return;

    const updatedRows = [...rows];
    const sourceProducts = updatedRows[sourceRowIndex].products;
    const productIndex = sourceProducts.findIndex((p) => p.id === productId);
    const [movedProduct] = sourceProducts.splice(productIndex, 1);

    updatedRows[destRowIndex].products.push(movedProduct);
    setRows(updatedRows);
  };

  const reorderRows = (activeId: string, overId: string) => {
    const oldIndex = rows.findIndex((r) => r.id === activeId);
    const newIndex = rows.findIndex((r) => r.id === overId);

    if (oldIndex !== -1 && newIndex !== -1) {
      setRows((prev) => {
        const copy = [...prev];
        const [moved] = copy.splice(oldIndex, 1);
        copy.splice(newIndex, 0, moved);
        return copy;
      });
    }
  };

  return {
    rows,
    addRow,
    removeRow,
    updateRowAlign,
    addProductToRow,
    removeProduct,
    moveProduct,
    moveProductToRow,
    reorderRows,
    setRows,
  };
}
