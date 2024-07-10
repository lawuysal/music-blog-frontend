import { ReactNode, useState } from "react";
import Markdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getMSSQLDate, formatDate } from "@/lib/utility";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RenderArticleImage } from "../Article/articleUtility";

export default function ArticleCreation() {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDesc, setImageDesc] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [dbDate] = useState<string>(getMSSQLDate());
  const [markdown, setMarkdown] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const date = new Date();
  const formattedDate = formatDate(date);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  function handleCreateArticle() {
    const testArticleJson = {
      id: 0,
      title: title,
      date: dbDate,
      content: JSON.stringify(markdown),
      imageUrl: imageSrc,
      imageDesc: imageDesc,
      category: category,
      tags: tags,
    };

    console.log(JSON.stringify(tags));
  }

  return (
    <div className="mx-auto mb-48 mt-10 grid w-10/12 max-w-screen-md grid-cols-1 items-center justify-center justify-items-center gap-y-8 md:mt-20 md:w-3/4 md:gap-y-16 lg:w-3/5">
      {/* Title */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="article-title">Title:</Label>
        <Input
          type="text"
          id="article-title"
          placeholder="Type a Nice Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Image */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="article-image">Image:</Label>
        <Input
          type="file"
          id="article-image"
          accept="image/*,"
          onChange={handleImageChange}
        />
      </div>

      {/* Image Description */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="article-image-alt">Image Description:</Label>
        <Input
          type="text"
          id="article-image-alt"
          placeholder="Make it short..."
          value={imageDesc}
          onChange={(e) => setImageDesc(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="category">Category:</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem
                value="music-news"
                onClick={() => setCategory("music-news")}
              >
                Music News
              </SelectItem>
              <SelectItem
                value="reviews"
                onClick={() => setCategory("reviews")}
              >
                Reviews
              </SelectItem>
              <SelectItem
                value="tutorials"
                onClick={() => setCategory("tutorials")}
              >
                Tutorials
              </SelectItem>
              <SelectItem
                value="off-topic"
                onClick={() => setCategory("off-topic")}
              >
                Off Topic
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="tags">Tags:</Label>
        <Input
          type="text"
          id="tags"
          placeholder="Seperate with commas..."
          value={tags}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
        />
      </div>

      {/* Markdown */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="markdown-edit">Markdown:</Label>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          id="markdown-edit"
          placeholder="Type your article here..."
        ></Textarea>
      </div>

      {/* Preview */}
      <div className="flex w-full max-w-screen-xl flex-col gap-2 md:gap-4">
        <Label htmlFor="article-preview">Preview:</Label>
        <article
          id="article-preview"
          className="flex max-w-screen-xl flex-col gap-12 rounded-md p-4 ring-1"
        >
          <header className="mt-10 flex max-w-screen-2xl flex-col items-center justify-center gap-10 md:mt-20">
            <div className="flex items-center justify-center self-start">
              <h1 className="text-center text-4xl font-semibold md:text-left md:text-6xl">
                {title || "Article Title "}
              </h1>
            </div>
            <div className="flex w-full flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
              <p>Author: Ray Maschine</p>
              <time dateTime={date.toISOString()}>
                Published: {formattedDate}
              </time>
            </div>
            <div className="max-h-[180px] w-full object-cover sm:max-h-[250px] md:max-h-[300px] lg:max-h-[450px]">
              {RenderArticleImage(imageSrc, imageDesc)}
            </div>
          </header>

          <Markdown className="prose w-full dark:prose-invert">
            {markdown}
          </Markdown>
        </article>
      </div>
      <div className="flex gap-2 rounded-md p-4 md:gap-4">
        <Button variant={"outline"}>Clean</Button>
        <Button variant={"secondary"}>Save Draft</Button>
        <Button variant={"default"} onClick={handleCreateArticle}>
          Create
        </Button>
      </div>
    </div>
  );
}

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
        John Doe is a music producer with over a decade of experience in the
        industry. He has worked with numerous artists and enjoys sharing his
        insights on the creative process.
      </p>
    </div>
  </div>
</footer>;
