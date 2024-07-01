import { useNavigate } from "react-router-dom";
import NavBarDropdownMenu from "./NavBarDropdownMenu";
import NavBarNormalMenu from "./NavBarNormalMenu";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="mt-3 flex flex-col items-center justify-around gap-5 md:mt-5 md:flex-row">
      <div>
        <h1 className="cursor-pointer text-2xl" onClick={() => navigate("/")}>
          Ray's Blog
        </h1>
      </div>

      <NavBarDropdownMenu />
      <NavBarNormalMenu />
    </nav>
  );
}
