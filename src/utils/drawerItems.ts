import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineTeam,
} from "react-icons/ai";
import { FaMoneyCheckAlt, FaRegStar } from "react-icons/fa";
import { DrawerItem } from "../types";
import { Role } from "../constant/role";

export const drawerItems = (role: Role): DrawerItem[] => {
  if (!role) return [];
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case Role.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard/admin`,
          icon: AiOutlineHome,
        },
        {
          title: "Manage Riders",
          path: `/dashboard/admin/riders`,
          icon: AiOutlineTeam,
        },
        {
          title: "Manage Drivers",
          path: `/dashboard/admin/drivers`,
          icon: AiOutlineUser,
        },
        {
          title: "Trips",
          path: `/dashboard/admin/trips`,
          icon: AiOutlineCalendar,
        },
        {
          title: "Payments",
          path: `/dashboard/admin/payments`,
          icon: FaMoneyCheckAlt,
        },
        {
          title: "Reviews",
          path: `/dashboard/admin/reviews`,
          icon: FaRegStar,
        }
      );
      break;

    case Role.DRIVER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard/driver`,
          icon: AiOutlineHome,
        },
        {
          title: "My Trips",
          path: `/dashboard/driver/trips`,
          icon: AiOutlineCalendar,
        },
        {
          title: "Profile",
          path: `/dashboard/driver/profile`,
          icon: AiOutlineUser,
        },
        {
          title: "Payment History",
          path: `/dashboard/driver/payments`,
          icon: FaMoneyCheckAlt,
        }
      );
      break;

    case Role.RIDER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard/rider`,
          icon: AiOutlineHome,
        },
        {
          title: "My Rides",
          path: `/dashboard/rider/rides`,
          icon: AiOutlineCalendar,
        },
        {
          title: "Profile",
          path: `/dashboard/rider/profile`,
          icon: AiOutlineUser,
        },
        {
          title: "Payment History",
          path: `/dashboard/rider/payments`,
          icon: FaMoneyCheckAlt,
        },
        {
          title: "Give Review",
          path: `/dashboard/rider/reviews`,
          icon: FaRegStar,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};
