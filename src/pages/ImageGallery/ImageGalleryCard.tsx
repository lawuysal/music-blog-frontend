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
import { formatDate, parseMSSQLDate, formatFileSize } from "@/lib/utility";
import { Calendar, Clipboard, Check } from "lucide-react";
import { useState } from "react";
import ImageGalleryDelete from "./ImageGalleryDelete";

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
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <div className="">
      <Card className="flex h-[25rem] w-[19rem] flex-col justify-between">
        <CardContent className="p-0 pb-4">
          <img
            className="h-48 w-[19rem] rounded-tl-lg rounded-tr-lg bg-muted object-contain ring-1"
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
          <ImageGalleryDelete imageId={imageId} />
        </CardFooter>
      </Card>
    </div>
  );
}
