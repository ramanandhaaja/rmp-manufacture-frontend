import { Bell, User } from "lucide-react";
import { useSelector } from "react-redux";
import useUser from "../utils/hooks/useUser";
import useAuth from "../utils/hooks/useAuth";
import { useState } from "react";
import PopupMenu from "./PopUpMenu";

const Profile = () => {
  const { token } = useSelector((state) => state.auth.session);
  const { getUser } = useUser();
  const { handleSignOut } = useAuth();
  const user = getUser();

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <div>
          <PopupMenu
            items={[
              {
                label: "Logout",
                onClick: handleSignOut,
              },
            ]}
          >
            <button className="flex items-center">
              <User className="w-7 h-7 rounded-full border-2 border-gray-600 mb-1" />
            </button>
          </PopupMenu>
        </div>
        <div className="flex flex-col">
          {user && (
            <>
              <span className="font-semibold text-gray-800">{user.name}</span>
              <span className="text-sm text-gray-500">
                {user.roles.map((role) => role)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
