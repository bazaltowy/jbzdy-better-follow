export interface Post {
  id: string;
  url: string;
  title: string;
  createdAt: string;
  timestamp: number;
  articleElements: HTMLDivElement;
  videoUrl?: string;
}
