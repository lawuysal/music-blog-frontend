import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function ImageCard() {
  return (
    <div>
      <Card className="h-fit w-72">
        <CardContent className="p-0 pb-4">
          <img
            className="h-48 w-72 rounded-tl-lg rounded-tr-lg bg-muted object-contain ring-1"
            src="https://images.unsplash.com/photo-1558423039-2d4b02e50953?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </CardContent>
        <CardHeader className="pb-4 pl-6 pt-0">
          <CardTitle className="text-xl">Image of the FL studio</CardTitle>
          <CardDescription>Uploaded: 21.07.2024</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button>Show</Button>
          <Button variant="secondary">Copy Link</Button>
          <Button variant="destructive" className="text-sm">
            <Trash2 size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
