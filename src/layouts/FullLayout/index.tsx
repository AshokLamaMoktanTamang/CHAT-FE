import { Outlet } from "react-router-dom";
import { FC, PropsWithChildren } from "react";

import {
  FullAvatar,
  Card,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@/components";
import { useAuth } from "@/hooks";
import { useWhoAmIQuery } from "@/store/baseApi";

const FullLayout: FC<PropsWithChildren> = ({ children }) => {
  const { logoutHandler } = useAuth();
  const { data: user } = useWhoAmIQuery();

  if (!user) return <>Loading ...</>;

  const { avatarUrl, email, fullName } = user;

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <div className="flex justify-between align-middle">
        <p className="text-lg">CHAT-APP</p>
        <Popover>
          <PopoverTrigger>
            <FullAvatar
              fallback={fullName.charAt(0).toLocaleUpperCase()}
              src={avatarUrl}
            />
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-3">
            <div>
              <p>{fullName}</p>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
            <Button
              onClick={logoutHandler}
              variant={"destructive"}
              className="w-full"
            >
              Log Out
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <Card className="p-4 h-full">{children ?? <Outlet />}</Card>
    </div>
  );
};

export default FullLayout;
