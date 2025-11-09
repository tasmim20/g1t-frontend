"use client";

import { DrawerItem } from "@/src/types";
import { drawerItems } from "@/src/utils/drawerItems";
import { Role } from "@/src/constant/role";
import SidebarItem from "./SideBarItem";

export interface CustomJwtPayload {
  name?: string;
  email?: string;
  role?: string;
}

interface SideBarProps {
  user: CustomJwtPayload | null;
}

const SideBar = ({ user }: SideBarProps) => {
  const userRole = user?.role as Role | undefined; // cast to Role safely
  const userEmail = user?.email;

  return (
    <div className="w-64 bg-white h-full shadow-md flex flex-col">
      {/* User Info */}
      {userEmail && (
        <div className="p-4 border-b">
          <p className="text-sm text-gray-500">{userRole}</p>
        </div>
      )}

      {/* Sidebar Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col">
          {userRole
            ? drawerItems(userRole).map((item: DrawerItem, index: number) => (
                <SidebarItem key={index} item={item} />
              ))
            : null}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
