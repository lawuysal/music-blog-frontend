import React from "react";
import ImageCard from "./ImageCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";

export default function ImageGallery() {
  return (
    <div className="mx-auto mt-10 flex max-w-screen-xl flex-col items-center justify-center gap-8 lg:mt-20">
      <div className="flex w-full items-center justify-center gap-4">
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="oldest">Oldest</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant={"secondary"}
          className="flex items-center justify-center gap-2"
        >
          <CloudUpload size={16} />
          Upload
        </Button>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-1 place-items-center items-center justify-center gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </div>
  );
}
