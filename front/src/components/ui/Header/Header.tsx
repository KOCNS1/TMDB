import { Disclosure } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/auth/auth.context";
import { logoutUserFn } from "../../../api/auth";
import SearchBar from "../SearchBar";
import BurgerMenu from "./responsiveScreens/BurgerMenu";
import BurgerMenuContent from "./responsiveScreens/BurgerMenuContent";
import LargeScreenMenuContent from "./largeScreen/LargeScreenMenuContent";
import LargeScreenNavButtons from "./largeScreen/LargeScreenNavButtons";

export const navigation = [
  { name: "Home", href: "/" },
  { name: "My List", href: "/list" },
  { name: "Movies", href: "/movies" },
  { name: "TV Shows", href: "/tv" },
];

export const userMenu = [
  {
    name: "Your Profile",
    to: "/profile",
  },
  {
    name: "Settings",
    to: "#",
  },
  {
    name: "Sign out",
    to: "#",
    action: (handleLogout: () => void) => {
      handleLogout();
    },
  },
];

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setOpen }: Props) => {
  const { state, dispatch } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUserFn();
    dispatch({ type: "LOGOUT", payload: { authUser: null } });
    navigate("/");
  };
  return (
    <Disclosure
      as="nav"
      className="bg-gray-800 mt-2 rounded-xl shadow-md shadow-black"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 text-white font-bold">
                  <Link to={"/"}>TMDB</Link>
                </div>
                <LargeScreenNavButtons />
              </div>
              <SearchBar setOpen={setOpen} />
              <BurgerMenu open={open} />
              <LargeScreenMenuContent handleLogout={handleLogout} />
            </div>
          </div>

          <BurgerMenuContent handleLogout={handleLogout} />
        </>
      )}
    </Disclosure>
  );
};

export default Header;
