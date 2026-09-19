# Indian Supplies Frontend — Project Context

This document provides a comprehensive overview of the **Indian Supplies Frontend** codebase, its directory structure, technical stack, navigation architecture, core state management, data flows, and routing.

---

## 1. Project Overview

**Indian Supplies Frontend** is the wholesale ordering client portal for a food and essentials distributor. It allows registered business clients to browse a catalog of products, manage their shopping cart, select delivery addresses, review order summaries, submit order requests, and receive real-time push/socket notifications.

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
│   │   ├── orders/           # Client past order history (Responsive Segmented control: In Process & Delivered)
│   │   ├── products/[slug]/  # Single product details page (dynamic routing with multiple image gallery & related items)
│   │   ├── profile/          # Business client profile, delivery address management, & NotificationToggle
│   │   └── page.tsx          # Home portal dashboard (Hero, Categories, Products, Features)
│   ├── globals.css           # Global Tailwind styles, variables, shimmer animations, mobile nav safe padding & custom scrollbar
│   └── layout.tsx            # Root layout configuring QueryClient, Toast, Auth/Cart Providers, & NotificationListener
│
├── public/
│   └── firebase-messaging-sw.js # FCM Background Service Worker (handles background pushes, custom tags, vibration & tab focus)
│
├── components/               # React Components
│   ├── common/               # Shared views (ErrorView, Loader, NotificationListener, ProductImage, ConfirmModal, AddressModal)
│   ├── dashboard/            # Portal feature components
│   │   ├── blocked-permission-banner.tsx # Browser notification permission block alert
│   │   ├── cart-item-card.tsx# Cart item card with quantity controls & ProductImage integration
│   │   ├── categories-section.tsx # Home page responsive category grid with CategoryVisual
│   │   ├── catalogue-filters.tsx  # Catalogue search bar & responsive category pills
│   │   ├── delivery-selection.tsx # Address dropdown selector & optional order notes
│   │   ├── features-section.tsx   # Trust badges & feature highlights
│   │   ├── notification-toggle.tsx# Switch control in profile settings to enable/disable FCM notifications
│   │   ├── order-card.tsx         # Order overview card showing items, total tax (VAT), total amount, & inline view details button
│   │   ├── order-detail-modal.tsx # Modal showing full order breakdown, delivery contact & address, scrollable item list with ProductImage & product links, subtotal, VAT, & total
│   │   ├── order-tabs.tsx         # Responsive segmented control tab component filtering orders by status (In Process / Delivered) with count badges
│   │   ├── order-summary.tsx      # Checkout summary card
│   │   ├── order-success.tsx      # Order confirmation view
│   │   └── products-section.tsx   # Featured products grid
│   ├── navigation/           # Dedicated Navigation Sub-system
│   │   ├── desktop-header.tsx     # Full desktop navigation bar (>= md) with initials avatar, search, notifications, and cart badge
│   │   ├── mobile-header.tsx      # Clean mobile top header (< md) with brand identity, search shortcut, and notification bell
│   │   └── mobile-bottom-nav.tsx  # WhatsApp/Instagram style bottom navigation bar (< md) with active tabs and badges
│   ├── skeleton/             # Skeleton loading UI states (OrderSkeleton, CartSkeleton, CheckoutSkeleton, etc.)
│   ├── ui/                   # Low-level UI primitives (Button, Modal, Input, etc.)
│   ├── footer.tsx            # Portal footer with updated navigational links
│   ├── portal-header.tsx     # Unified Navigation layout component combining DesktopHeader, MobileHeader, and MobileBottomNav
│   ├── product-card.tsx      # Flip product card with dark high-contrast flipped view, wholesale specs & ProductImage
│   ├── product-detail.tsx    # Detailed single product view with multi-image gallery and add-to-cart counter
│   └── product-visual.tsx    # Category icon mapping renderer & visual indicators
│
├── constants/                # App Constants
│   ├── api.ts                # Backend API endpoints mapping (ORDERS, NOTIFICATIONS, AUTH, PRODUCTS, CART, ADDRESSES)
│   ├── routes.ts             # Application routing definitions & helper builders
│   └── storage.ts            # Local and session storage keys (FCM_TOKEN, NOTIFICATIONS_ENABLED, NOTIF_BANNER_DISMISSED)
│
├── data/                     # Application static datasets
│   └── navigation.ts         # Navigation items definitions & getMobileNavItems generator
│
├── hooks/                    # Custom React Hooks
│   ├── useAuth.ts            # Auth context accessor hook
│   ├── useAuthFlow.ts        # Dynamic authentication redirect & login flow hook
│   ├── useCart.ts            # Shopping cart context accessor hook
│   ├── useCatalogueFilters.ts# Mutually exclusive URL-synced search and category filter state
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

## 4. Key Workflows & Features

### 1. Dedicated Desktop & Mobile Navigation Architecture

- **Desktop Experience (`DesktopHeader`)**:
  - Sticky header on desktop viewports (`md:block`) featuring the brand logo, clean primary links (**Home**, **Catalogue**, **Orders**), search shortcut, unread notifications badge, cart counter, and an initials-only avatar badge when authenticated.
- **Mobile Experience (`MobileHeader` + `MobileBottomNav`)**:
  - Minimal top header on small viewports (`md:hidden`) with logo, search icon, and notification bell.
  - Sticky WhatsApp/Instagram style bottom navigation bar (`MobileBottomNav`) with 5 primary tabs: **Home**, **Catalogue**, **Cart** (with live numeric badge), **Orders**, and **Profile** (showing user initials avatar).
  - Global CSS safe offset ensures mobile pages, checkout CTAs, and footers never overlap with the bottom bar.

### 2. Mutually Exclusive Catalogue Search & Category Filtering

- **Cross-Category Search**:
  - Typing in the catalogue search box immediately removes any active category parameter from the URL, allowing search across all products.
- **Category Browsing**:
  - Clicking any category pill resets the search query and loads products matching that specific category.

### 3. Reusable Product Image Gallery (`ProductImage`)

- Reusable image component with size presets (`sm`, `md`, `lg`, `xl`, `full`) supporting Next.js image optimization and graceful fallback handling with `Package` icons across product cards, cart items, order summaries, and modal views.

### 4. Secure Checkout & Order Submission

- **Checkout Submission (`/checkout`)**:
  - The client selects a verified delivery address (`selectedAddressId`) and optional notes.
  - Submits `{ addressId, notes? }` to `orderService.create` (`POST /api/v1/user/orders`).
  - Items, prices, and address snapshots are securely validated and calculated on the backend from the user's MongoDB `Cart`.
  - Upon success, clears client cart cache and displays the `OrderSuccess` confirmation view.

### 5. State Management & Data Flow

- **Auth Context (`useAuth` & `useAuthFlow`)**: Manages logged-in user profile (`user`, `ready`). Unauthenticated users attempting to access protected pages (`/orders`, `/profile`, `/checkout`) are redirected to `/login`.
- **Cart Context (`useCart`)**: Synchronizes with server-side cart state using TanStack Query, offering quantity increment, decrement, and item removal.
- **FCM Push Notification Lifecycle (`useFcmLifecycle` & `NotificationListener`)**:
  - Automatically requests browser permissions, registers `firebase-messaging-sw.js`, fetches FCM tokens, and syncs device tokens with `/api/v1/user/notification/devices/sync`.
  - Automatically revokes tokens via `/devices/remove` on logout or when toggled off in settings.
  - Listens for foreground pushes via `onForegroundMessage()`, displaying interactive Sonner toast notifications and auto-invalidating `["orders"]` and `["notifications"]` React Query caches.
