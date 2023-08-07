import { createElement } from "../helpers/create-element";
import { Notification } from "../interfaces/notification.interface";
import { CommentGallery } from "./comment-gallery.template";
import { ReadMore } from "./read-more.template";

export function NotificationItem(notification: Notification) {
  const { content, href, date, media, user, type } = notification;
  const { name, url: profile, avatar, color } = user;

  return createElement(`
    <li class="notification-item">
      <a href="${href}" aria-label="Przejdź do postu" class="notification-link"></a>
      <div class="notification-header">
        <img src="${avatar}" alt="${name} avatar" class="notification-avatar" loading="lazy"/>
        <div class="notification-info">
          <p style="font-size: 11px;">
            Użytkownik <a href="${profile}" class="username" style="--color: ${color}">${name}</a> dodał ${type}.
          </p>
          <small>${date}</small>
        </div>
      </div>
      <div>
      ${ReadMore(content)}
      ${CommentGallery(media)}
    </li>
  `);
}
