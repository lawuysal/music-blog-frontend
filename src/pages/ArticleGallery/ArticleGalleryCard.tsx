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
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { useContext } from "react";
import slugify from "slugify";
import { toast } from "@/components/ui/use-toast";

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
  const { token } = useContext(TokenContext) as TokenContextType;
  const category = useCategory(categoryId);
  const articleImage = useArticleImage(imageId);
  const navigate = useNavigate();

  function handleShareLink() {
    toast({ title: "Link Copied", description: "Share it with your friends." });
    return navigator.clipboard.writeText(
      `${window.location.origin}/article/${articleId}`,
    );
  }

  if (articleImage.isLoading) {
    return <LoadingBar />;
  }

  return (
    <Card className="grid grid-rows-1 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] dark:ring-1">
      <CardHeader>
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="flex gap-1">
          <p>{handleFormattedDate(date)}</p>
          <Separator orientation="vertical" />
          <p
            className="cursor-pointer"
            onClick={() =>
              navigate(
                `/article-gallery/${slugify(category?.name || "all", { lower: true })}/all`,
              )
            }
          >
            {category?.name}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="my-auto flex h-full flex-col items-center justify-center">
        <RenderArticleCardImage
          imageSrc={articleImage.data?.filePath}
          imageDesc={imageDesc}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => navigate(`/article/${articleId}`)}>
          Read More
        </Button>
        <div className="flex justify-end gap-1">
          <Button
            variant="secondary"
            onClick={handleShareLink}
            className="flex gap-2"
          >
            <Share size={16} /> Share
          </Button>
          {token && <ArticleGalleryDelete articleId={articleId} />}
        </div>
      </CardFooter>
    </Card>
  );
}

function RenderArticleCardImage({
  imageSrc,
  imageDesc,
}: {
  imageSrc: string | undefined;
  imageDesc: string;
}): ReactNode {
  if (imageSrc) {
    return (
      <img
        src={`${BASE_URL}/${imageSrc}`}
        alt={imageDesc || "Article Image"}
        className="h-[250px] w-full rounded-md object-cover ring-1"
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
