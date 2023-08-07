import { templateMap } from "../helpers/template-map";
import { Notification } from "../interfaces/notification.interface";
import { GalleryItem } from "./gallery-item.template";

export function CommentGallery(media: Notification["media"]) {
  return `
    <section id="silentbox-gallery" class="comment-media">
      ${templateMap(media, ({ media: { small } }) => GalleryItem(small))}
    </section>
  `;
}
