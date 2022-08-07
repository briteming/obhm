import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { sortByDate } from '@/utils/index';

export const getPosts = () => {
  const files = fs.readdirSync(path.join('content/posts'));
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', filename), 'utf-8');

    const { data: frontmatter, content } = matter(markdownWithMeta);
    const excerpt = getExcerpt(content, 300);

    return { frontmatter, excerpt };
  });

  return posts.filter((post) => post.frontmatter.draft === false).sort(sortByDate);
};

function parseMarkdown(markdownText: string, char: number) {
  const charLimit = char || 500;
  const htmlText = markdownText
    // hide h3 title
    .toString()
    .replace(/^### (.*$)/gim, '')
    // hide h2 title
    .toString()
    .replace(/^## (.*$)/gim, '')
    // hide h1 title
    .toString()
    .replace(/^# (.*$)/gim, '')
    // replace italic to normal text
    .toString()
    .replace(/^\> (.*$)/gim, '$1')
    // replace bold to normal text
    .toString()
    .replace(/\*\*(.*)\*\*/gim, '$1')
    .toString()
    .replace(/\*(.*)\*/gim, '')
    .toString()
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '')
    .toString()
    .replace(/\[(.*?)\]\((.*?)\)/gim, '$1')
    .toString()
    .replace(/\n$/gim, '');
  return htmlText.trim().slice(0, charLimit);
}

export const getExcerpt = (markdownText: string, char: number) => {
  const excerpt = parseMarkdown(markdownText, char);
  return excerpt;
};
