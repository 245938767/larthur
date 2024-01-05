export const seo = {
  title: "LarthurBlog",
  description: "Larthur的博客",
  url: new URL(
    process.env.NODE_ENV === "production"
      ? "https://larthur.vercel.app"
      : "http://localhost:3000"
  ),
} as const;
