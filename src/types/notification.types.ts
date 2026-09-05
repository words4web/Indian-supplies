export type NotificationPermissionStatus =
  | "default"
  | "granted"
  | "denied"
  | "unsupported";

export interface INotificationState {
  unreadCount: number;
  fcmToken: string | null;
  permissionStatus: NotificationPermissionStatus;
  isToggledOn: boolean;
}

export interface SyncDevicePayload {
  fcmToken: string;
  platform: string;
  OSVersion?: string;
}

export interface RemoveDevicePayload {
  fcmToken: string;
}

export interface NotificationItem {
  _id: string;
  userId: string;
  userModel: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface BlockedPermissionBannerProps {
  className?: string;
}

export interface NotificationToggleProps {
  className?: string;
}
