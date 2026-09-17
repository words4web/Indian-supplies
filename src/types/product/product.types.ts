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
  unit?: string;
  categoryId:
    | {
        _id: string;
        name: string;
      }
    | string;
  keywords?: string[];
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
  unit?: string;
  categoryId: string;
  categoryName: string;
  keywords?: string[];
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
