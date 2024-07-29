import { ENDOPOINTS } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

type ArticleImage = {
  id: string;
  fileName: string;
  fileExtension: string;
  fileSizeInBytes: number;
  filePath: string;
  fileCreatedAt: string;
};

export default function useArticleImage(imageId: string) {
  const articleImageQuery = useQuery<ArticleImage, Error>({
    enabled: imageId !== undefined,
    queryKey: ["article-image", imageId],
    queryFn: () => {
      return fetch(`${ENDOPOINTS.ARTICLE_IMAGES}/${imageId}`)
        .then((res) => res.json())
        .then((data) => data);
    },
  });

  return articleImageQuery;
}
