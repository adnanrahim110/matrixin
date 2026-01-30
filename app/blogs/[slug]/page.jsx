import BlogDetailPage from "@/components/blogs/BlogDetailPage";
import { BLOGS, getBlogBySlug, getRelatedBlogs } from "@/constants/blogs";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.slug);
  if (!blog) return {};
  return {
    title: blog.meta?.title,
    description: blog.meta?.description,
    keywords: blog.meta?.keywords,
  };
}

export default async function BlogPage({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.slug);
  if (!blog) notFound();
  const related = getRelatedBlogs(blog, 3);
  return <BlogDetailPage blog={blog} related={related} />;
}
