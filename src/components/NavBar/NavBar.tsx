import { useNavigate } from "react-router-dom";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import NavBarNormalMenu from "./NavBarNormalMenu";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <header className="mx-auto w-10/12 max-w-screen-xl">
      <nav className="mt-3 flex flex-col items-center gap-5 md:mt-5 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:flex-row lg:justify-items-center">
        <div
          className="flex h-fit cursor-pointer items-center justify-start gap-2 justify-self-start"
          onClick={() => navigate("/")}
        >
          <h1 className="text-3xl font-semibold lg:text-2xl">Ray's</h1>
          <h1 className="inline-block bg-gradient-to-r from-primary to-destructive bg-clip-text text-3xl font-semibold text-transparent lg:text-2xl">
            Blog
          </h1>
        </div>

        <NavBarDropdownMenu />
        <NavBarNormalMenu />
      </nav>
    </header>
  );
}
