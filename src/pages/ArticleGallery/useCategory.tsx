import { useQuery } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
};

export default function useCategory(categoryId: string) {
  const categoryQuery = useQuery<Category, Error>({
    enabled: categoryId !== undefined,
    queryKey: ["category", categoryId],
    queryFn: () => {
      return fetch(`https://localhost:7208/api/Categories/${categoryId}`)
        .then((res) => res.json())
        .then((data) => data);
    },
  });

  return categoryQuery.data;
}
