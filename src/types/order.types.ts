import { CartItem } from "./cart.types";
import { Address } from "./address.types";

export interface DeliveryDetails {
  businessName: string;
  contactPerson: string;
  phone: string;
  address: string;
  notes?: string;
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

export type OrderStatus = "IN_PROCESS" | "DELIVERED";

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
    delivery: {
      businessName: string;
      contactPerson: string;
      phone: string;
      address: string;
    };
    status: OrderStatus;
  };
}
