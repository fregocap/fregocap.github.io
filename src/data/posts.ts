import { getCollection } from 'astro:content';

export const getPostsMetadata = async () => {
  const posts = await getCollection('blog', ({ data }) => {
    return data.hidden !== true;
  });
  return posts.map(post => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
  }));
};
