import { Button } from "@/components/ui/button";
import { parseMSSQLDate, formatDate } from "@/lib/utility";
import { ReactNode } from "react";
import useArticleImage from "../ArticleGallery/useArticleImage.tsx";
import { BASE_URL } from "@/api/endpoints.ts";
import { NavigateFunction } from "react-router-dom";
import slugify from "slugify";

export function handleFormattedDate(dbDate: string | undefined): string {
  if (!dbDate) return "";

  const date = parseMSSQLDate(dbDate);
  const formattedDate = formatDate(date);
  return formattedDate;
}

export function HandleCategoryLink(
  category: string | undefined,
  navigate: NavigateFunction,
): ReactNode {
  return (
    <Button
      variant={"link"}
      onClick={() =>
        navigate(
          `/article-gallery/${slugify(category || "all", { lower: true })}/all`,
        )
      }
    >
      {category}
    </Button>
  );
}

export function HandleTags(
  tags: string[] | undefined,
  navigate: NavigateFunction,
): ReactNode {
  if (!tags) return <></>;

  return (
    <>
      {tags.map((tag, index) => (
        <Button
          key={index}
          variant={"link"}
          onClick={() => navigate(`/article-gallery/all/${tag}`)}
        >
          #{tag}
        </Button>
      ))}
    </>
  );
}

export function RenderArticleImage({
  imageId,
  imageDesc,
}: {
  imageId: string;
  imageDesc: string | undefined;
}): ReactNode {
  const articleImage = useArticleImage(imageId);
  if (!articleImage.isLoading) {
    return (
      <img
        src={`${BASE_URL}/${articleImage.data?.filePath}`}
        alt={imageDesc || "Article Image"}
        className="h-full max-h-[180px] w-full rounded-md object-cover ring-1 sm:max-h-[250px] md:max-h-[300px] lg:max-h-[450px]"
      />
    );
  } else {
    return (
      <div className="flex h-[450px] max-h-[180px] w-full flex-col items-center justify-center rounded-md bg-muted object-cover ring-1 sm:max-h-[250px] md:max-h-[300px] lg:max-h-[450px]">
        <p className="text-muted-foreground">There is no</p>
        <p className="text-muted-foreground">image</p>
      </div>
    );
  }
}

export function RenderArticleCreationImage(
  imageSrc: string | ArrayBuffer | undefined | null,
  imageDesc: string | undefined | null,
): ReactNode {
  if (imageSrc) {
    return (
      <img
        src={imageSrc as string}
        alt={imageDesc || "Article Image"}
        className="h-full max-h-[180px] w-full rounded-md object-cover ring-1 sm:max-h-[250px] md:max-h-[300px] lg:max-h-[450px]"
      />
    );
  } else {
    return (
      <div className="flex h-[450px] max-h-[180px] w-full flex-col items-center justify-center rounded-md bg-muted object-cover ring-1 sm:max-h-[250px] md:max-h-[300px] lg:max-h-[450px]">
        <p className="text-muted-foreground">There is no</p>
        <p className="text-muted-foreground">image</p>
      </div>
    );
  }
}
