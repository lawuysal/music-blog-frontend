import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCategory from "./useCategory";
import { useNavigate } from "react-router-dom";
import { handleFormattedDate } from "../Article/articleUtility";
import { BASE_URL } from "@/api/endpoints";
import { Share } from "lucide-react";
import useArticleImage from "./useArticleImage";
import LoadingBar from "@/components/ui/LoadingBar";
import ArticleGalleryDelete from "./ArticleGalleryDelete";

export default function GalleryCard({
  title,
  categoryId,
  articleId,
  imageId,
  imageDesc,
  date,
}: {
  title: string;
  categoryId: string;
  articleId: string;
  imageId: string;
  imageDesc: string;
  date: string;
}): ReactNode {
  const category = useCategory(categoryId);
  const articleImage = useArticleImage(imageId);
  const navigate = useNavigate();

  if (articleImage.isLoading) {
    return <LoadingBar />;
  }

  return (
    <Card className="ease- grid grid-rows-1 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] dark:ring-1">
      <CardHeader>
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="flex gap-1">
          <p>{handleFormattedDate(date)}</p>
          <Separator orientation="vertical" />
          <p>{category?.name}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {RenderArticleCardImage(`${articleImage.data?.filePath}`, imageDesc)}
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button onClick={() => navigate(`/article/${articleId}`)}>
          Read More
        </Button>
        <Button variant="secondary">
          <Share size={16} />
        </Button>
        <ArticleGalleryDelete articleId={articleId} />
      </CardFooter>
    </Card>
  );
}

function RenderArticleCardImage(
  imageSrc: string | ArrayBuffer | undefined | null,
  imageDesc: string | undefined | null,
): ReactNode {
  if (imageSrc) {
    return (
      <img
        src={`${BASE_URL}/${imageSrc}`}
        alt={imageDesc || "Article Image"}
        className="max-h-[200px] w-full rounded-md object-cover ring-1 md:max-h-[150px] lg:max-h-[175px] xl:max-h-[250px]"
      />
    );
  } else {
    return (
      <div className="flex h-screen max-h-[200px] w-full flex-col items-center justify-center rounded-md bg-muted object-cover ring-1 md:max-h-[150px] lg:max-h-[175px] xl:max-h-[250px]">
        <p className="text-muted-foreground">There is no</p>
        <p className="text-muted-foreground">image</p>
      </div>
    );
  }
}