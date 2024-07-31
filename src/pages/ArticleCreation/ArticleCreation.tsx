import { useState, useContext } from "react";
import Markdown from "react-markdown";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getMSSQLDate, formatDate } from "@/lib/utility";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RenderArticleCreationImage } from "../Article/articleUtility";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDOPOINTS } from "@/api/endpoints";
import LoadingBar from "@/components/ui/LoadingBar";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { Titled } from "react-titled";

type Category = {
  id: string;
  name: string;
};

type ArticleDraft = {
  title: string;
  markdown: string;
  imageDesc: string;
  tags: string[];
  categoryId: string;
};

export default function ArticleCreation() {
  const { token } = useContext(TokenContext) as TokenContextType;
  const navigate = useNavigate();
  const articleDraft: ArticleDraft = JSON.parse(
    localStorage.getItem("articleDraft") || "{}",
  );
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [title, setTitle] = useState<string>(articleDraft.title || "");
  const [dbDate] = useState<string>(getMSSQLDate());
  const [markdown, setMarkdown] = useState<string>(articleDraft.markdown || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageDesc, setImageDesc] = useState<string>(
    articleDraft.imageDesc || "",
  );
  const [tags, setTags] = useState<string[]>(articleDraft.tags || []);
  const [categoryId, setCategoryId] = useState<string>(
    articleDraft.categoryId || "",
  );

  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const date = new Date();
  const formattedDate = formatDate(date);

  const categoryIdQuery = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => {
      return fetch(ENDOPOINTS.CATEGORIES).then((res) => res.json());
    },
  });

  const articleCreationMutation = useMutation({
    mutationFn: (formData: FormData) => {
      return fetch(ENDOPOINTS.ARTICLES, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.message);
            });
          }
          return res.json();
        })
        .catch((error) => {
          throw new Error(error.message);
        });
    },
    onError: (error) => {
      toast({
        title: "Article Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Article Created",
        description: `"${title}" has been created successfully.`,
      });
      handleArticleClear(false);
      queryClient.invalidateQueries({ queryKey: ["article-gallery"] });
      const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
      wait().then(() => navigate("/article-gallery"));
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function handleArticleClear(showToast: boolean = true) {
    localStorage.removeItem("articleDraft");
    setTitle("");
    setMarkdown("");
    setImageFile(null);
    setImageSrc(null);
    setImageDesc("");
    setTags([]);
    setCategoryId("");
    if (showToast) {
      toast({
        title: "Article Draft Cleared",
        description: "The article draft has been cleared.",
      });
    }
  }

  function handleArticleDraft() {
    localStorage.setItem(
      "articleDraft",
      JSON.stringify({
        title,
        markdown,
        imageDesc,
        tags,
        categoryId,
      }),
    );
    toast({
      title: "Article Draft Saved",
      description: "The article draft has been saved.",
    });
  }

  function handleCreateArticle() {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("date", dbDate);
    formData.append("content", JSON.stringify(markdown));
    formData.append("articleImageFile", imageFile as Blob);
    formData.append("imageDesc", imageDesc);
    formData.append("tags", JSON.stringify(tags));
    formData.append("categoryId", categoryId);

    if (formData.get("title") === "") {
      setDialogMessage("Title is Empty!");
      return setDialogOpen(true);
    }
    if (formData.get("image") === "null") {
      setDialogMessage("Image is not Selected!");
      return setDialogOpen(true);
    }
    if (formData.get("imageDesc") === "") {
      setDialogMessage("Image Description is Empty!");
      return setDialogOpen(true);
    }
    if (formData.get("categoryId") === "") {
      setDialogMessage("Category is not Selected!");
      return setDialogOpen(true);
    }
    if (formData.get("tags") === "[]" || formData.get("tags") === '[""]') {
      setDialogMessage("Tags are Empty!");
      return setDialogOpen(true);
    }
    if (formData.get("content") === "") {
      setDialogMessage("Markdown is Empty!");
      return setDialogOpen(true);
    }

    articleCreationMutation.mutate(formData);
  }

  if (categoryIdQuery.isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="mx-auto mb-48 mt-10 grid w-10/12 max-w-screen-md grid-cols-1 items-center justify-center justify-items-center gap-y-8 transition-all duration-300 ease-in-out md:mt-20 md:w-3/4 md:gap-y-16 lg:w-3/5">
      {/* Title */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="article-title">Title:</Label>
        <Input
          type="text"
          id="article-title"
          placeholder="Type a Nice Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Image */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="article-image">Image:</Label>
        <Input
          type="file"
          id="article-image"
          accept="image/*,"
          onChange={handleImageChange}
        />
      </div>

      {/* Image Description */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="article-image-alt">Image Description:</Label>
        <Input
          type="text"
          id="article-image-alt"
          placeholder="Make it short..."
          value={imageDesc}
          onChange={(e) => setImageDesc(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="category">Category:</Label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categoryIdQuery.data?.map((category) => (
                <SelectItem value={category.id} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="tags">Tags:</Label>
        <Input
          type="text"
          id="tags"
          placeholder="Seperate with commas..."
          value={tags}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
        />
      </div>

      {/* Markdown */}
      <div className="flex w-full flex-col gap-2 md:gap-4">
        <Label htmlFor="markdown-edit">Markdown:</Label>
        <Textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          id="markdown-edit"
          placeholder="Type your article here..."
        ></Textarea>
      </div>

      {/* Preview */}
      <div className="flex w-full max-w-screen-xl flex-col gap-2 md:gap-4">
        <Label htmlFor="article-preview">Preview:</Label>
        <article
          id="article-preview"
          className="flex max-w-screen-xl flex-col gap-12 rounded-md p-4 ring-1"
        >
          <header className="mt-10 flex max-w-screen-2xl flex-col items-center justify-center gap-10 md:mt-20">
            <div className="flex items-center justify-center self-start">
              <h1 className="text-center text-4xl font-semibold md:text-left md:text-6xl">
                {title || "Article Title "}
              </h1>
            </div>
            <div className="flex w-full flex-col items-start justify-center self-start text-sm text-muted-foreground md:text-base">
              <p>Author: Ray Maschine</p>
              <time dateTime={date.toISOString()}>
                Published: {formattedDate}
              </time>
            </div>
            <div className="max-h-[180px] w-full object-cover sm:max-h-[250px] md:max-h-[300px] lg:max-h-[450px]">
              {RenderArticleCreationImage(imageSrc, imageDesc)}
            </div>
          </header>

          <Markdown className="prose w-full dark:prose-invert">
            {markdown}
          </Markdown>
        </article>
      </div>
      <div className="flex gap-2 rounded-md p-4 md:gap-4">
        <Button variant={"outline"} onClick={() => handleArticleClear()}>
          Clear
        </Button>
        <Button variant={"secondary"} onClick={handleArticleDraft}>
          Save Draft
        </Button>
        <Button variant={"default"} onClick={handleCreateArticle}>
          Create
        </Button>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMessage || "Some of the Fields are Empty!"}
            </DialogTitle>
            <DialogDescription>
              Please fill out all the fields before submitting the article.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Titled title="Article Creation | Ray's Blog" />
    </div>
  );
}

{
  /* <footer className="flex flex-col gap-10">
  <div className="rounded-md bg-muted p-4 text-sm md:text-base">
    <p className="">
      Category: <a href="category-music.html">Music</a>
    </p>
    <p>
      Tags: <a href="tag-production.html">Production</a>,{" "}
      <a href="tag-music.html">Music</a>
    </p>
  </div>
  <div className="rounded-md bg-muted p-6">
    <h3 className="font-semibold">About the Author</h3>
    <div className="mt-8 flex flex-col items-center justify-center gap-8 md:gap-12 lg:flex-row">
      <img
        src="author-image.webp"
        alt="image-of-the-author"
        className="size-28 rounded-full md:size-32"
      />
      <p className="text-sm md:text-base">
        John Doe is a music producer with over a decade of experience in the
        industry. He has worked with numerous artists and enjoys sharing his
        insights on the creative process.
      </p>
    </div>
  </div>
</footer>; */
}
