import { Notification } from "./interfaces/notification.interface";

declare global {
  interface DocumentEventMap {
    notification: CustomEvent<Notification[]>;
  }
}
