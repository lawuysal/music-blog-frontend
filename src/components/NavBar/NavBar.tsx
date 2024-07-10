import { useNavigate } from "react-router-dom";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import NavBarNormalMenu from "./NavBarNormalMenu";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <header className="mx-auto w-10/12 max-w-screen-xl">
      <nav className="mt-3 flex flex-col items-center justify-between gap-5 md:mt-5 md:flex-row">
        <div className="flex h-fit items-center justify-center gap-2">
          <h1
            className="cursor-pointer text-3xl font-semibold md:text-2xl"
            onClick={() => navigate("/")}
          >
            Ray's
          </h1>
          <h1
            className="inline-block cursor-pointer bg-gradient-to-r from-primary to-destructive bg-clip-text text-3xl font-semibold text-transparent md:text-2xl"
            onClick={() => navigate("/")}
          >
            Blog
          </h1>
        </div>

        <NavBarDropdownMenu />
        <NavBarNormalMenu />
      </nav>
    </header>
  );
}
