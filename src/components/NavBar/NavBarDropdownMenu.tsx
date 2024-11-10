import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { toast } from "../ui/use-toast";
import { TokenContext, TokenContextType } from "@/context/TokenContext";
import { useContext, useState } from "react";

export default function NavBarDropdownMenu() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext) as TokenContextType;
  const [dialogOpen, setDialogOpen] = useState(false);

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

  function LoginButton() {
    if (token) {
      return (
        <DropdownMenuItem onClick={() => setDialogOpen(true)}>
          Logout
        </DropdownMenuItem>
      );
    }
    return (
      <NavLink to={"/Login"}>
        <DropdownMenuItem>Login</DropdownMenuItem>
      </NavLink>
    );
  }

  return (
    <>
      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              className="flex items-center justify-center gap-2"
            >
              Menu
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Pages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <NavLink to={"/"}>
              <DropdownMenuItem>Home</DropdownMenuItem>
            </NavLink>
            <NavLink to={"/article-gallery"}>
              <DropdownMenuItem>Articles</DropdownMenuItem>
            </NavLink>
            <NavLink to={"/image-gallery"}>
              <DropdownMenuItem>Gallery</DropdownMenuItem>
            </NavLink>
            <NavLink to={"/about"}>
              <DropdownMenuItem>About</DropdownMenuItem>
            </NavLink>
            <DropdownMenuItem className="invisible"></DropdownMenuItem>
            <DropdownMenuLabel>Manage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {token && (
              <NavLink to={"/article-creation"}>
                <DropdownMenuItem>Article Creation</DropdownMenuItem>
              </NavLink>
            )}
            <LoginButton />
            <DropdownMenuItem className="invisible"></DropdownMenuItem>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ModeToggle />
          </DropdownMenuContent>
        </DropdownMenu>
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
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
