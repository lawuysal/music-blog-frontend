import { useQuery } from "@tanstack/react-query";
import Article from "@/types/ArticleInterface";

type Category = {
  id: string;
  name: string;
};

export default function useArticle(articleId: string) {
  const articleQuery = useQuery<Article, Error>({
    queryKey: ["article", articleId],
    queryFn: () => {
      return fetch(`https://localhost:7208/api/Articles/${articleId}`)
        .then((res) => res.json())
        .then((data) => data);
    },
  });

  const categoryQuery = useQuery<Category, Error>({
    enabled: !!articleQuery.data?.categoryId,
    queryKey: ["category"],
    queryFn: () => {
      return fetch(
        `https://localhost:7208/api/Categories/${articleQuery.data?.categoryId}`,
      )
        .then((res) => res.json())
        .then((data) => data);
    },
  });

  return { articleQuery, categoryQuery };
}
