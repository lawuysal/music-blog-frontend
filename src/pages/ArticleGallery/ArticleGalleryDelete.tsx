import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDOPOINTS } from "@/api/endpoints";
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { useState, useContext } from "react";
import { TokenContext, TokenContextType } from "@/context/TokenContext";

export default function ArticleGalleryDelete({
  articleId,
}: {
  articleId: string;
}) {
  const { token } = useContext(TokenContext) as TokenContextType;
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteArticleMutation = useMutation({
    mutationFn: handleArticleDelete,
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Delete Successful",
        description: "The article has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["article-gallery"] });
      setDialogOpen(false);
    },
  });

  function handleArticleDelete(id: string) {
    return fetch(`${ENDOPOINTS.ARTICLES}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text || "An error occurred");
          });
        }
        return;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            article and remove it from the server.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteArticleMutation.mutate(articleId)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
