import { CartItem } from "./cart.types";
import { Address } from "./address.types";

export type OrderStatus = "IN_PROCESS" | "DELIVERED";

export interface OrderItemProduct {
  _id: string;
  name: string;
  slug: string;
  pack?: string;
  price: number;
  description?: string;
}

export interface OrderItem {
  productId: OrderItemProduct | string;
  quantity: number;
  priceAtOrder: number;
}

export interface DeliveryDetails {
  businessName: string;
  contactPerson: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface Order {
  _id: string;
  userId: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  vat: number;
  total: number;
  delivery: DeliveryDetails;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface OrderTabsProps {
  activeTab: OrderStatus;
  onTabChange: (tab: OrderStatus) => void;
  inProcessCount: number;
  deliveredCount: number;
}

export interface OrderConfirmation {
  orderId: string;
  placedAt: string;
  itemCount: number;
  total: number;
  delivery: DeliveryDetails;
}

export interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  vat: number;
  placing: boolean;
  disabled: boolean;
}

export interface DeliverySelectionProps {
  addresses: Address[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  notes: string;
  onChangeNotes: (value: string) => void;
}

export interface OrderSuccessProps {
  order: {
    orderId: string;
    subtotal: number;
    vat: number;
    total: number;
    items: Array<{
      productId: string;
      quantity: number;
      priceAtOrder: number;
    }>;
    delivery: DeliveryDetails;
    status: OrderStatus;
  };
}
