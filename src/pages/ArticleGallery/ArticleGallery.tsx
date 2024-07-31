import GalleryCard from "./ArticleGalleryCard";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "@/components/ui/LoadingBar";
import Article from "@/types/ArticleInterface";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { ENDOPOINTS } from "@/api/endpoints";
import slugify from "slugify";
import { Titled } from "react-titled";

type Category = {
  id: string;
  name: string;
};

const categories: { [key: string]: string } = {
  "off-topic": "Off Topic",
  reviews: "Reviews",
  tutorials: "Tutorials",
  "music-news": "Music News",
};

export default function ArticleGallery() {
  const { category, tag } = useParams();
  const { token } = useContext(TokenContext) as TokenContextType;
  const navigate = useNavigate();
  const [tab, setTab] = useState("newest");
  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const categoryIdQuery = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => {
      return fetch(ENDOPOINTS.CATEGORIES).then((res) => res.json());
    },
  });

  const articleGalleryQuery = useQuery<Article[], Error>({
    enabled: categoryIdQuery.isSuccess,
    queryKey: ["article-gallery"],
    queryFn: () =>
      fetch("https://localhost:7208/api/Articles/").then((res) => res.json()),
    select: (data) => {
      const sortedData = [...data];
      if (tab === "oldest") {
        sortedData.reverse();
      }
      if (category === "all" && tag === "all") {
        return sortedData;
      }
      if (
        categoryIdQuery.data
          ?.map((cat) => slugify(cat.name, { lower: true }))
          .includes(category as string)
      ) {
        const foundCategory = categoryIdQuery.data?.find(
          (cat) => slugify(cat.name, { lower: true }) === category,
        );
        return sortedData.filter(
          (article) => article.categoryId === foundCategory?.id,
        );
      }
      if (tag) {
        return sortedData.filter((article) =>
          JSON.parse(article.tags).includes(tag),
        );
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
      <div className="flex w-10/12 flex-col items-center justify-between gap-8 md:flex-row md:gap-4 xl:w-full">
        <div className="text-center md:flex md:flex-col md:text-left">
          <h1 className="text-4xl font-semibold">Articles</h1>
          <p className="text-muted-foreground">
            {category === "all" && tag === "all"
              ? "All articles"
              : category !== "all"
                ? `Category: ${categories[category as string]}`
                : tag
                  ? `Tag: ${tag}`
                  : "All articles"}
          </p>
        </div>
        <div className="flex gap-4">
          <Tabs
            defaultValue="newest"
            value={tab}
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="oldest">Oldest</TabsTrigger>
            </TabsList>
          </Tabs>
          {token && (
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-2"
              onClick={() => navigate("/article-creation")}
            >
              <PencilLine size={16} /> Create
            </Button>
          )}
        </div>
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
      <Titled title="Articles | Ray's Blog" />
    </div>
  );
}
