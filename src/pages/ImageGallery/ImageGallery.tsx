import ImageCard from "./ImageCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDOPOINTS, BASE_URL } from "@/api/endpoints";
import LoadingBar from "@/components/ui/LoadingBar";
import ImageGalleryUpload from "./ImageGalleryUpload";

type Image = {
  id: string;
  fileName: string;
  fileExtension: string;
  fileSizeInBytes: number;
  filePath: string;
  fileCreatedAt: string;
};

export default function ImageGallery() {
  const [tab, setTab] = useState("newest");
  const handleTabChange = (value: string) => {
    setTab(value);
  };
  const galleryImagesQuery = useQuery<Image[], Error>({
    queryKey: ["gallery-images"],
    queryFn: () => {
      return fetch(ENDOPOINTS.GALLERY_IMAGES).then((res) => res.json());
    },
    select: (data) => {
      const sortedData = [...data];
      if (tab === "oldest") {
        sortedData.reverse();
      }
      return sortedData;
    },
  });

  if (galleryImagesQuery.isLoading) {
    return <LoadingBar />;
  }

  if (galleryImagesQuery.isError) {
    return <div>Error: {galleryImagesQuery.error.message}</div>;
  }

  return (
    <div className="mx-auto mt-10 flex max-w-screen-xl flex-col items-center justify-center gap-8 lg:mt-20">
      <div className="flex w-full items-center justify-center gap-4 xl:justify-start">
        <Tabs defaultValue="newest" value={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
        </Tabs>
        <ImageGalleryUpload />
      </div>
      <div className="grid w-10/12 grid-cols-1 place-items-center items-center justify-center gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:w-full xl:grid-cols-4">
        {galleryImagesQuery.data?.map((image: Image) => (
          <ImageCard
            key={image.id}
            imageId={image.id}
            imageUrl={BASE_URL + "/" + image.filePath}
            imageName={image.fileName}
            imageExtension={image.fileExtension}
            imageCreatedAt={image.fileCreatedAt}
            imageSizeInBytes={image.fileSizeInBytes}
          />
        ))}
      </div>
    </div>
  );
}
