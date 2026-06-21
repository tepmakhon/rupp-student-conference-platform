import { ROLES } from "../roles";

import studentMenu from "./studentMenu";
import organizationMenu from "./organizationMenu";
import adminMenu from "./adminMenu";

const sidebarMenu = {
  [ROLES.STUDENT]: 
    studentMenu,

  [ROLES.ORGANIZATION]:
    organizationMenu,

  [ROLES.ADMIN]:
    adminMenu,
};

export default sidebarMenu;