export interface CategoryRow {
  _id: string;
  name: string;
  slug: string;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategoriesSectionProps {
  categories: CategoryItem[];
}

export interface CatalogueFiltersProps {
  query: string;
  setQuery: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  categories: CategoryItem[];
}
