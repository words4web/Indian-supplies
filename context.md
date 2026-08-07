# Indian Supplies CRM - Project Context

This document provides a comprehensive overview of the **Indian Supplies CRM** codebase, its directory structure, technical stack, core states, data flow, and routing.

---

## 1. Project Overview

**Indian Supplies CRM** is a modern wholesale ordering and CRM client portal for a food/beverage distributor. It allows registered business clients to browse a catalog of products, manage their cart, simulate order placements, and review order confirmations.

---

## 2. Technical Stack

- **Framework**: Next.js 16.3.0 (using the App Router & Turbopack)
- **Runtime**: React 19 & React DOM 19
- **Styling**: Tailwind CSS 4.3.3 + PostCSS, utilizing `@base-ui/react` and `shadcn` for modern UI primitives
- **Utility Libraries**:
  - `clsx` & `tailwind-merge` (for class merging utilities)
  - `tw-animate-css` (for animations)
- **Language**: TypeScript 5.7.3

---

## 3. Directory Structure

```
├── app/                      # Next.js App Router folders & pages
│   ├── account/              # Client account details & options
│   ├── cart/                 # Cart overview and checkout trigger
│   ├── catalogue/            # Browse categories & products
│   ├── checkout/             # Simulated checkout and delivery details form
│   ├── login/                # Client login page
│   ├── orders/               # Past order summaries
│   ├── products/[id]/        # Product details page (dynamic routing)
│   ├── globals.css           # Tailwind styles and custom variables
│   ├── layout.tsx            # Global layout (App wrapper with Providers)
│   └── page.tsx              # Home / Portal dashboard
│
├── components/               # React Components
│   ├── ui/                   # Low-level UI primitives (e.g. Button component)
│   ├── portal-header.tsx     # CRM Header / Navigation bar
│   ├── product-card.tsx      # Catalogue item card
│   ├── product-detail.tsx    # Single product view details
│   ├── product-visual.tsx    # Category icon mapping renderer
│   └── providers.tsx         # Context providers (Cart & Auth States)
│
├── data/                     # Data stores
│   ├── Indian-Supplies-...   # Raw xlsx product spreadsheet
│   └── catalogue.json        # Cleaned JSON catalog parsed from data
│
├── lib/                      # Helper utilities
│   ├── format.ts             # Price and quantity formatting helper
│   └── utils.ts              # cn helper (clsx & tailwind-merge)
│
├── services/                 # Simulated backend endpoints
│   ├── auth-service.ts       # Sign-in simulation with mock credentials
│   └── order-service.ts      # Place-order submission simulation
│
└── types/                    # Core TypeScript Interfaces
    ├── catalogue.ts          # Definitions for Categories and Products
    └── order.ts              # Definitions for Cart, Orders, and Users
```

---

## 4. Key Data Models & Types

### Catalogue (`types/catalogue.ts`)

- **`Product`**:
  ```typescript
  export interface Product {
    id: string;
    name: string;
    pack: string | null;
    price: number | null; // Price in British Pounds (£)
    categoryId: string;
    categoryName: string;
  }
  ```
- **`Category`**: Group of products matching a specific list category (e.g. Spices, Drinks).

### Orders and Auth (`types/order.ts`)

- **`CartItem`**: Combines a `Product` reference with a `quantity`.
- **`DeliveryDetails`**: Captures delivery address, contact information, and special notes.
- **`OrderConfirmation`**: Generated order containing `orderId`, `placedAt` timestamp, total amount, and delivery details.
- **`AuthUser`**: Represents the logged-in business account (`id`, `name`, `email`, `business`).

---

## 5. State Management & Storage

Located in [components/providers.tsx](file:///home/mazahir/projects/work/Indian%20Supplies%20CRM/components/providers.tsx):

- **`AuthProvider`**: Manages the currently logged-in user state. The session is persisted in the browser's `sessionStorage` using the key `indian-supplies-user`.
- **`CartProvider`**: Manages current shopping cart items, calculation of subtotal, and quantity updates. Peristed using the `sessionStorage` key `indian-supplies-cart`.

---

## 6. Simulated Services (Mock Data)

Since the application runs entirely client-side without a persistent database backend:

- **Authentication**: Validates credentials in [services/auth-service.ts](file:///home/mazahir/projects/work/Indian%20Supplies%20CRM/services/auth-service.ts).
  - **Demo Username**: `orders@spicehouse.co.uk`
  - **Demo Password**: `wholesale123`
- **Orders**: Generates a fake invoice ID starting with `IS-` and returns confirmation details after a simulated network delay in [services/order-service.ts](file:///home/mazahir/projects/work/Indian%20Supplies%20CRM/services/order-service.ts).
