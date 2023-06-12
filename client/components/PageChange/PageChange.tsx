import React from "react";

// core components

export default function PageChange(props: any) {
  return (
    <div>
      <div
        className="fixed left-0 top-0 z-40 h-full w-full bg-cover"
        style={{
          backgroundImage: "url('/img/img-1-1000x600.jpg')",
        }}
      ></div>
      <div className="absolute left-0 top-0 z-50 block h-full w-full bg-black bg-opacity-50"></div>
      <div className="relative top-0 z-50 mx-auto my-32 max-w-sm text-center">
        <div className="mb-4 block">
          <i className="fas fa-circle-notch mx-auto animate-spin text-6xl text-white"></i>
        </div>
        <h4 className="text-lg font-medium text-white">Loading page contents for: {props.path}</h4>
      </div>
    </div>
  );
}
