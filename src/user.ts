import { User as IUser } from "./common/interfaces/user.interface";
import { getComments, getUserPosts } from "./api/endpoints";
import { Comment } from "./common/interfaces/comment.interface";
import { generateTimestamp } from "./common/utils/generate-timestamp";
import { Post } from "./common/interfaces/post.interface";
import { timestamps } from "./timestamps";
import { NotificationType } from "./common/enums/notification-type.enum";
import { Storage } from "./storage";

export class User implements IUser {
  name: string = "";
  score: number = 0;
  id: number = 0;
  color: string = "";
  url: string = "";
  avatar: string = "";
  slug: string = "";
  timestamps: Record<NotificationType, number>;

  constructor(user: IUser) {
    Object.assign(this, user);

    this.timestamps = timestamps[this.id] || {
      [NotificationType.Comment]: -1,
      [NotificationType.Post]: -1,
    };

    timestamps[this.id] = this.timestamps;
  }

  async #getNewComments() {
    const {
      data: {
        pagination: { data: comments },
      },
    } = await getComments({ page: 1, perPage: 10, userId: this.id });

    return comments.filter(({ created_at }) => {
      const timestamp = generateTimestamp(created_at);

      return timestamp - this.timestamps.komentarz > 1;
    });
  }

  async #getNewPosts() {
    const { data: posts } = await getUserPosts(this.slug);

    return posts.filter((post) => {
      return post.timestamp - this.timestamps.post > 1;
    });
  }

  async observe(callback: (comments: Comment[], posts: Post[]) => void) {
    const comments = await this.#getNewComments();
    const posts = await this.#getNewPosts();

    if (!comments.length && !posts.length) {
      return;
    }

    const comment = comments[0];
    const post = posts[0];

    if (comment) {
      this.timestamps.komentarz = generateTimestamp(comment.created_at);
    }

    if (post) {
      this.timestamps.post = generateTimestamp(post.createdAt);
    }

    Storage.Set("userTimestamps", timestamps);

    callback(comments, posts);
  }
}
