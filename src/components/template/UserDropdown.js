import React, { useState } from "react";
import { Avatar, Dropdown } from "components/ui";
import withHeaderItem from "utils/hoc/withHeaderItem";
import useAuth from "utils/hooks/useAuth";
// import { useSelector } from 'react-redux'
// import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import appConfig from "configs/app.config";
import { VscKey } from "react-icons/vsc";
import SettingsModal from "components/custom/ModalSettings";
// import { VscSettingsGear } from "react-icons/vsc";

export const UserDropdown = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hrisNavigate } = appConfig;
  // bind this
  // const userInfo = useSelector((state) => state.auth.user)

  const { signOut, user } = useAuth();

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const dropdownItemList = [
    {
      label: "Change Password",
      icon: <VscKey />,
      onClick: handleSettingsClick,
    },
  ];

  const UserAvatar = (
    <div className={classNames(className, "flex items-center")}>
      <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 205, marginTop: "20%", marginRight: "20px" }}
        renderTitle={UserAvatar}
        placement="bottom-start"
      >
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1 flex justify-between items-center !text-[#2E3133]"
            onClick={item.onClick}
          >
            {/* <Link className="gap-2 flex justify-between items-center" to={item.path}> */}
            <span>{item.label}</span>
            <span className="text-lg">{item.icon}</span>
            {/* </Link> */}
          </Dropdown.Item>
        ))}
        {/* <Dropdown.Item variant="divider" /> */}

        <Dropdown.Item eventKey="Sign Out">
          <a
            href={hrisNavigate}
            target="_blank"
            className="gap-2 flex justify-between items-center w-full"
          >
            <span>Go To HRIS</span>
            <span className="text-lg">
              <HiOutlineUserGroup />
            </span>
          </a>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={signOut}
          eventKey="Sign Out"
          className="gap-2 flex justify-between items-center !text-[#DA2A27]"
        >
          <span>Log Out</span>
          <span className="text-lg">
            <FiLogOut />
          </span>
        </Dropdown.Item>
      </Dropdown>
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default withHeaderItem(UserDropdown);
