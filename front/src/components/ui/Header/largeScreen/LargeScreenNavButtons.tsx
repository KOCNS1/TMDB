import { NavLink } from "react-router-dom";
import { classNames } from "../../../../utils/classNames";
import { navigation } from "../Header";

const LargeScreenNavButtons = () => (
  <div className="hidden lg:ml-6 lg:block" data-cy="LargeScreenNavButtons">
    <div className="flex space-x-4">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            classNames(
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "px-3 py-2 rounded-md text-sm font-medium"
            )
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  </div>
);

export default LargeScreenNavButtons;
