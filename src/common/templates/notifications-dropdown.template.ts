import { createElement } from "../helpers/create-element";
import { templateMap } from "../helpers/template-map";
import { Notification } from "../interfaces/notification.interface";
import { NotificationItem } from "./notification-item.template";

export function NotificationDropdown(notifications: Notification[]) {
  return createElement(`
    <div>
      <button
        class="navdropdown-icon ion ion-android-notifications jbzdy-better-follow"
        aria-label="Otwórz powiadomienia"
      ></button>
      <div class="navdropdown-dropdown notifications-dropdown">
      <section class="ps-container scroll-area infinite-wrapper" style="overflow: auto !important;">
        <div class="notifications-pagination">
          <button class="prev-page" data-direction="prev">poprzednia strona</button>
          <button class="next-page" data-direction="next">następna strona</button>
        </div>
        <ul dusk="notification-list">
          <p style="color: #fff; text-align: center;" class="no-items">
            Nie masz jeszcze żadnych powiadomień z naszej wspaniałej wtyczki! No i wypierdalaj!
          </p>
          ${templateMap(notifications, NotificationItem)}
        </ul>
        <div class="notifications-pagination">
          <button class="prev-page" data-direction="prev">poprzednia strona</button>
          <button class="next-page" data-direction="next">następna strona</button>
        </div>
      </section>
      </div>
    </div>
  `);
}
