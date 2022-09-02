import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { sortByDate } from '@/utils/index';
import getExcerpt from '@/libs/getExcerpt';

const getPosts = () => {
  const files = fs.readdirSync(path.join('content/posts'));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', filename), 'utf-8');

    const slug = filename.replace('.md', '');
    const { data: frontmatter, content } = matter(markdownWithMeta);
    const excerpt = getExcerpt(content, 300);

    return { slug, frontmatter, excerpt };
  });

  return posts.filter((post) => post.frontmatter.draft === false).sort(sortByDate);
};

export default getPosts;
