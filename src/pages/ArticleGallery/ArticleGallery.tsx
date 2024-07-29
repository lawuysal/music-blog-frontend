import GalleryCard from "./ArticleGalleryCard";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "@/components/ui/LoadingBar";
import Article from "@/types/ArticleInterface";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ArticleGallery() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("newest");
  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const articleGalleryQuery = useQuery<Article[], Error>({
    queryKey: ["article-gallery"],
    queryFn: () =>
      fetch("https://localhost:7208/api/Articles/").then((res) => res.json()),
    select: (data) => {
      const sortedData = [...data];
      if (tab === "oldest") {
        sortedData.reverse();
      }
      return sortedData;
    },
  });

  if (articleGalleryQuery.isLoading) {
    return <LoadingBar />;
  }
  if (articleGalleryQuery.isError) {
    return <div>Error: {articleGalleryQuery.error.message}</div>;
  }

  return (
    <div className="mx-auto mt-10 flex max-w-screen-xl flex-col items-center justify-center gap-8 md:mt-16 lg:mt-20">
      <div className="flex w-full items-center justify-center gap-4 xl:justify-start">
        <Tabs defaultValue="newest" value={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="secondary"
          className="flex items-center justify-center gap-2"
          onClick={() => navigate("/article-creation")}
        >
          <PencilLine size={16} /> Create
        </Button>
      </div>
      <div className="grid w-10/12 grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:w-full xl:grid-cols-4">
        {articleGalleryQuery.data?.map((article) => (
          <GalleryCard
            key={article.id}
            title={article.title}
            categoryId={article.categoryId}
            articleId={article.id}
            imageId={article.articleImageId}
            imageDesc={article.imageDesc}
            date={article.date}
          />
        ))}
      </div>
    </div>
  );
}
