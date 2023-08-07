import { createRequest } from "./create-request";
import { CommentsRequestBody } from "../common/interfaces/comments-request.interface";
import { Comments } from "../common/interfaces/comments.interface";
import { Filters } from "../common/interfaces/filters.interface";
import { USER_FILTERABLE_TYPE } from "../constants";
import { User } from "../user";
import { generateTimestamp } from "../common/utils/generate-timestamp";
import { Post } from "../common/interfaces/post.interface";

export const Endpoints = {
  getComments: createRequest<Comments, CommentsRequestBody>(() => ({
    query({ page, perPage, userId }) {
      return {
        url: `comment/user/listing/${userId}?page=${page}&per_page=${perPage}&sort=newest`,
      };
    },
  })),
  getFollowedUsers: createRequest<Filters, void, User[]>(() => ({
    query() {
      return {
        url: "user/filter/collection",
      };
    },
    transform({ filters }) {
      return filters
        .filter(({ followed, filterable_type }) => {
          return followed && filterable_type === USER_FILTERABLE_TYPE;
        })
        .map(
          ({
            filterable: { name, score, color, url, avatar_url, slug },
            filterable_id: userId,
          }) => {
            return new User({
              name,
              score,
              id: userId,
              color,
              url,
              avatar: avatar_url.medium,
              slug,
            });
          }
        );
    },
  })),
  getUserPosts: createRequest<string, string, Post[]>(() => ({
    query(username: string) {
      return {
        url: `uzytkownik/${username}`,
      };
    },
    transform(result) {
      const parser = new DOMParser();

      const doc = parser.parseFromString(result, "text/html");

      const listing = doc.querySelector('section[role="listing"]');
      if (!listing) {
        return [];
      }

      const posts = Array.from(
        listing.querySelectorAll<HTMLElement>(".article")
      );

      return posts.map((post) => {
        const link = post.querySelector<HTMLLinkElement>(".article-title > a")!;
        const time = post.querySelector<HTMLSpanElement>(".article-time")!;
        const video = post.querySelector<HTMLElement>(
          ".article-image videoplyr, .video-player videoplyr"
        );
        const articleElements = post.querySelector<HTMLDivElement>(
          ".article-elements, .article-container, .article-image"
        )!;

        return {
          id: post.dataset.contentId!,
          url: link.href,
          title: link.textContent || "wypierdalaj",
          createdAt: time.dataset.date || "wypierdalaj",
          timestamp: generateTimestamp(time.dataset.date || ""),
          videoUrl: video?.attributes.getNamedItem("video_url")?.value,
          articleElements,
        };
      });
    },
  })),
};

export const { getComments, getFollowedUsers, getUserPosts } = Endpoints;
