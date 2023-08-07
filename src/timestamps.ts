import { NotificationType } from "./common/enums/notification-type.enum";
import { Storage } from "./storage";

export const timestamps: Record<
  number,
  Record<NotificationType, number>
> = Storage.Get("userTimestamps", {});
