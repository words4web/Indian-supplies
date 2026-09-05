import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotificationState } from "@/types/notification.types";
import { STORAGE_KEYS } from "@/constants/storage";

const initialState: INotificationState = {
  unreadCount: 0,
  fcmToken: null,
  permissionStatus: "default",
  isToggledOn:
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED) !== "false"
      : true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action?.payload;
    },
    incrementUnreadCount(state) {
      state.unreadCount += 1;
    },
    decrementUnreadCount(state) {
      state.unreadCount = Math.max(0, state.unreadCount - 1);
    },
    setFcmToken(state, action: PayloadAction<string | null>) {
      state.fcmToken = action?.payload;
    },
    setPermissionStatus(
      state,
      action: PayloadAction<INotificationState["permissionStatus"]>,
    ) {
      state.permissionStatus = action?.payload;
    },
    setToggledOn(state, action: PayloadAction<boolean>) {
      state.isToggledOn = action?.payload;
    },
    resetNotificationState() {
      return initialState;
    },
  },
});

export const {
  setUnreadCount,
  incrementUnreadCount,
  decrementUnreadCount,
  setFcmToken,
  setPermissionStatus,
  setToggledOn,
  resetNotificationState,
} = notificationSlice.actions;

export default notificationSlice.reducer;
