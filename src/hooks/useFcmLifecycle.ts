"use client";

import { useEffect, useRef, useCallback } from "react";
import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "@/lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  setFcmToken,
  setPermissionStatus,
} from "@/lib/store/notificationSlice";
import { RootState } from "@/lib/store";
import {
  useSyncDevice,
  useRemoveDevice,
} from "@/services/notification/notification.hook";
import { useAuth } from "@/hooks/useAuth";
import { STORAGE_KEYS } from "@/constants/storage";

export const useFcmLifecycle = () => {
  const dispatch = useDispatch();
  const { user, ready } = useAuth();
  const isAuthenticated = !!user;
  const isToggledOn = useSelector(
    (state: RootState) => state.notification.isToggledOn,
  );

  const { mutate: syncDevice } = useSyncDevice();
  const { mutate: removeDevice } = useRemoveDevice();

  const syncDeviceRef = useRef(syncDevice);
  const removeDeviceRef = useRef(removeDevice);

  useEffect(() => {
    syncDeviceRef.current = syncDevice;
    removeDeviceRef.current = removeDevice;
  }, [syncDevice, removeDevice]);

  const isSyncing = useRef(false);

  const performSync = useCallback(async () => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    try {
      if (typeof window === "undefined") return;

      if (!("Notification" in window)) {
        dispatch(setPermissionStatus("unsupported"));
        return;
      }

      const currentPermission = Notification.permission;
      dispatch(setPermissionStatus(currentPermission));

      if (currentPermission === "granted" && isToggledOn) {
        const messaging = await getFirebaseMessaging();
        if (!messaging) return;

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
        );
        await navigator.serviceWorker.ready;

        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (!currentToken) return;

        const cachedToken = localStorage.getItem(STORAGE_KEYS.FCM_TOKEN);

        if (currentToken !== cachedToken) {
          syncDeviceRef.current(
            { fcmToken: currentToken, platform: "web" },
            {
              onSuccess: () => {
                localStorage.setItem(STORAGE_KEYS.FCM_TOKEN, currentToken);
                localStorage.setItem(
                  STORAGE_KEYS.NOTIFICATIONS_ENABLED,
                  "true",
                );
                dispatch(setFcmToken(currentToken));
              },
            },
          );
        } else {
          dispatch(setFcmToken(currentToken));
        }
      } else {
        const tokenToRemove = localStorage.getItem(STORAGE_KEYS.FCM_TOKEN);
        if (tokenToRemove) {
          localStorage.removeItem(STORAGE_KEYS.FCM_TOKEN);
          dispatch(setFcmToken(null));
          removeDeviceRef.current({ fcmToken: tokenToRemove });
        } else {
          dispatch(setFcmToken(null));
        }
      }
    } catch (err) {
      console.error("[useFcmLifecycle] Sync error:", err);
    } finally {
      isSyncing.current = false;
    }
  }, [dispatch, isToggledOn]);

  useEffect(() => {
    if (!ready) return;

    if (!isAuthenticated) {
      const tokenToRemove =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEYS.FCM_TOKEN)
          : null;
      if (tokenToRemove) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEYS.FCM_TOKEN);
        }
        dispatch(setFcmToken(null));
        removeDeviceRef.current({ fcmToken: tokenToRemove });
      } else {
        dispatch(setFcmToken(null));
      }
      return;
    }

    performSync();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        performSync();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let permissionStatus: PermissionStatus | undefined;

    const handlePermissionChange = () => {
      if (typeof window !== "undefined" && "Notification" in window) {
        const currentPermission = Notification.permission;
        dispatch(setPermissionStatus(currentPermission));
        performSync();
      }
    };

    const setupPermissionListener = async () => {
      try {
        if (navigator?.permissions?.query) {
          permissionStatus = await navigator.permissions.query({
            name: "notifications" as PermissionName,
          });
          permissionStatus.addEventListener("change", handlePermissionChange);
        }
      } catch (_err) {}
    };

    setupPermissionListener();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      permissionStatus?.removeEventListener("change", handlePermissionChange);
    };
  }, [ready, isAuthenticated, isToggledOn, dispatch, performSync]);
};
