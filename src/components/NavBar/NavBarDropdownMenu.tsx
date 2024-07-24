import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function NavBarDropdownMenu() {
  const navigate = useNavigate();
  return (
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
          <DropdownMenuItem onClick={() => navigate("/image-gallery")}>
            Gallery
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
          <DropdownMenuItem onClick={() => navigate("/article-creation")}>
            Article Creation
          </DropdownMenuItem>
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
  );
}
