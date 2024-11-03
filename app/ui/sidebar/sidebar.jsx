"use client";
import React from "react";
import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/assets/logo/logoWhite.png";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      category: "Pages",
      lists: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Achievements",
          path: "/dashboard/achievements",
          icon: <MdDashboard />,
        },
        {
          title: "Blogs",
          path: "/dashboard/blogs",
          icon: <MdDashboard />,
        },
        {
          title: "Brand Solutions",
          path: "/dashboard/brand-solutions",
          icon: <MdDashboard />,
        },
        {
          title: "Career",
          path: "/dashboard/career",
          icon: <MdDashboard />,
        },
        {
          title: "Contacts",
          path: "/dashboard/contacts",
          icon: <MdDashboard />,
        },
        {
          title: "Home",
          path: "/dashboard/home",
          icon: <MdDashboard />,
        },
        {
          title: "How We Work",
          path: "/dashboard/how-we-works",
          icon: <MdDashboard />,
        },
        {
          title: "Media Solutions",
          path: "/dashboard/media-solutions",
          icon: <MdDashboard />,
        },
        {
          title: "Meet Our Team",
          path: "/dashboard/meet-our-team",
          icon: <MdDashboard />,
        },
        {
          title: "Partnership",
          path: "/dashboard/partnership",
          icon: <MdDashboard />,
        },
        {
          title: "Tech Solutions",
          path: "/dashboard/tech-solutions",
          icon: <MdDashboard />,
        },
        {
          title: "The Edge",
          path: "/dashboard/the-edge",
          icon: <MdDashboard />,
        },
        {
          title: "Who We Are",
          path: "/dashboard/who-we-are",
          icon: <MdDashboard />,
        },
        {
          title: "Work",
          path: "/dashboard/work",
          icon: <MdDashboard />,
        },
      ],
    },
    {
      category: "Settings",
      lists: [
        {
          title: "Manage Users",
          path: "/dashboard/manage-users",
          icon: <MdDashboard />,
        },
        {
          title: "Settings Option 1",
          path: "/dashboard/option1",
          icon: <MdDashboard />,
        },
        {
          title: "Settings Option 2",
          path: "/dashboard/option2",
          icon: <MdDashboard />,
        },
      ],
    },
  ];

  const MenuLink = ({ list }) => {
    const normalizedPath = pathname.replace(/\/+$/, ""); // Remove trailing slash
    const listPath = list.path.replace(/\/+$/, ""); // Remove trailing slash from list path
    const isActive = normalizedPath === listPath;

    return (
      <Link
        href={list.path}
        className={`flex items-center gap-2 group transition-colors duration-500 px-3 py-4 rounded-lg ${
          isActive
            ? "bg-[#125b5c] text-white"
            : "bg-gray-900 hover:bg-[#125b5c]"
        }`}
      >
        <span className="text-2xl">{list.icon}</span>
        <span
          className={`text-lg font-[500] duration-500 ${
            isActive ? "ml-1" : "group-hover:ml-1"
          }`}
        >
          {list.title}
        </span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center gap-2 pb-2 border-b">
        <Image src={logo} alt="Brand Logo" width={80} height={80} />
        <h2 className="text-3xl font-bold">Admin Panel</h2>
      </div>
      <ul>
        {menuItems.map((item, i) => (
          <li key={i} className="flex flex-col gap-2">
            <span className="text-2xl font-bold mt-5">{item.category}</span>
            {item.lists.map((list, j) => (
              <MenuLink key={j} list={list} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
