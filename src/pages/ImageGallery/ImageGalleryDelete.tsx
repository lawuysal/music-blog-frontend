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
import { useState } from "react";

export default function ImageGalleryDelete({ imageId }: { imageId: string }) {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteImageMutation = useMutation({
    mutationFn: handleImageDelete,
    onSuccess: () => {
      toast({
        title: "Delete Successful",
        description: "The image has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      setDialogOpen(false);
    },
  });

  function handleImageDelete(id: string) {
    return fetch(`${ENDOPOINTS.GALLERY_IMAGES}/${id}`, {
      method: "DELETE",
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
            This action cannot be undone. This will permanently delete the image
            and remove it from the server.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteImageMutation.mutate(imageId)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
