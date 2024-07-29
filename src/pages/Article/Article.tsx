import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  handleCategoryLink,
  handleFormattedDate,
  handleTags,
  RenderArticleImage,
} from "./articleUtility";
import { useParams } from "react-router-dom";
import { useScrollToTop } from "@/lib/utility.ts";

import useArticle from "./useArticle.tsx";
import LoadingBar from "@/components/ui/LoadingBar.tsx";
import { BASE_URL } from "@/api/endpoints.ts";

export default function Article() {
  useScrollToTop();
  const { articleId } = useParams();
  const { articleQuery, categoryQuery } = useArticle(articleId as string);

  if (articleQuery.isLoading || !articleQuery.data || !categoryQuery.data) {
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
            <h1 className="text-left text-4xl font-semibold md:text-6xl">
              {articleQuery.data?.title || "Loading..."}
            </h1>
          </div>
          <div className="flex w-full flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
            <p>Author: Ray Maschine</p>
            <time dateTime="2024-07-01">
              Published: {handleFormattedDate(articleQuery.data.date)}
            </time>
          </div>
          <div className="w-full object-cover">
            {RenderArticleImage(
              `${BASE_URL}/${articleQuery.data.imageUrl}`,
              articleQuery.data.imageDesc,
            )}
          </div>
        </header>

        <Markdown
          className="prose w-full dark:prose-invert"
          remarkPlugins={[remarkGfm]}
        >
          {JSON.parse(articleQuery.data.content || '""')}
        </Markdown>

        <footer className="flex flex-col gap-10">
          <div className="rounded-md bg-muted p-4 text-sm md:text-base">
            <p className="">
              Category:{" "}
              {categoryQuery.isLoading
                ? "Loading..."
                : handleCategoryLink(categoryQuery.data.name)}
            </p>
            <p>Tags: {handleTags(JSON.parse(articleQuery.data.tags))}</p>
          </div>
        </footer>
      </article>
    </main>
  );
}
