# Indian Supplies Frontend — Project Context

This document provides a comprehensive overview of the **Indian Supplies Frontend** codebase, its directory structure, technical stack, core states, data flow, and routing.

---

## 1. Project Overview

**Indian Supplies Frontend** is the wholesale ordering client portal for a food/beverage distributor. It allows registered business clients to browse a catalog of products, manage their shopping cart, select delivery addresses, review order summaries, and submit order requests.

---

## 2. Technical Stack

- **Framework**: Next.js 16.3.0 (using App Router & Turbopack)
- **Runtime**: React 19 & React DOM 19
- **Data Fetching & Cache**: TanStack React Query (`@tanstack/react-query`)
- **API Client**: Axios (configured with token refresh interceptors)
- **Styling**: Tailwind CSS 4.3.3 + PostCSS, utilizing `@base-ui/react`, `shadcn`, and `sonner` for toast notifications
- **Icons**: `lucide-react`
- **Language**: TypeScript 5.7.3

---

## 3. Directory Structure

```
├── app/                      # Next.js App Router folders & pages
│   ├── (auth)/               # Guest authentication views (login, signup)
│   ├── (dashboard)/          # Dashboard & client portal pages
│   │   ├── cart/             # Cart overview with quantity controls & scrollable item list
│   │   ├── catalogue/        # Category filtering & product search catalogue
│   │   ├── checkout/         # Delivery selection & Order summary checkout flow
│   │   ├── orders/           # Client past order history
│   │   ├── products/[slug]/  # Single product details page (dynamic routing with related items)
│   │   ├── profile/          # Business client profile & delivery address management
│   │   ├── layout.tsx        # Dashboard layout wrapper
│   │   └── page.tsx          # Home portal dashboard (Hero, Categories, Products, Features)
│   ├── globals.css           # Global Tailwind styles, variables, shimmer animations & custom scrollbar
│   └── layout.tsx            # Root layout configuring QueryClient, Toast & Auth/Cart Providers
│
├── components/               # React Components
│   ├── common/               # Shared views (ErrorView)
│   ├── dashboard/            # Portal feature components
│   │   ├── cart-item-card.tsx# Cart item card with quantity controls
│   │   ├── categories-section.tsx # Home page category grid
│   │   ├── catalogue-filters.tsx  # Catalogue search bar & category pills
│   │   ├── delivery-selection.tsx # Address dropdown selector & optional order notes
│   │   ├── features-section.tsx   # Trust badges & feature highlights
│   │   ├── hero-section.tsx       # Main portal banner hero
│   │   ├── order-summary.tsx      # Checkout summary card (Item list, thumbnails, subtotal, VAT, total)
│   │   ├── order-success.tsx      # Order confirmation view
│   │   └── products-section.tsx   # Featured products grid
│   ├── skeleton/             # Skeleton loading UI states
│   │   ├── cart-skeleton.tsx
│   │   ├── category-skeleton.tsx
│   │   ├── checkout-skeleton.tsx
│   │   ├── product-detail-skeleton.tsx
│   │   └── product-skeleton.tsx
│   ├── ui/                   # Low-level UI primitives (Button, etc.)
│   ├── footer.tsx            # Portal footer
│   ├── portal-header.tsx     # CRM Header / Navigation bar with cart badge
│   ├── product-card.tsx      # Catalogue item card
│   ├── product-detail.tsx    # Detailed single product view
│   └── product-visual.tsx    # Category icon mapping renderer (gradient placeholder visualization)
│
├── constants/                # App Constants
│   ├── api.ts                # Backend API endpoints mapping
│   └── routes.ts             # Application routing definitions & helper builders
│
├── hooks/                    # Custom React Hooks
│   ├── useAuth.ts            # Auth context accessor hook
│   ├── useCart.ts            # Shopping cart context accessor hook
│   ├── useCatalogueFilters.ts# URL-synced search and category filter state
│   └── useDebounce.ts        # Search input debouncing hook
│
├── lib/                      # Core integration utilities
│   ├── axiosInstance.ts      # Axios request interceptor and refresh token queue
│   ├── format.ts             # Currency (Pounds £) and number formatting helper
│   └── utils.ts              # cn helper (clsx & tailwind-merge)
│
├── services/                 # API Service Layer & React Query Hooks
│   ├── address/              # Address CRUD mutations & services
│   ├── auth/                 # Authentication mutations & services
│   ├── category/             # Category query hooks & services
│   ├── order/                # Order creation & retrieval hooks
│   └── product/              # Product query hooks & services
│
└── types/                    # Core TypeScript Interfaces
    ├── address.types.ts      # AddressPayload definitions
    ├── category/             # CategoryItem & section types
    ├── order.types.ts        # CartItem, Order, DeliverySelection & OrderSummary props
    ├── product/              # Product, RelatedProductItem, and ProductRow definitions
    └── user.types.ts         # Authenticated User schema & address interfaces
```

---

## 4. Key Data Models & Types

### Product & Category (`types/product/product.types.ts`)

- **`Product`**:
  ```typescript
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
  ```

### Checkout & Orders (`types/order.types.ts`)

- **`CartItem`**: Combines a `Product` reference with an integer `quantity`.
- **`OrderSummaryProps`**: Contains `items`, `subtotal`, `vat`, `placing` (loading flag), and `disabled` state.

---

## 5. State Management & Data Flow

- **Auth Context (`useAuth`)**: Manages logged-in user profile (`user`, `ready`). Synchronizes user profile and addresses via React Query (`PROFILE_QUERY_KEY`).
- **Cart Context (`useCart`)**: Client-side persistent cart state. Stores items in `localStorage` under `cart-storage`. Exposes helper methods: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `subtotal`, and `vat`.
- **Catalogue URL Filters (`useCatalogueFilters`)**: Syncs category filters and debounced search queries directly with browser URL parameters (`?category=...&search=...`).

---

## 6. App Routing & Constants

Defined in `src/constants/routes.ts`:

- **Public/Protected Routes**:
  - `ROUTES.HOME` (`/`)
  - `ROUTES.CATALOGUE` (`/catalogue`)
  - `ROUTES.CATALOGUE_CATEGORY(category)` (`/catalogue?category=<category>`)
  - `ROUTES.PRODUCT_DETAIL(slug)` (`/products/<slug>`)
  - `ROUTES.CART` (`/cart`)
  - `ROUTES.CHECKOUT` (`/checkout`)
  - `ROUTES.PROFILE` (`/profile`)
  - `ROUTES.ORDERS` (`/orders`)
