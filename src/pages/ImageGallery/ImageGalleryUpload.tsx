import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CloudUpload } from "lucide-react";
import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDOPOINTS } from "@/api/endpoints";
import { toast } from "@/components/ui/use-toast";
import { TokenContext, TokenContextType } from "@/context/TokenContext";

export default function ImageGalleryUpload() {
  const { token } = useContext(TokenContext) as TokenContextType;
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageName, setImageName] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const uploadImageMutation = useMutation({
    mutationFn: handleUpload,
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Upload Successful",
        description: `"${imageName}" has been uploaded successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      setImage(undefined);
      setImageName("");
      setDialogOpen(false);
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setImage(file);
  }

  function handleImageNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageName(e.target.value);
  }

  function handleUpload() {
    const formData = new FormData();
    if (image) {
      formData.append("File", image);
    }
    formData.append("FileName", imageName);
    return fetch(ENDOPOINTS.UPLOAD_GALLERY_IMAGE, {
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
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="flex items-center justify-center gap-2"
        >
          <CloudUpload size={16} />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a New Image</DialogTitle>
          <DialogDescription>
            Please do not upload more than 15 MB.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 md:gap-3">
          <Label>Choose an Image:</Label>
          <Input type="file" accept="image/*," onChange={handleImageChange} />
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-3">
          <Label>Image Name:</Label>
          <Input
            type="text"
            value={imageName}
            onChange={handleImageNameChange}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={uploadImageMutation.isPending}
            onClick={() => uploadImageMutation.mutate()}
          >
            Upload
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
