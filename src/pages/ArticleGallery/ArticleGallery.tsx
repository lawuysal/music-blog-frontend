import GalleryCard from "./ArticleGalleryCard";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "@/components/ui/LoadingBar";
import Article from "@/types/ArticleInterface";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { ENDOPOINTS } from "@/api/endpoints";
import slugify from "slugify";
import { Titled } from "react-titled";
import { Helmet } from "react-helmet-async";
import { useScrollToTop } from "@/lib/utility.ts";

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
  useScrollToTop();
  const [searchParams] = useSearchParams();
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
    queryFn: () => fetch(`${ENDOPOINTS.ARTICLES}`).then((res) => res.json()),
    select: (data) => {
      const sortedData = [...data];

      if (tab === "oldest") {
        sortedData.reverse();
      }
      if (!searchParams.get("category") && !searchParams.get("tag")) {
        return sortedData;
      }
      if (
        categoryIdQuery.data
          ?.map((cat) => slugify(cat.name, { lower: true }))
          .includes(searchParams.get("category") as string)
      ) {
        const foundCategory = categoryIdQuery.data?.find(
          (cat) =>
            slugify(cat.name, { lower: true }) === searchParams.get("category"),
        );
        return sortedData.filter(
          (article) => article.categoryId === foundCategory?.id,
        );
      }
      if (searchParams.get("tag")) {
        return sortedData.filter((article) =>
          JSON.parse(article.tags).includes(searchParams.get("tag")),
        );
      }
      return sortedData;
    },
  });

  if (articleGalleryQuery.isLoading || categoryIdQuery.isLoading) {
    return <LoadingBar text="Loading" />;
  }
  if (articleGalleryQuery.isError) {
    return <div>Error: {articleGalleryQuery.error.message}</div>;
  }

  return (
    <div className="mx-auto mb-10 mt-10 flex max-w-screen-xl flex-col items-center justify-center gap-8 md:mt-16 lg:mt-20">
      <div className="flex w-10/12 flex-col items-center justify-between gap-8 md:flex-row md:gap-4 xl:w-full">
        <div className="text-center md:flex md:flex-col md:text-left">
          <h1 className="text-4xl font-semibold">Articles</h1>
          <p className="text-muted-foreground">
            {!searchParams.get("category") && !searchParams.get("tag")
              ? "All articles"
              : searchParams.get("category")
                ? `Category: ${categories[searchParams.get("category") as string]}`
                : searchParams.get("tag")
                  ? `Tag: ${searchParams.get("tag")}`
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
      <Helmet>
        <meta
          name="description"
          content="Read the latest articles about music production, mixing, mastering, and more from Ray Maschine."
        />
        <meta
          name="keywords"
          content="music production, mixing, mastering, music news, reviews, tutorials"
        />
      </Helmet>
    </div>
  );
}
