import GalleryCard from "./GalleryCard";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "@/components/ui/LoadingBar";
import Article from "@/types/ArticleInterface";

export default function ArticleGallery() {
  const articleGalleryQuery = useQuery<Article[], Error>({
    queryKey: ["article-gallery"],
    queryFn: () =>
      fetch("https://localhost:7208/api/Articles/")
        .then((res) => res.json())
        .then((data) => data),
  });

  if (articleGalleryQuery.isLoading) {
    return <LoadingBar />;
  }
  if (articleGalleryQuery.isError) {
    return <div>Error: {articleGalleryQuery.error.message}</div>;
  }

  return (
    <div className="mx-auto mt-10 flex max-w-screen-xl items-center justify-center md:mt-16 lg:mt-20 xl:mt-32">
      <div className="grid w-10/12 grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 xl:w-full xl:grid-cols-4">
        {articleGalleryQuery.data?.map((article) => (
          <GalleryCard
            key={article.id}
            title={article.title}
            categoryId={article.categoryId}
            articleId={article.id}
            imageUrl={article.imageUrl}
            imageDesc={article.imageDesc}
            date={article.date}
          />
        ))}
      </div>
    </div>
  );
}
