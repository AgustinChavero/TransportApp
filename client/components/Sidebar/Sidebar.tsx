"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import NotificationDropdown from "../Dropdowns/TableDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { HiBriefcase, HiOutlineMap, HiUserCircle } from "react-icons/hi";

interface SidebarProps {
  // props
}

const Sidebar: React.VFC<SidebarProps> = (
  {
    /* destructured props */
  }
) => {
  const [collapseShow, setCollapseShow] = useState<string>("hidden");
  const router = useRouter();

  const handleCollapse = () => {
    setCollapseShow("bg-white m-2 py-3 px-6");
  };

  const handleHideCollapse = () => {
    setCollapseShow("hidden");
  };
  return (
    <>
      <nav className="relative z-10 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:bottom-0 md:left-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/* Toggler */}
          <button
            className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/admin/dashboard">Urban Administración</Link>
          {/* User */}
          <ul className="flex list-none flex-wrap items-center md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "absolute left-0 right-0 top-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="mb-4 block border-b border-solid border-blueGray-200 pb-4 md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">Notus NextJS</Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mb-4 mt-6 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="h-12 w-full rounded border border-solid border-blueGray-500  bg-white  px-3 py-2 text-base font-normal leading-snug text-blueGray-600 placeholder-blueGray-300 shadow-none outline-none focus:outline-none"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pb-4 pt-1 text-xs font-bold uppercase text-blueGray-500 no-underline md:min-w-full">
              Admin Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="flex items-center justify-start gap-2">
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" className="w-auto">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 6C2 4.34315 3.34315 3 5 3H19C20.6569 3 22 4.34315 22 6V15C22 16.6569 20.6569 18 19 18H13V19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H9C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19H11V18H5C3.34315 18 2 16.6569 2 15V6ZM5 5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44772 19.5523 5 19 5H5Z"
                      fill="#000000"
                    ></path>{" "}
                  </g>
                </svg>{" "}
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                {<HiUserCircle className="h-7 w-7" />}
                <Link href="/admin/dashboard/users">Users</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                {<HiUserCircle className="h-7 w-7" />}
                <Link href="/admin/dashboard/chauffeurs">Chauffeurs</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                {<HiBriefcase className="h-7 w-7" />}
                <Link href="/admin/dashboard/travels">Travels</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                {<HiBriefcase className="h-7 w-7" />}

                <Link href="/admin/dashboard/passages">Passages</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" className="w-auto">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Edit / Table_Add">
                      {" "}
                      <path
                        id="Vector"
                        d="M11 4H15.8002C16.9203 4 17.4801 4 17.9079 4.21799C18.2842 4.40973 18.5905 4.71547 18.7822 5.0918C19 5.5192 19 6.07899 19 7.19691V9.0002L11.0001 9.0001M11 4H6.2002C5.08009 4 4.51962 4 4.0918 4.21799C3.71547 4.40973 3.40973 4.71547 3.21799 5.0918C3 5.51962 3 6.08009 3 7.2002V9M11 4L11.0001 9.0001M3 9V15M3 9L11.0001 9.0001M3 15V16.8002C3 17.9203 3 18.4801 3.21799 18.9079C3.40973 19.2842 3.71547 19.5905 4.0918 19.7822C4.5192 20 5.07899 20 6.19691 20H11.0002L11.0001 9.0001M3 15H11M15 16H18M18 16H21M18 16V19M18 16V13"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <Link href="/admin/dashboard/tables">Tables</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                {<HiOutlineMap className="h-7 w-7" />}
                <Link href="/admin/dashboard/maps">Maps</Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}

            {/* Navigation */}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pb-4 pt-1 text-xs font-bold uppercase text-blueGray-500 no-underline md:min-w-full">
              No Layout Pages
            </h6>
            {/* Navigation */}

            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="flex items-center justify-start gap-2">
                <svg
                  fill="#000000"
                  height="25px"
                  width="25px"
                  version="1.2"
                  baseProfile="tiny"
                  id="Layer_1"
                  className="w-auto"
                  viewBox="-351 153 256 256"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M-112.7,181.7h-219.8c-6.9,0-12.7,5.8-12.7,12.7V340c0,6.9,5.8,12.7,12.7,12.7h79.5v21.2h-20.2c-3.5,0-6.4,2.9-6.4,6.4v0.9 c0,3.5,2.9,6.4,6.4,6.4h101.4c3.5,0,6.4-2.9,6.4-6.4v-0.9c0-3.5-2.9-6.4-6.4-6.4h-20.2v-21.2h79.5c6.9,0,12.7-5.8,12.7-12.7V194.4 C-100,187.4-105.8,181.7-112.7,181.7z M-222.6,345c-4,0.1-7.3-3.2-7.3-7.3c0-4,3.3-7.3,7.3-7.3s7.3,3.3,7.3,7.3 C-215.3,341.7-218.6,345-222.6,345z M-115.6,324.7H-329V197.5h213.5V324.7z"></path>{" "}
                      <polygon points="-175.5,261 -215.6,282.3 -249.9,212.2 -299.9,310 -143.6,310 "></polygon>{" "}
                      <circle cx="-163.3" cy="235.2" r="17.8"></circle>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <Link href="/home">Landing Page</Link>
              </li>

              <li className="flex items-center justify-start gap-2">
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Layer_1"
                  width="25px"
                  height="25px"
                  viewBox="0 0 256 201"
                  enableBackground="new 0 0 256 201"
                  className="w-auto"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M154.195,61.371V39.514h-12.047v10.777l-14-12.791L81.113,79.601l7.151,8.058l7.252-6.547V130.5h64.897V81.514l7.135,6.547 l7.339-7.856L154.195,61.371z M238.25,143.813V13.875c0-6.523-5.289-11.813-11.813-11.813H29.563 c-6.523,0-11.813,5.289-11.813,11.813v129.938L2,175.313v11.813c0,6.523,5.289,11.813,11.813,11.813h228.375 c6.523,0,11.813-5.289,11.813-11.813v-11.813L238.25,143.813z M104.125,175.313l1.122-11.813h45.752l1.122,11.813H104.125z M218.563,143.813H37.438V21.75h181.125V143.813z"></path>{" "}
                  </g>
                </svg>
                <Link href="/perfil">Profile Page</Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pb-4 pt-1 text-xs font-bold uppercase text-blueGray-500 no-underline md:min-w-full">
              Technologies
            </h6>
            {/* Navigation */}
            <ul className="flex list-none flex-col md:mb-4 md:min-w-full md:flex-col">
              <li className="inline-flex">CSS Components</li>

              <li className="inline-flex">Typescrypt</li>

              <li className="inline-flex">Javascript</li>

              <li className="inline-flex">NextJS</li>

              <li className="inline-flex">React</li>

              <li className="inline-flex">Redux</li>

              <li className="inline-flex">Express</li>

              <li className="inline-flex">Firebase</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
