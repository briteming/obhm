import dayjs from 'dayjs';

export const sortByDate = (a, b) => {
  return dayjs(b.frontmatter.date).diff(dayjs(a.frontmatter.date));
};
