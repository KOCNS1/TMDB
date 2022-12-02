import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../../../context/auth/auth.context";
import ResponsiveScreenNavButtons from "./ResponsiveScreenNavButtons";
import UserInfoResponsiveScreen from "./UserInfoResponsiveScreen";
import UserProfileBubbleResponsiveScreen from "./UserProfileBubbleResponsiveScreen";

const BurgerMenuContent = ({ handleLogout }: { handleLogout: () => void }) => {
  const { state } = useStateContext();

  return (
    <Disclosure.Panel
      className="lg:hidden"
      as="div"
      data-cy="BurgerMenuContent"
    >
      {({ close }) => (
        <>
          <ResponsiveScreenNavButtons close={close} />

          <div className="border-t border-gray-700 pt-4 pb-3 ">
            {state.loggedIn ? (
              <>
                <UserInfoResponsiveScreen />
                <UserProfileBubbleResponsiveScreen
                  handleLogout={handleLogout}
                />
              </>
            ) : (
              <NavLink
                to={"/auth"}
                className="rounded-md w-3/4 text-center  block border border-transparent bg-blue-500 py-2 px-6 mx-auto text-lg font-medium text-white shadow-md hover:bg-blue-600 shadow-black"
                onClick={() => close()}
                data-cy="login-responsive"
              >
                Login
              </NavLink>
            )}
          </div>
        </>
      )}
    </Disclosure.Panel>
  );
};

export default BurgerMenuContent;
