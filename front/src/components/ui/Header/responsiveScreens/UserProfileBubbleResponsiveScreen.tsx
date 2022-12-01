import { NavLink } from "react-router-dom";
import { classNames } from "../../../../utils/classNames";
import { userMenu } from "../Header";

const UserProfileBubbleResponsiveScreen = ({
  handleLogout,
}: {
  handleLogout: () => void;
}) => {
  return (
    <div className="mt-3 space-y-1 px-2">
      {userMenu.map((item, key) => (
        <NavLink
          to={item.to}
          key={key}
          className={({ isActive }) =>
            classNames(
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block px-3 py-2 rounded-md text-base font-medium"
            )
          }
          {...(item.action && {
            onClick: () => item.action(handleLogout),
          })}
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default UserProfileBubbleResponsiveScreen;
