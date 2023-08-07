import { User } from "./user.interface";

export interface Notification {
  resourceId: number;
  content: string;
  href: string;
  date: string;
  user: User;
  media: Array<{ media: { small: string } }>;
  type: "post" | "komentarz";
}
