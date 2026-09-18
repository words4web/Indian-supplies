# Indian Supplies Frontend — Project Context

This document provides a comprehensive overview of the **Indian Supplies Frontend** codebase, its directory structure, technical stack, core states, data flow, and routing.

---

## 1. Project Overview

**Indian Supplies Frontend** is the wholesale ordering client portal for a food/beverage distributor. It allows registered business clients to browse a catalog of products, manage their shopping cart, select delivery addresses, review order summaries, and submit order requests.

---

## 2. Technical Stack

- **Framework**: Next.js 16.3.0 (using App Router & Turbopack)
- **Runtime**: React 19 & React DOM 19
- **State Management**: Redux Toolkit & Redux Persist (`localStorage` for persistent Auth & Notification preferences)
- **Data Fetching & Cache**: TanStack React Query (`@tanstack/react-query`)
- **API Client**: Axios (configured with token refresh interceptors)
- **Push Notifications & Messaging**: Firebase Web SDK (`firebase/app`, `firebase/messaging`) + Service Worker
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
│   │   ├── notifications/    # Client notification inbox with read/unread states
│   │   ├── orders/           # Client past order history (Segmented control tab system: In Process & Delivered, OrderSkeleton)
│   │   ├── products/[slug]/  # Single product details page (dynamic routing with related items)
│   │   ├── profile/          # Business client profile, delivery address management, & NotificationToggle
│   │   ├── layout.tsx        # Dashboard layout wrapper
│   │   └── page.tsx          # Home portal dashboard (Hero, Categories, Products, Features)
│   ├── globals.css           # Global Tailwind styles, variables, shimmer animations & custom scrollbar
│   └── layout.tsx            # Root layout configuring QueryClient, Toast, Auth/Cart Providers, & NotificationListener
│
├── public/
│   └── firebase-messaging-sw.js # FCM Background Service Worker (handles background pushes, custom tags, vibration & tab focus)
│
├── components/               # React Components
│   ├── common/               # Shared views (ErrorView, Loader, NotificationListener)
│   ├── dashboard/            # Portal feature components
│   │   ├── blocked-permission-banner.tsx # Browser notification permission block alert
│   │   ├── cart-item-card.tsx# Cart item card with quantity controls
│   │   ├── categories-section.tsx # Home page category grid
│   │   ├── catalogue-filters.tsx  # Catalogue search bar & category pills
│   │   ├── delivery-selection.tsx # Address dropdown selector & optional order notes
│   │   ├── features-section.tsx   # Trust badges & feature highlights
│   │   ├── notification-toggle.tsx# Switch control in profile settings to enable/disable FCM notifications
│   │   ├── order-card.tsx         # Order overview card showing items, total tax (VAT), total amount, & inline view details button
│   │   ├── order-detail-modal.tsx # Modal showing full order breakdown, delivery contact & address, scrollable item list with product links, subtotal, VAT, & total
│   │   ├── order-tabs.tsx         # Segmented control tab component filtering orders by status (In Process / Delivered) with count badges
│   │   ├── order-summary.tsx      # Checkout summary card
│   │   ├── order-success.tsx      # Order confirmation view
│   │   └── products-section.tsx   # Featured products grid
│   ├── skeleton/             # Skeleton loading UI states (OrderSkeleton, CartSkeleton, CheckoutSkeleton, etc.)
│   ├── ui/                   # Low-level UI primitives (Button, Modal, etc.)
│   ├── footer.tsx            # Portal footer
│   ├── portal-header.tsx     # CRM Header / Navigation bar with cart badge and notification indicator
│   ├── product-card.tsx      # Catalogue item card
│   ├── product-detail.tsx    # Detailed single product view
│   └── product-visual.tsx    # Category icon mapping renderer
│
├── constants/                # App Constants
│   ├── api.ts                # Backend API endpoints mapping (ORDERS, NOTIFICATIONS, AUTH, PRODUCTS, CART, ADDRESSES)
│   ├── routes.ts             # Application routing definitions & helper builders
│   └── storage.ts            # Local and session storage keys (FCM_TOKEN, NOTIFICATIONS_ENABLED, NOTIF_BANNER_DISMISSED)
│
├── hooks/                    # Custom React Hooks
│   ├── useAuth.ts            # Auth context accessor hook
│   ├── useAuthFlow.ts        # Dynamic authentication redirect & login flow hook
│   ├── useCart.ts            # Shopping cart context accessor hook
│   ├── useCatalogueFilters.ts# URL-synced search and category filter state
│   ├── useDebounce.ts        # Search input debouncing hook
│   └── useFcmLifecycle.ts    # FCM token lifecycle hook (requests permissions, registers SW, syncs device tokens via /devices/sync)
│
├── lib/                      # Core integration utilities
│   ├── axiosInstance.ts      # Axios request interceptor and refresh token queue
│   ├── firebase.ts           # Firebase client SDK initialization & Messaging helpers
│   ├── format.ts             # Currency (Pounds £) and number formatting helper
│   ├── store/                # Redux slices (authSlice.ts, cartSlice.ts, notificationSlice.ts)
│   └── store.ts              # Redux store configuration registering notificationReducer
│
├── services/                 # API Service Layer & React Query Hooks
│   ├── address/              # Address CRUD mutations & services
│   ├── auth/                 # Authentication mutations & services
│   ├── category/             # Category query hooks & services
│   ├── notification/         # Notification API service & React Query hooks (useNotificationsQuery, useSyncDevice, useRemoveDevice)
│   ├── order/                # Order creation mutation (`useCreateOrder`) & order list queries (`useOrdersQuery`)
│   └── product/              # Product query hooks & services
│
└── types/                    # Core TypeScript Interfaces
    ├── address.types.ts      # AddressPayload definitions
    ├── category/             # CategoryItem & section types
    ├── notification.types.ts # INotificationState, SyncDevicePayload, RemoveDevicePayload, NotificationItem definitions
    ├── order.types.ts        # Order, OrderItem, OrderCardProps, OrderDetailModalProps, OrderTabsProps, & OrderSummary props
    ├── product/              # Product, RelatedProductItem, and ProductRow definitions
    └── user.types.ts         # Authenticated User schema & address interfaces
```

---

## 4. Key Workflows & Data Flow

### 1. Secure Checkout & Order Submission

- **Checkout Submission (`/checkout`)**:
  - The client selects a verified delivery address (`selectedAddressId`) and optional notes.
  - Submits `{ addressId, notes? }` to `orderService.create` (`POST /api/v1/user/orders`).
  - Items, prices, and address snapshots are securely computed on the backend from the user's MongoDB `Cart` and authenticated user profile.
  - Upon success, automatically clears client cart cache and displays the `OrderSuccess` confirmation view.

### 2. State Management & Data Flow

- **Auth Context (`useAuth` & `useAuthFlow`)**: Manages logged-in user profile (`user`, `ready`). Unauthenticated users attempting to access protected pages (`/orders`, `/profile`, `/checkout`) are redirected to `/login`.
- **Cart Context (`useCart`)**: Synchronizes with server-side cart state using TanStack Query, offering quantity increment, decrement, and item removal.
- **FCM Push Notification Lifecycle (`useFcmLifecycle` & `NotificationListener`)**:
  - Automatically requests browser permissions, registers `firebase-messaging-sw.js`, fetches FCM tokens, and syncs device tokens with `/api/v1/user/notification/devices/sync`.
  - Automatically revokes tokens via `/devices/remove` on logout or when toggled off in settings.
  - Listens for foreground pushes via `onForegroundMessage()`, displaying interactive Sonner toast notifications and auto-invalidating `["orders"]` and `["notifications"]` React Query caches.
