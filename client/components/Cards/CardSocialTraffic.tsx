import React from "react";

// components

export default function CardSocialTraffic() {
  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <h3 className="text-base font-semibold text-blueGray-700">Social traffic</h3>
            </div>
            <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
              <button
                className="mb-1 mr-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full border-collapse items-center bg-transparent">
            <thead className="thead-light">
              <tr>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Referral
                </th>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Visitors
                </th>
                <th className="min-w-140-px whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  Facebook
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  1,480
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mr-2 ">60%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                        <div
                          style={{ width: "60%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  Facebook
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  5,480
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex flex-col items-center">
                    <span className="mr-2">70%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-emerald-200 text-xs">
                        <div
                          style={{ width: "70%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-emerald-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  Google
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  4,807
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex  flex-col items-center">
                    <span className="mr-2 ">80%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-purple-200 text-xs">
                        <div
                          style={{ width: "80%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-purple-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  Instagram
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  3,678
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex flex-col items-center">
                    <span className="mr-2">75%</span>
                    <div className="relative w-full">
                      <div className="bg-lightBlue-200 flex h-2 overflow-hidden rounded bg-red-200 text-xs">
                        <div
                          style={{ width: "75%" }}
                          className="bg-lightBlue-500 flex flex-col justify-center whitespace-nowrap bg-red-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  twitter
                </th>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  2,645
                </td>
                <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                  <div className="flex flex-col items-center">
                    <span className="mr-2">30%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden rounded bg-orange-200 text-xs">
                        <div
                          style={{ width: "30%" }}
                          className="flex flex-col justify-center whitespace-nowrap bg-emerald-500 text-center text-white shadow-none"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
