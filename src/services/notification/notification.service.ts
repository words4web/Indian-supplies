import axiosInstance from "@/lib/axiosInstance";
import { API_ROUTES } from "@/constants/api";
import {
  SyncDevicePayload,
  RemoveDevicePayload,
} from "@/types/notification.types";

export const notificationService = {
  syncDevice: async (payload: SyncDevicePayload) => {
    const response = await axiosInstance.post(
      API_ROUTES.NOTIFICATIONS.DEVICES_SYNC,
      payload,
    );
    return response.data;
  },

  removeDevice: async (payload: RemoveDevicePayload) => {
    const response = await axiosInstance.post(
      API_ROUTES.NOTIFICATIONS.DEVICES_REMOVE,
      payload,
    );
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axiosInstance.get(
      API_ROUTES.NOTIFICATIONS.UNREAD_COUNT,
    );
    return response.data;
  },

  getNotifications: async (page = 1, limit = 10) => {
    const response = await axiosInstance.get(API_ROUTES.NOTIFICATIONS.ROOT, {
      params: { page, limit },
    });
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await axiosInstance.patch(
      API_ROUTES.NOTIFICATIONS.MARK_READ(id),
    );
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.patch(
      API_ROUTES.NOTIFICATIONS.READ_ALL,
    );
    return response.data;
  },
};
