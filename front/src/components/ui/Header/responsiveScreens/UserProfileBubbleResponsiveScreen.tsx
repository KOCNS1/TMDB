import { Disclosure } from "@headlessui/react";
import { userMenu } from "../Header";

const UserProfileBubbleResponsiveScreen = ({
  handleLogout,
}: {
  handleLogout: () => void;
}) => {
  return (
    <div className="mt-3 space-y-1 px-2">
      {userMenu.map((item, key) => (
        <Disclosure.Button
          as="a"
          href="#"
          key={key}
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          {...(item.action && {
            onClick: () => item.action(handleLogout),
          })}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
};

export default UserProfileBubbleResponsiveScreen;
