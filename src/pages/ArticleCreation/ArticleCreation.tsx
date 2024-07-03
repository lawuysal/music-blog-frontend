import { useState } from "react";
import Markdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ArticleCreation() {
  const [markdown, setMarkdown] = useState<string>("");
  return (
    <div className="mx-auto mb-48 mt-20 grid w-10/12 max-w-screen-xl grid-cols-1 items-center justify-center justify-items-center gap-y-16">
      <div className="flex w-full flex-col gap-4 md:w-3/5">
        <Label htmlFor="markdown-edit">Markdown:</Label>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          id="markdown-edit"
        ></Textarea>
      </div>

      <div className="flex max-w-screen-xl flex-col gap-4 md:w-3/5">
        <Label htmlFor="article-preview">Preview:</Label>
        <article
          id="article-preview"
          className="flex max-w-screen-xl flex-col gap-12 rounded-md p-8 ring-1"
        >
          <header className="mt-10 flex max-w-screen-2xl flex-col items-center justify-center gap-10 md:mt-20">
            <div className="flex items-center justify-center self-start">
              <h1 className="text-center text-4xl font-semibold md:text-left md:text-6xl">
                Why Music Production Can't Be Simplified
              </h1>
            </div>
            <div className="flex flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
              <p>Author: Ray Maschine</p>
              <time dateTime="2024-07-01">Published: July 1, 2024</time>
            </div>
            <div className="w-full object-cover">
              <img
                src="public\music-article-images\01.jpg"
                alt="music production"
                className="h-full w-full rounded-md object-cover ring-1"
              />
            </div>
          </header>

          <Markdown className="prose w-full dark:prose-invert">
            {markdown}
          </Markdown>
        </article>
      </div>
    </div>
  );
}
