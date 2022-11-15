import { BellIcon } from "@heroicons/react/20/solid";
import { useStateContext } from "../../../../context/auth/auth.context";

const UserInfoResponsiveScreen = () => {
  const { state, dispatch } = useStateContext();

  return (
    <div className="flex items-center px-5">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="ml-3">
        <div className="text-base font-medium text-white">
          {state.authUser?.name}
        </div>
        <div className="text-sm font-medium text-gray-400">
          {state.authUser?.email}
        </div>
      </div>
      <button
        type="button"
        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default UserInfoResponsiveScreen;
