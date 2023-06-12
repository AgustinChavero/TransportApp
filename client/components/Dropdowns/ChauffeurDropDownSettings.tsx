import React from "react";


const ChauffeurDropDownSettings = () => {
  return (
    <div
      className={
        "absolute right-7 top-14  z-50  w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg"
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
  );
};

export default ChauffeurDropDownSettings;
