import { NavLink } from "react-router-dom";
import { useStateContext } from "../../../../context/auth/auth.context";
import UserProfileBubble from "./UserProfileBubble";

const LargeScreenMenuContent = ({
  handleLogout,
}: {
  handleLogout: () => void;
}) => {
  const { state } = useStateContext();

  return (
    <div className="hidden lg:ml-4 lg:block" data-cy="LargeScreenMenuContent">
      {!state.loggedIn ? (
        <NavLink
          to={"/auth"}
          className="rounded-md border border-transparent bg-blue-500 py-2 px-6 text-base font-medium text-white shadow-md hover:bg-blue-600"
        >
          Login
        </NavLink>
      ) : (
        <UserProfileBubble handleLogout={handleLogout} />
      )}
    </div>
  );
};

export default LargeScreenMenuContent;
