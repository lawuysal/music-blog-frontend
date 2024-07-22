import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  handleCategoryLink,
  handleFormattedDate,
  handleTags,
  RenderArticleImage,
} from "./articleUtility";

import useArticle from "./useArticle.tsx";
import LoadingBar from "@/components/ui/LoadingBar.tsx";

export default function Article() {
  const { articleQuery, categoryQuery } = useArticle(
    "081baf03-35fd-4529-4c53-08dcaa557f95",
  );

  if (articleQuery.isLoading) {
    return <LoadingBar />;
  }

  if (articleQuery.isError) {
    return <div>Error: {`${articleQuery.error}`}</div>;
  }

  return (
    <main className="mx-auto mb-48 flex w-10/12 max-w-screen-md flex-col items-center justify-center md:w-3/4 md:gap-y-16 lg:w-3/5">
      <article className="flex w-full max-w-screen-xl flex-col gap-12">
        <header className="mt-10 flex max-w-screen-2xl flex-col items-center justify-center gap-10 md:mt-20">
          <div className="flex items-center justify-center self-start">
            <h1 className="text-center text-4xl font-semibold md:text-left md:text-6xl">
              {articleQuery.data?.title || "Loading..."}
            </h1>
          </div>
          <div className="flex w-full flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
            <p>Author: Ray Maschine</p>
            <time dateTime="2024-07-01">
              Published: {handleFormattedDate(articleQuery.data?.date)}
            </time>
          </div>
          <div className="w-full object-cover">
            {RenderArticleImage(
              articleQuery.data?.imageUrl,
              articleQuery.data?.imageDesc,
            )}
          </div>
        </header>

        <Markdown
          className="prose w-full dark:prose-invert"
          remarkPlugins={[remarkGfm]}
        >
          {JSON.parse(articleQuery.data?.content || '""')}
        </Markdown>

        <footer className="flex flex-col gap-10">
          <div className="rounded-md bg-muted p-4 text-sm md:text-base">
            <p className="">
              Category:{" "}
              {categoryQuery.isLoading
                ? "Loading..."
                : handleCategoryLink(categoryQuery.data?.name)}
            </p>
            <p>Tags: {handleTags(articleQuery.data?.tags)}</p>
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
