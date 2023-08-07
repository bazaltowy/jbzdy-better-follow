import { createChainedFunctions } from "./common/helpers/create-chained-functions";
import { chainAsync } from "./common/utils/chained-async";
import { getFollowedUsers } from "./api/endpoints";
import { replaceWypierdalaj } from "./common/helpers/replace-wypierdalaj";
import { replaceUserTags } from "./common/helpers/replace-user-tags";
import { replaceLink } from "./common/helpers/replace-link";
import { replaceQuotes } from "./common/helpers/replace-quotes";
import { NotificationType } from "./common/enums/notification-type.enum";
import { NotificationManager } from "./notification-manager";
import { extendPost } from "./post/extend";
import { Video } from "./common/templates/video.template";
import "./index.css";

const { data: followedUsers } = await getFollowedUsers();

const chain = createChainedFunctions(followedUsers, async (user) => {
  return await user.observe((comments, posts) => {
    const { Vue: _Vue } = window as any;

    const notifications = comments.map(
      ({ comment, id: commentId, commentable_url, created_at, media }) => {
        return {
          resourceId: commentId,
          user,
          content: replaceWypierdalaj(
            replaceUserTags(replaceLink(replaceQuotes(comment)))
          ),
          date: created_at,
          href: commentable_url,
          media,
          type: NotificationType.Comment,
        };
      }
    );

    const postNotifications = posts.map((post) => {
      let content = post.articleElements.outerHTML;
      if (post.videoUrl) {
        content = Video(post.videoUrl);
      }

      return {
        resourceId: +post.id,
        date: post.createdAt,
        href: post.url,
        user,
        type: NotificationType.Post,
        content: `
          <div>
            <h3 class="article-title">${post.title}</h3>
            ${content}
          </div>
        `,
        media: [],
      };
    });

    notifications.push(...postNotifications);

    document.dispatchEvent(
      new CustomEvent("notification", { detail: notifications })
    );
  });
});

async function loop() {
  await chainAsync(chain);

  setTimeout(loop, 1000);
}

function start() {
  extendPost(followedUsers);

  const notificationManager = new NotificationManager();
  notificationManager.mount(".notifications-dropdown ul");

  loop();
}

setTimeout(start);
