export interface Product {
  id: string
  name: string
  pack: string | null
  price: number | null
  categoryId: string
  categoryName: string
}

export interface Category {
  id: string
  name: string
  products: Product[]
}

export interface CategorySummary {
  id: string
  name: string
  productCount: number
}
