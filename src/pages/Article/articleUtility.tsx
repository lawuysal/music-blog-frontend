import { Button } from "@/components/ui/button";
import { parseMSSQLDate, formatDate } from "@/lib/utility";
import { ReactNode } from "react";

export function handleFormattedDate(dbDate: string | undefined): string {
  if (!dbDate) return "";

  const date = parseMSSQLDate(dbDate);
  const formattedDate = formatDate(date);
  return formattedDate;
}

export function handleCategoryLink(category: string | undefined): ReactNode {
  return <Button variant={"link"}>{category}</Button>;
}

export function handleTags(tags: string[] | undefined): ReactNode {
  if (!tags) return <></>;

  return (
    <>
      {tags.map((tag, index) => (
        <Button key={index} variant={"link"}>
          #{tag}
        </Button>
      ))}
    </>
  );
}

export function RenderArticleImage(
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
