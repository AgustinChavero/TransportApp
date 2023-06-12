import React from "react";
import { pageData } from "../../assets/data";

// components

export default function CardPageVisits() {
  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
        <div className="mb-0 rounded-t border-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-1 flex-grow px-4">
              <h3 className="text-base font-semibold text-blueGray-700">Flujo de Navegación</h3>
            </div>
            <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
              <button
                className="mb-1 mr-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600"
                type="button"
              >
                Ver Todos
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="w-full border-collapse items-center bg-transparent">
            <thead className="flex justify-evenly">
              <tr className="flex justify-evenly">
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Nombre de página
                </th>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Visitas
                </th>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Usuarios unicos
                </th>
                <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-blueGray-100 bg-blueGray-50 px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-blueGray-500">
                  Estadística
                </th>
              </tr>
            </thead>
            <tbody className="border-2">
              {pageData.map((page) => (
                <tr className="flex justify-evenly" key={page.id}>
                  <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                    {page.name}
                  </th>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    {page.visits}
                  </td>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    {page.uniqueUsers}
                  </td>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    {parseFloat(page.bounceRate) >= 0 ? (
                      <React.Fragment>
                        <i className="fas fa-arrow-up mr-4 w-auto text-emerald-500"></i>
                        {page.bounceRate}%
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <i className="fas fa-arrow-down mr-4 w-auto text-red-500"></i>
                        {-parseFloat(page.bounceRate)}%
                      </React.Fragment>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
