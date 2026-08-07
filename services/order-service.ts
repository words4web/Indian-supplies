import type { CartItem, DeliveryDetails, OrderConfirmation } from '@/types/order'

/** Simulated order submission. Replace with a real POST /orders endpoint later. */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function placeOrder(
  items: CartItem[],
  delivery: DeliveryDetails,
): Promise<OrderConfirmation> {
  await wait(750)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0)

  return {
    orderId: `IS-${Date.now().toString().slice(-6)}`,
    placedAt: new Date().toISOString(),
    itemCount,
    total,
    delivery,
  }
}
