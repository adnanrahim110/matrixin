import BlogIndexPage from "@/components/blogs/BlogIndexPage";
import { BLOGS } from "@/constants/blogs";

export const metadata = {
  title: "Blog | Matrixin",
  description:
    "Editorial notes on design, product, performance, and the craft behind premium digital experiences.",
};

export default function BlogsPage() {
  return <BlogIndexPage blogs={BLOGS} />;
}
