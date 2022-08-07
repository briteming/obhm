export type PostType = {
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    category: string;
    socialImage?: string;
    tags: [string];
  };
  slug: string;
  content: any;
  excerpt: string;
};
