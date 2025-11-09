"use client";

import Link from "next/link";
import { DrawerItem } from "@/src/types";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
  const pathname = usePathname();
  const linkPath = item.path;
  const isActive = pathname === linkPath;

  return (
    <Link
      href={linkPath}
      className={`flex items-center gap-3 p-3 text-black rounded-md mb-1 transition-colors ${
        isActive ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
      }`}
    >
      {item.icon && <item.icon className="w-5 h-5" />}
      <span>{item.title}</span>
    </Link>
  );
};

export default SidebarItem;
