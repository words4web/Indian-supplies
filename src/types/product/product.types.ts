export interface ProductRow {
  _id: string;
  name: string;
  slug: string;
  pack: string;
  price: number;
  categoryId:
    | {
        _id: string;
        name: string;
      }
    | string;
  isVatApplicable: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  pack: string | null;
  price: number | null;
  categoryId: string;
  categoryName: string;
  isVatApplicable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface CategorySummary {
  id: string;
  name: string;
  productCount: number;
}
