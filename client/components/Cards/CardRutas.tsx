import PropTypes from "prop-types";
import Image from "next/image";

// components

import TableDropdown from "../Dropdowns/TableDropdown";

export default function CardTable({ color }: any) {
  return (
    <>
      <div
        className={
          "relative mb-6 flex w-full min-w-0 flex-col break-words rounded   shadow-lg " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <h3
                className={
                  "text-lg font-semibold " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Estadisticas de Rutas
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full border-collapse items-center bg-transparent">
            <thead>
              <tr className="mx-auto flex w-full items-center justify-between ">
                <th
                  className={
                    " border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                    (color === "light"
                      ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                      : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                  }
                >
                  Ruta
                </th>
                <th
                  className={
                    " border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                    (color === "light"
                      ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                      : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                  }
                >
                  Ingreso promedio
                </th>
                <th
                  className={
                    " border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                    (color === "light"
                      ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                      : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    " border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                    (color === "light"
                      ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                      : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                  }
                >
                  Users
                </th>
                <th
                  className={
                    " border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                    (color === "light"
                      ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                      : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                  }
                >
                  Completion
                </th>
                <th
                  className={
                    " border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase " +
                    (color === "light"
                      ? "border-blueGray-100 bg-blueGray-50 text-blueGray-500"
                      : "border-blueGray-500 bg-blueGray-600 text-blueGray-200")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr className="flex w-full justify-between">
                <th className="flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <Image
                    src="/Image/bootstrap.jpg"
                    className="h-12 w-12 rounded-full border bg-white"
                    alt="..."
                    width={20}
                    height={20}
                  ></Image>{" "}
                  <span
                    className={
                      "ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Argon Design System
                  </span>
                </th>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  $2,500 USD
                </td>
                <td className=" relative flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <i className="fas fa-circle mr-2 text-orange-500"></i>
                  <p className="absolute left-11">pending</p>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex">
                    <Image
                      src="/Image/team-1-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-2-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-3-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-4-470x470.png"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                  </div>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="relative flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="- absolute  left-11 w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                        <div
                          style={{ width: "60%" }}
                          className="flex flex-col justify-center  bg-red-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                  <TableDropdown />
                </td>
              </tr>
              <tr className="flex w-full justify-between">
                <th className="flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <Image
                    src="/Image/angular.jpg"
                    className="h-12 w-12 rounded-full border bg-white"
                    alt="..."
                    width={20}
                    height={20}
                  ></Image>{" "}
                  <span
                    className={
                      "ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Angular Now UI Kit PRO
                  </span>
                </th>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  $1,800 USD
                </td>
                <td className=" relative flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <i className="fas fa-circle mr-2 text-emerald-500"></i>
                  <p className="absolute left-11">completed</p>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex">
                    <Image
                      src="/Image/team-1-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-2-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-3-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-4-470x470.png"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                  </div>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="relative flex items-center">
                    <span className="mr-2">100%</span>
                    <div className="absolute  left-11 w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-emerald-200 text-xs">
                        <div
                          style={{ width: "100%" }}
                          className="flex flex-col justify-center  bg-emerald-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                  <TableDropdown />
                </td>
              </tr>
              <tr className="flex w-full justify-between">
                <th className="flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <Image
                    src="/Image/sketch.jpg"
                    className="h-12 w-12 rounded-full border bg-white"
                    alt="..."
                    width={20}
                    height={20}
                  ></Image>{" "}
                  <span
                    className={
                      "ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Black Dashboard Sketch
                  </span>
                </th>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  $3,150 USD
                </td>

                <td className=" relative flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <i className="fas fa-circle mr-2 text-red-500"></i>
                  <p className="absolute left-11"> delayed</p>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex">
                    <Image
                      src="/Image/team-1-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-2-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-3-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-4-470x470.png"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                  </div>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="relative flex items-center">
                    <span className="mr-2">73%</span>
                    <div className="ive absolute left-11 w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                        <div
                          style={{ width: "73%" }}
                          className="flex flex-col justify-center  bg-red-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                  <TableDropdown />
                </td>
              </tr>
              <tr className="flex w-full justify-between">
                <th className="flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <Image
                    src="/Image/react.jpg"
                    className="h-12 w-12 rounded-full border bg-white"
                    alt="..."
                    width={20}
                    height={20}
                  ></Image>{" "}
                  <span
                    className={
                      "ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    React Material Dashboard
                  </span>
                </th>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  $4,400 USD
                </td>

                <td className=" relative flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <i className="fas fa-circle mr-2  text-teal-500"></i>
                  <p className="absolute left-11"> on schedule</p>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex">
                    <Image
                      src="/Image/team-1-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-2-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-3-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-4-470x470.png"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                  </div>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="relative flex items-center">
                    <span className="mr-2">90%</span>
                    <div className="absolute  left-11 w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-teal-200 text-xs">
                        <div
                          style={{ width: "90%" }}
                          className="flex flex-col justify-center  bg-teal-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                  <TableDropdown />
                </td>
              </tr>
              <tr className="flex w-full justify-between">
                <th className="flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <Image
                    src="/Image/vue.jpg"
                    className="h-12 w-12 rounded-full border bg-white"
                    alt="..."
                    width={20}
                    height={20}
                  ></Image>{" "}
                  <span
                    className={
                      "ml-3 font-bold " + +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    React Material Dashboard
                  </span>
                </th>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  $2,200 USD
                </td>
                <td className=" relative flex items-center  border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <i className="fas fa-circle mr-2 text-emerald-500"></i>
                  <p className="absolute left-11">completed</p>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex">
                    <Image
                      src="/Image/team-1-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-2-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-3-800x800.jpg"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                    <Image
                      src="/Image/team-4-470x470.png"
                      alt="..."
                      width={20}
                      height={20}
                      className="-ml-4 h-10 w-10 rounded-full border-2 border-blueGray-50 shadow"
                    ></Image>
                  </div>
                </td>
                <td className=" flex items-center border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="relative flex items-center">
                    <span className="mr-2">100%</span>
                    <div className="absolute  left-11 w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-emerald-200 text-xs">
                        <div
                          style={{ width: "100%" }}
                          className="flex flex-col justify-center  bg-emerald-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" border-l-0 border-r-0 border-t-0 p-4 px-6 text-right align-middle text-xs">
                  <TableDropdown />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
