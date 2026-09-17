"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { Footer } from "@/components/footer";
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

const LIMIT = 10;

export default function NotificationsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, ready } = useAuth();
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useNotificationsQuery(page, LIMIT);
  const markReadMutation = useMarkReadMutation();

  const notifications: NotificationItem[] =
    data?.data?.notifications || data?.data?.docs || data?.data || [];
  const meta = data?.meta || {};
  const pagination = {
    page: meta?.page || page,
    totalPages: meta?.totalPages || 1,
    totalNotifications: meta?.total || notifications.length,
    hasNextPage: meta?.page < meta?.totalPages,
    hasPrevPage: meta?.page > 1,
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
    <div className="min-h-screen bg-background flex flex-col">
      <PortalHeader />
      <main className="flex-grow mx-auto w-full max-w-5xl px-5 pt-8 pb-16 lg:px-8">
        <div className="border-b border-border/70 pb-6">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-primary">
            Alerts & Updates
          </p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Notifications
            </h1>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
              <Bell className="size-6" />
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Stay updated with your wholesale orders and account updates.
          </p>
        </div>

        {showLoading ? (
          <div className="mt-8">
            <NotificationSkeleton />
          </div>
        ) : notifications.length === 0 ? (
          <div className="mx-auto mt-14 max-w-lg rounded-2xl border border-dashed border-border p-10 text-center bg-card shadow-xs">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Inbox className="size-7" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold text-foreground">
              No notifications yet
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We&apos;ll notify you here about status changes for your order
              requests and system updates.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="space-y-3.5">
              {notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleMarkAsRead(item)}
                  className={`group relative flex flex-col gap-2.5 rounded-2xl border p-5 sm:p-6 transition-all ${
                    item.isRead
                      ? "border-border/60 bg-card/60 text-muted-foreground"
                      : "border-primary/30 bg-primary/5 text-foreground shadow-xs cursor-pointer hover:border-primary/50 hover:bg-primary/10"
                  }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {!item.isRead && (
                        <span className="size-2.5 rounded-full bg-primary shrink-0" />
                      )}
                      <h3
                        className={`text-base sm:text-lg tracking-tight ${
                          item.isRead
                            ? "font-semibold text-foreground/90"
                            : "font-bold text-foreground"
                        }`}>
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground shrink-0 pt-0.5">
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
              <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
                <span className="text-sm font-medium text-muted-foreground">
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
      <Footer />
    </div>
  );
}
