import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Plus } from "lucide-react";

export default function NavBarNormalMenu() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden gap-6 md:flex">
        <Link to={"/"} className="flex items-center gap-2 text-lg md:text-base">
          Home
        </Link>
        <Link
          to={"/programming"}
          className="flex items-center gap-2 text-lg md:text-base"
        >
          Programming
        </Link>
        <Link
          to={"/music"}
          className="flex items-center gap-2 text-lg md:text-base"
        >
          Music
        </Link>
        <Link
          to={"/about"}
          className="flex items-center gap-2 text-lg md:text-base"
        >
          About
        </Link>
      </div>
      <div className="hidden gap-2 md:flex">
        <Button
          variant={"outline"}
          onClick={() => navigate("/article-creation")}
        >
          <Plus />
        </Button>
        <Button
          variant={"secondary"}
          className="hidden md:flex"
          onClick={() => navigate("/contact")}
        >
          Contact
        </Button>
        <Button className="hidden md:flex" onClick={() => navigate("/login")}>
          Login
        </Button>
        <ModeToggle />
      </div>
    </>
  );
}
