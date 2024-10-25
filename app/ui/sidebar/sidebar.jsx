import React from "react";
import { MdDashboard } from "react-icons/md";
import MenuLink from "./menuLink";
import Image from "next/image";
import logo from "@/public/assets/logo/logoWhite.png";

const Sidebar = () => {
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
      ],
    },
  ];
  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-col items-center gap-2 pb-2 border-b">
          <Image src={logo} alt="Brand Logo" width={80} height={80}></Image>
          <h2 className="text-3xl font-bold">Admin Panel</h2>
        </div>
        <ul>
          {menuItems.map((item, i) => (
            <li key={i} className="flex flex-col gap-2">
              <span className="text-2xl font-bold mt-5">{item.category}</span>
              {item.lists.map((list, i) => (
                <MenuLink key={i} list={list}></MenuLink>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
