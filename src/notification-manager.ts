import { Direction } from "./common/enums/direction.enum";
import { Notification } from "./common/interfaces/notification.interface";
import { NotificationItem } from "./common/templates/notification-item.template";
import { NotificationDropdown } from "./common/templates/notifications-dropdown.template";
import { Storage } from "./storage";

const NOTIFICATION_EVENT = "notification";
const PER_PAGE = 25;

export class NotificationManager {
  #notifications: Notification[] = [];
  #dropdown: HTMLElement | null = null;
  #notificationsContainer: HTMLElement | null = null;

  #page: number = 1;
  #pages: number = 1;

  constructor() {
    this.#notifications = Storage.Get("live-notifications", []);
    this.#pages = Math.ceil(this.#notifications.length / PER_PAGE);
  }

  #paginate() {
    const skip = (this.#page - 1) * PER_PAGE;

    return this.#notifications.slice(skip, skip + PER_PAGE);
  }

  #createDropdown(container: string) {
    const notifications = this.#paginate();

    this.#dropdown = NotificationDropdown(notifications);
    this.#notificationsContainer = this.#dropdown.querySelector(container);
  }

  #renderDropdown(dropdown: HTMLElement) {
    const dropdownsContainer = document.querySelector(".navdropdown-box");
    dropdownsContainer?.appendChild(dropdown);
  }

  #createNotificationsFragment(notifications: Notification[]) {
    const fragment = document.createDocumentFragment();

    notifications.forEach((notification) => {
      fragment.appendChild(NotificationItem(notification));
    });

    return fragment;
  }

  #clearList() {
    while (this.#notificationsContainer?.firstChild) {
      this.#notificationsContainer.removeChild(
        this.#notificationsContainer?.firstChild
      );
    }
  }

  #renderListItems() {
    setTimeout(() => {
      this.#clearList();

      const notifications = this.#paginate();
      const fragment = this.#createNotificationsFragment(notifications);

      this.#notificationsContainer?.appendChild(fragment);
    });
  }

  mount(container: string) {
    this.#createDropdown(container);

    if (!this.#dropdown) {
      return;
    }

    if (this.#notifications.length) {
      this.#dropdown.querySelector(".no-items")?.remove();
    }

    this.#attachEvents();

    this.#renderDropdown(this.#dropdown);
  }

  #readMoreListener(e: Event) {
    const { target } = e;

    const isElement = target instanceof HTMLElement;
    if (!isElement || !target.matches(".read-more-button")) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    const readMore = target.closest<HTMLDivElement>(".read-more");
    if (!readMore) {
      return;
    }

    const readMoreContent =
      readMore.querySelector<HTMLElement>(".read-more-content")!;
    const isShown = readMoreContent.dataset.state === "1";

    readMoreContent.dataset.state = isShown ? "0" : "1";
    readMoreContent.style.maxHeight = isShown ? "150px" : "none";
    target.textContent = isShown ? "pokaż" : "ukryj";
  }

  #paginationListener(e: Event) {
    const { target } = e;

    const isElement = target instanceof HTMLElement;

    if (!isElement) {
      return;
    }

    const isPaginationButton =
      target.matches(".prev-page") || target.matches(".next-page");

    if (!isPaginationButton) {
      return;
    }

    const {
      dataset: { direction },
    } = target;

    if (direction === Direction.Prev && this.#page === 1) {
      return;
    }

    if (direction === Direction.Next && this.#page === this.#pages) {
      return;
    }

    if (direction === Direction.Next) {
      this.#page += 1;
    }

    if (direction === Direction.Prev) {
      this.#page -= 1;
    }

    this.#renderListItems();
  }

  #attachEvents() {
    const openDropdownButton = this.#dropdown?.querySelector(
      ".jbzdy-better-follow"
    );

    this.#dropdown?.addEventListener("click", (e) => {
      this.#readMoreListener(e);
      this.#paginationListener(e);
    });

    openDropdownButton?.addEventListener("click", () => {
      const dropdown = document.querySelector(".notifications-dropdown");

      openDropdownButton.classList.toggle("active");
      dropdown?.classList.toggle("active");
    });

    document.addEventListener(
      NOTIFICATION_EVENT,
      ({ detail: notifications }) => {
        this.#push(notifications);
      }
    );
  }

  #push(notifications: Notification[]) {
    setTimeout(() => {
      const uniqueNotifications = notifications.filter(
        ({ resourceId }) =>
          !this.#notifications.find(
            (notification) => notification.resourceId === resourceId
          )
      );

      if (uniqueNotifications.length) {
        this.#dropdown?.querySelector(".no-items")?.remove();
      }

      this.#notifications.unshift(...uniqueNotifications);
      this.#pages = Math.ceil(this.#notifications.length / PER_PAGE);

      localStorage.setItem(
        "live-notifications",
        JSON.stringify(this.#notifications)
      );

      if (this.#page === 1) {
        this.#renderListItems();
      }

      const { Bus } = window as Window & { Bus: any } & typeof globalThis;
      Bus._events.notification[0]({
        message: "Masz nowe powiadomienia!",
        clean: true,
        duration: 500,
      });
    });
  }
}
