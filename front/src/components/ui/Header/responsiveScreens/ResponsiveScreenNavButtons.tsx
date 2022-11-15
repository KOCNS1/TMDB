import { MutableRefObject } from "react";
import { NavLink } from "react-router-dom";
import { classNames } from "../../../../utils/classNames";
import { navigation } from "../Header";

const ResponsiveScreenNavButtons = ({
  close,
}: {
  close: (
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>
  ) => void;
}) => (
  <div className="space-y-1 px-2 pt-2 pb-3">
    {navigation.map((item) => (
      <NavLink
        to={item.href}
        key={item.name}
        className={({ isActive, isPending }) =>
          classNames(
            isActive
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block px-3 py-2 rounded-md text-base font-medium"
          )
        }
        onClick={() => close()}
      >
        {item.name}
      </NavLink>
    ))}
  </div>
);

export default ResponsiveScreenNavButtons;
