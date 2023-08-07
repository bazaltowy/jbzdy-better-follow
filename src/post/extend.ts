import { extendFunction } from "../common/utils/extend-function";
import { User } from "../user";

export function extendPost(followedUsers: User[]) {
  const articleAuthors = Array.from(
    document.querySelectorAll(".article-author > span")
  ) as Array<HTMLElement & { __vue__: any }>;

  articleAuthors.forEach((author) => {
    extendFunction(author.__vue__, "show", () => {
      extendFunction(author.__vue__, "setFollowed", () => {
        const { current_user } = author.__vue__;

        if (current_user.followed) {
          const userIndex = followedUsers.findIndex(({ id }) => id === userId);

          followedUsers.splice(userIndex, 1);

          return;
        }

        const {
          id: userId,
          name,
          score,
          color,
          url,
          avatar_url,
          slug,
        } = current_user;

        followedUsers.push(
          new User({
            name,
            score,
            id: userId,
            color,
            url,
            avatar: avatar_url.medium,
            slug,
          })
        );
      });
    });
  });
}
