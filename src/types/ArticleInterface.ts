export default interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
  imageDesc: string;
  categoryId: string;
  tags: string[];
}
