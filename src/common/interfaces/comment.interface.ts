export interface Comment {
  id: number;
  commentable_id: number;
  commentable_url: string;
  score: number;
  parent_id: number;
  parent_real_id: number;
  comment: string;
  comment_safe: string;
  created_at: string;
  commentable: {
    url: string;
  };
  date_since: string;
  user_id: number;
  media: Array<{ media: { small: string } }>;
}
