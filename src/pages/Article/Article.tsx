import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { parseMSSQLDate, formatDate } from "@/lib/utility";

interface ArticleData {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
  imageDesc: string;
  category: string;
  tags: string[];
}

export default function Article() {
  const [data, setData] = useState<ArticleData | null>(null);

  useEffect(() => {
    fetch("/test-article.json")
      .then((response) => response.json())
      .then((jsonData) => {
        let parsedContent = "";
        try {
          parsedContent = JSON.parse(jsonData.content || '""');
        } catch (error) {
          console.error("Error parsing JSON content:", error);
        }
        setData({ ...jsonData, content: parsedContent });
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  return (
    <main className="mx-auto mb-48 flex w-10/12 max-w-screen-md flex-col items-center justify-center md:w-3/4 md:gap-y-16 lg:w-3/5">
      <article className="flex w-full max-w-screen-xl flex-col gap-12">
        <header className="mt-10 flex max-w-screen-2xl flex-col items-center justify-center gap-10 md:mt-20">
          <div className="flex items-center justify-center self-start">
            <h1 className="text-center text-4xl font-semibold md:text-left md:text-6xl">
              {data?.title || "Loading..."}
            </h1>
          </div>
          <div className="flex w-full flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
            <p>Author: Ray Maschine</p>
            <time dateTime="2024-07-01">Published: July 1, 2024</time>
          </div>
          <div className="w-full object-cover">
            <img
              src="music-article-images\01.jpg"
              alt="music production"
              className="h-full w-full rounded-md object-cover ring-1"
            />
          </div>
        </header>

        <Markdown
          className="prose w-full dark:prose-invert"
          remarkPlugins={[remarkGfm]}
        >
          {data?.content}
        </Markdown>

        <footer className="flex flex-col gap-10">
          <div className="rounded-md bg-muted p-4 text-sm md:text-base">
            <p className="">
              Category: <a href="category-music.html">Music</a>
            </p>
            <p>
              Tags: <a href="tag-production.html">Production</a>,{" "}
              <a href="tag-music.html">Music</a>
            </p>
          </div>
          <div className="rounded-md bg-muted p-6">
            <h3 className="font-semibold">About the Author</h3>
            <div className="mt-8 flex flex-col items-center justify-center gap-8 md:gap-12 lg:flex-row">
              <img
                src="author-image.webp"
                alt="image-of-the-author"
                className="size-28 rounded-full md:size-32"
              />
              <p className="text-sm md:text-base">
                John Doe is a music producer with over a decade of experience in
                the industry. He has worked with numerous artists and enjoys
                sharing his insights on the creative process.
              </p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
