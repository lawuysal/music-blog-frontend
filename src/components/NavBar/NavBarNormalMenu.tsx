import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Plus } from "lucide-react";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function NavBarNormalMenu() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { token, setToken } = useContext(TokenContext) as TokenContextType;
  const navigate = useNavigate();

  function LoginButton() {
    if (token) {
      return (
        <Button variant="destructive" onClick={() => setDialogOpen(true)}>
          Logout
        </Button>
      );
    }
    return <Button onClick={() => navigate("/login")}>Login</Button>;
  }

  function handleLogout() {
    toast({
      title: "Logged out",
      description: "You'll be redirected to the home page.",
    });
    localStorage.removeItem("token");
    setToken(null);
    setDialogOpen(false);
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
    wait().then(() => navigate("/"));
  }

  return (
    <>
      <div className="hidden gap-6 md:flex">
        <Link to={"/"} className="flex items-center gap-2 text-lg md:text-base">
          Home
        </Link>
        <Link
          to={"/article-gallery/all/all"}
          className="flex items-center gap-2 text-lg md:text-base"
        >
          Articles
        </Link>
        <Link
          to={"/image-gallery"}
          className="flex items-center gap-2 text-lg md:text-base"
        >
          Gallery
        </Link>
        <Link
          to={"/about"}
          className="flex items-center gap-2 text-lg md:text-base"
        >
          About
        </Link>
      </div>
      <div className="hidden gap-2 justify-self-end md:flex">
        {token && (
          <Button
            variant={"outline"}
            onClick={() => navigate("/article-creation")}
          >
            <Plus />
          </Button>
        )}
        <LoginButton />
        <ModeToggle />
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              You'll be logged out and redirected to the home page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={() => handleLogout()}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
