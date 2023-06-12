"use client"
import React from "react";
import { createPopper } from "@popperjs/core/lib/createPopper";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
import { useRef } from "react";

const NotificationDropdown = () => {
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
    <>
      <div className=" relative w-48">
        <a
          className=" px-3 py-1 text-blueGray-500"
          href="#pablo"
          ref={btnDropdownRef}
          onClick={(e) => {
            e.preventDefault();
            dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
          }}
        >
          <i className="fas fa-ellipsis-v w-auto"></i>
        </a>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            "absolute right-0  z-50  w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg"
          }
        >
          <a
            href="#pablo"
            className={
              "block w-48 whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
            }
            onClick={(e) => e.preventDefault()}
          >
            Action
          </a>
          <a
            href="#pablo"
            className={
              "block w-48 whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
            }
            onClick={(e) => e.preventDefault()}
          >
            Another action
          </a>
          <a
            href="#pablo"
            className={
              "block w-48 whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
            }
            onClick={(e) => e.preventDefault()}
          >
            Something else here
          </a>
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
