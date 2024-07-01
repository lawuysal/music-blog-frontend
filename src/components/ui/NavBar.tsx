import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="mt-3 flex flex-col items-center justify-around gap-5 md:mt-5 md:flex-row">
      <div>
        <h1 className="cursor-pointer text-2xl" onClick={() => navigate("/")}>
          Ray's Blog
        </h1>
      </div>
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
            <DropdownMenuItem onClick={() => navigate("/")}>
              Home
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/programming")}>
              Programming
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/music")}>
              Music
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/about")}>
              About
            </DropdownMenuItem>
            <DropdownMenuItem className="invisible"></DropdownMenuItem>
            <DropdownMenuLabel>Manage</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/Contact")}>
              Contact
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/Login")}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem className="invisible"></DropdownMenuItem>
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ModeToggle />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden md:flex">
        <Button asChild variant={"link"}>
          <Link to={"kek"}>Home</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to={"kek"}>Programming</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to={"kek"}>Music</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link to={"kek"}>About</Link>
        </Button>
      </div>
      <div className="hidden gap-2 md:flex">
        <Button variant={"secondary"} className="hidden md:flex">
          Contact
        </Button>
        <Button className="hidden md:flex">Login</Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
