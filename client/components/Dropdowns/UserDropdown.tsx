"use client"
import React from "react";
import { createPopper } from "@popperjs/core/lib/createPopper.js";
import Image from "next/image";
import logo from "../../assets/imagenes/UrbanIsoLogo.png";
import { useState } from "react";
import { useRef } from "react";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef<HTMLAnchorElement>(null);
  const popoverDropdownRef = useRef<HTMLDivElement>(null);
  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start",
      });
      setDropdownPopoverShow(true);
    }
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <div
      className="relative flex w-auto justify-end"
      onClick={(e) => {
        e.preventDefault();
        dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
      }}
    >
      <a
        className="block text-blueGray-500"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex h-20 w-20 items-center ">
          <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-400 p-2 text-sm shadow-lg shadow-black ">
            <Image
              alt="..."
              className=" w-full border-none p-1 align-middle bg-blend-overlay"
              src={logo}
              width={100}
              height={100}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "min-w-48 absolute top-8 z-50 float-left mt-12 w-96 list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <a
          href="#pablo"
          className={
            "block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="my-2 h-0 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a>
      </div>
    </div>
  );
};

export default UserDropdown;
