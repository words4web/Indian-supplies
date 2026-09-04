export interface RelatedProductItem {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  pack?: string;
  price?: number;
}

export interface ProductRow {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  pack: string;
  price: number;
  categoryId:
    | {
        _id: string;
        name: string;
      }
    | string;
  relatedProducts?: RelatedProductItem[] | string[];
  isVatApplicable: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  pack: string | null;
  price: number | null;
  categoryId: string;
  categoryName: string;
  relatedProducts?: RelatedProductItem[] | string[];
  isVatApplicable?: boolean;
  imageUrl?: string;
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
