"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { onForegroundMessage } from "@/lib/firebase";
import { incrementUnreadCount } from "@/lib/store/notificationSlice";
import { NOTIFICATION_QUERY_KEYS } from "@/services/notification/notification.hook";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { useFcmLifecycle } from "@/hooks/useFcmLifecycle";

export function NotificationListener() {
  const { user, ready } = useAuth();
  const isAuthenticated = ready && !!user;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  useFcmLifecycle();

  useEffect(() => {
    if (!isAuthenticated) return;

    let unsubscribe: (() => void) | null = null;

    const subscribe = async () => {
      unsubscribe = await onForegroundMessage((payload) => {
        const notification = payload?.notification ?? {};
        const data = payload?.data ?? {};
        const title =
          notification?.title ?? data?.title ?? "Order Notification";
        const body = notification?.body ?? data?.body ?? "";
        const orderId = data?.orderId;

        toast(title, {
          description: body,
          duration: 6000,
          action: orderId
            ? {
                label: "View Orders",
                onClick: () => router.push(ROUTES.ORDERS),
              }
            : undefined,
        });

        dispatch(incrementUnreadCount());

        queryClient.invalidateQueries({
          queryKey: NOTIFICATION_QUERY_KEYS.all,
        });

        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });

        if (orderId) {
          queryClient.invalidateQueries({
            queryKey: ["order", "detail", orderId],
          });
        }
      });
    };

    subscribe();

    return () => {
      unsubscribe?.();
    };
  }, [isAuthenticated, dispatch, queryClient, router]);

  return null;
}
