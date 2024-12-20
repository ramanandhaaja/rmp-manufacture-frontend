import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";

export const NAV_LIST = {
  key: "nav.gen",
  path: "",
  title: "Generated",
  icon: "groupCollapseMenu",
  type: NAV_ITEM_TYPE_COLLAPSE,
  authority: [],
  subMenu: [
    {
      key: "nav.gen.Base.Users",
      path: "/base/users",
      title: "Users",
      icon: "",
      type: NAV_ITEM_TYPE_ITEM,
      authority: [],
      subMenu: [],
    },
  ],
};
