"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { useAuth } from "@/hooks/useAuth";
import {
  useNotificationsQuery,
  useMarkReadMutation,
} from "@/services/notification/notification.hook";
import { useDispatch } from "react-redux";
import { decrementUnreadCount } from "@/lib/store/notificationSlice";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { NotificationSkeleton } from "@/components/skeleton/notification-skeleton";
import { NotificationItem } from "@/types/notification.types";

export default function NotificationsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, ready } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useNotificationsQuery(
    page,
    ready && !!user,
  );
  const markReadMutation = useMarkReadMutation();

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login");
    }
  }, [ready, user, router]);

  const notifications: NotificationItem[] =
    data?.data?.notifications || data?.data?.docs || data?.data || [];
  const pagination = data?.data?.pagination || {
    page: data?.data?.page || page,
    totalPages: data?.data?.totalPages || 1,
    totalNotifications: data?.data?.totalNotifications || notifications.length,
    hasNextPage:
      data?.data?.hasNextPage ?? page < (data?.data?.totalPages || 1),
    hasPrevPage: data?.data?.hasPrevPage ?? page > 1,
  };

  const handleMarkAsRead = (item: NotificationItem) => {
    if (item.isRead) return;
    markReadMutation.mutate(item._id, {
      onSuccess: () => {
        dispatch(decrementUnreadCount());
      },
    });
  };

  const showLoading = !ready || !user || isLoading;

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />
      <main className="mx-auto max-w-4xl px-5 pt-6 pb-16">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bell className="size-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                Notifications
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Stay updated with your wholesale orders and account updates
              </p>
            </div>
          </div>
        </div>

        {showLoading ? (
          <NotificationSkeleton />
        ) : notifications.length === 0 ? (
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-dashed border-border p-10 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Inbox className="size-7" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold text-foreground">
              No notifications yet
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              We&apos;ll notify you here about status changes for your order
              requests and system updates.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleMarkAsRead(item)}
                  className={`group relative flex flex-col gap-2 rounded-2xl border p-5 transition-all ${
                    item.isRead
                      ? "border-border/60 bg-card/60 text-muted-foreground"
                      : "border-primary/30 bg-primary/5 text-foreground shadow-xs cursor-pointer hover:border-primary/50 hover:bg-primary/10"
                  }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      {!item.isRead && (
                        <span className="size-2.5 rounded-full bg-primary shrink-0" />
                      )}
                      <h3
                        className={`text-base ${
                          item.isRead
                            ? "font-semibold text-foreground/90"
                            : "font-bold text-foreground"
                        }`}>
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground shrink-0">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : ""}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                  {!item.isRead && (
                    <div className="mt-1 flex justify-end">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                        <CheckCircle className="size-3.5" /> Mark as read
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                <span className="text-xs font-medium text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasPrevPage || isFetching}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="h-9 gap-1.5 px-4 text-xs font-semibold">
                    <ChevronLeft className="size-4" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.hasNextPage || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                    className="h-9 gap-1.5 px-4 text-xs font-semibold">
                    Next <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
