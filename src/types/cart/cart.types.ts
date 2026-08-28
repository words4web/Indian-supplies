export interface CartItemProduct {
  _id: string;
  name: string;
  slug: string;
  pack: string | null;
  price: number;
  isVatApplicable: boolean;
  categoryId: string;
}

export interface CartItemRow {
  productId: CartItemProduct;
  quantity: number;
}

export interface CartData {
  _id: string;
  userId: string;
  items: CartItemRow[];
  createdAt: string;
  updatedAt: string;
}
