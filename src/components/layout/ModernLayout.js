import React, { useEffect } from "react";
import Header from "components/template/Header";
// import SidePanel from "components/template/SidePanel";
import UserDropdown from "components/template/UserDropdown";
// import SideNavToggle from "components/template/SideNavToggle";
// import MobileNav from "components/template/MobileNav";
import SideNav from "components/template/SideNav";
import View from "views";
import Logo from "components/template/Logo";
import { ScrollBar } from "components/ui";
// import { NotificationSvg } from "assets/svg";
import useUser from "utils/hooks/useUser";
import useAuth from "utils/hooks/useAuth";

const HeaderActionsStart = () => {
  return (
    <>
      <div className="side-nav-header">
        <Logo
          imgClass="max-w-[140px]"
          mode={"light"}
          type={"full"}
          // gutter={sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER}
        />
      </div>
    </>
  );
};

const HeaderActionsEnd = () => {
  const { user, getUser } = useUser();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      getUser();
    }
  }, []);
  const capitalizeWords = (str) => {
    if (str !== undefined) {
      return str.replace(/\w\S*/g, function (word) {
        return word.charAt(0) + word.substr(1).toLowerCase();
      });
    }

    return undefined;
  };

  const capitalizeRoles = (roles) => {
    if (Array.isArray(roles) && roles.length > 0) {
      return roles
        .map(
          (role) =>
            role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, " ")
        )
        .join(", ");
    }
    return "Superadmin"; // Default value if no roles are provided
  };

  return (
    <div className="flex ">
      <div className="flex items-center">
        <div className="relative h-10 w-12 justify-center flex items-center">
          {/* <NotificationSvg />
          <div className="h-5 w-6 bg-red-600 text-white flex items-center justify-center absolute top-0 right-0 rounded-md ml-1 mb-1">
            4
          </div> */}
        </div>
      </div>
      <div className="flex border-slate-300 border-r-[1px] my-2 mr-3 ml-3"></div>
      <UserDropdown hoverable={false} />
      <div className="hidden sm:flex flex-col justify-center w-[205px]">
        <p className="text-main-100 font-bold">
          {capitalizeWords(user?.name) ?? "Atalanta Ahlgren"}
        </p>
        <div className="text-slate-500 text-xs">
          {capitalizeRoles(user?.roles)}
        </div>
      </div>
    </div>
  );
};

const ModernLayout = (props) => {
  return (
    <div className="app-layout-modern flex flex-auto flex-col font-nunito pt-3 ">
      <div className="flex flex-col">
        <div className="px-2">
          <Header
            className="border-b border-gray-200 rounded-xl dark:border-gray-700"
            headerEnd={<HeaderActionsEnd />}
            headerStart={<HeaderActionsStart />}
          />
        </div>
        <div className="flex flex-1 ">
          <div className="flex mt-5">
            <SideNav />
          </div>
          <div className="flex flex-1 ">
            <ScrollBar>
              <div className="flex flex-col flex-1 h-full bg-gray-100">
                <div className="py-4 ">
                  <View {...props} />
                </div>
              </div>
            </ScrollBar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
