import { ENDOPOINTS } from "@/api/endpoints";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { formatDate, parseMSSQLDate, formatFileSize } from "@/lib/utility";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Calendar, Clipboard, Check } from "lucide-react";
import { useState } from "react";

export default function ImageCard({
  imageId,
  imageUrl,
  imageName,
  imageExtension,
  imageCreatedAt,
  imageSizeInBytes,
}: {
  imageId: string;
  imageUrl: string;
  imageName: string;
  imageExtension: string;
  imageCreatedAt: string;
  imageSizeInBytes: number;
}) {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  const deleteImageMutation = useMutation({
    mutationFn: handleImageDelete,
    onSuccess: () => {
      toast({
        title: "Delete Successful",
        description: "The image has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
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
    <div className="">
      <Card className="h-fit w-72">
        <CardContent className="p-0 pb-4">
          <img
            className="h-48 w-72 rounded-tl-lg rounded-tr-lg bg-muted object-contain ring-1"
            src={imageUrl}
            alt=""
          />
        </CardContent>
        <CardHeader className="pb-4 pl-6 pt-0">
          <CardTitle className="text-xl">
            {imageName}
            {imageExtension}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} />{" "}
              {formatDate(parseMSSQLDate(imageCreatedAt))}
            </div>
            <Separator orientation="vertical" className="h-5" />
            <p>{formatFileSize(imageSizeInBytes)}</p>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button
            className="w-[7.5rem] gap-2"
            disabled={copied}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied...
              </>
            ) : (
              <>
                <Clipboard size={16} />
                Copy Link
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            className="text-sm"
            onClick={() => deleteImageMutation.mutate(imageId)}
          >
            <Trash2 size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
