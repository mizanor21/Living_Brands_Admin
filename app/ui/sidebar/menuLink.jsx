import Link from "next/link";
import React from "react";

const MenuLink = ({ list }) => {
  return (
    <Link
      href={list.path}
      className="flex items-center gap-2 bg-gray-900 hover:bg-[#125b5c] group transition-colors duration-500 px-3 py-5 rounded-lg"
    >
      <span className="text-2xl">{list?.icon}</span>
      <span className="text-lg group-hover:ml-1 duration-500 font-[500]">
        {list?.title}
      </span>
    </Link>
  );
};

export default MenuLink;
