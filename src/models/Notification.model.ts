export interface Notification {
  title: string;
  message: string;
}
export interface NotificationCustomProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onRemoveNotification: (index: number) => void;
}
