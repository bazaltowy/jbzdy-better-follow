export interface Filter {
  filterable: {
    avatar_url: {
      small: string;
      medium: string;
      original: string;
    };
    color: string;
    name: string;
    url: string;
    score: number;
    slug: string;
  };
  filterable_id: number;
  filterable_type: string;
  followed: boolean;
}
