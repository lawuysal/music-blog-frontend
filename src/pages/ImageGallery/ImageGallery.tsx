import ImageCard from "./ImageGalleryCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ENDOPOINTS, BASE_URL } from "@/api/endpoints";
import LoadingBar from "@/components/ui/LoadingBar";
import ImageGalleryUpload from "./ImageGalleryUpload";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { Titled } from "react-titled";

type Image = {
  id: string;
  fileName: string;
  fileExtension: string;
  fileSizeInBytes: number;
  filePath: string;
  fileCreatedAt: string;
};

export default function ImageGallery() {
  const { token } = useContext(TokenContext) as TokenContextType;
  const [tab, setTab] = useState("newest");
  const handleTabChange = (value: string) => {
    setTab(value);
  };
  const galleryImagesQuery = useQuery<Image[], Error>({
    queryKey: ["gallery-images"],
    queryFn: () => {
      return fetch(ENDOPOINTS.GALLERY_IMAGES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
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
      <div className="flex w-10/12 flex-col items-center justify-between gap-8 md:flex-row md:gap-4 xl:w-full">
        <div className="text-center md:flex md:flex-col md:text-left">
          <h1 className="text-4xl font-semibold">Gallery</h1>
          <p className="text-muted-foreground">
            Images to be used in the articles
          </p>
        </div>
        <div className="flex gap-4">
          <Tabs
            defaultValue="newest"
            value={tab}
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="oldest">Oldest</TabsTrigger>
            </TabsList>
          </Tabs>
          <ImageGalleryUpload />
        </div>
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
      <Titled title="Gallery | Ray's Blog" />
    </div>
  );
}
