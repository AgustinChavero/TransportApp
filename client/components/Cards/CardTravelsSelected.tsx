"use client";

import { CardTravelProps } from "../../app/admin/dashboard/travels/page";

// components

const CardSelectedTravel: React.FC<CardTravelProps> = (props) => {
  const { selectedTravel } = props;

  return (
    <>
      <div className="relative mb-6 mt-16 flex min-w-0 flex-col  flex-wrap justify-center break-words rounded-lg bg-white px-6 py-20 shadow-xl ">
        <div className="flex w-full justify-center px-4">
          <div className="relative flex justify-center text-center font-bold">
            {selectedTravel ? <div>Id: {selectedTravel?.userId}</div> : <p>No user selected</p>}
          </div>
        </div>

        <div className="mt-20 flex w-full flex-col justify-center gap-4 px-4 text-center lg:pt-4">
          <span className="block text-xl font-bold uppercase tracking-wide text-blueGray-600">
            Id del chofer
          </span>
          <p className="text-sm text-blueGray-400">{selectedTravel?.chauffeurId}</p>

          <span className="block text-xl font-bold uppercase tracking-wide text-blueGray-600">
            Origen:
          </span>
          <p className="text-sm text-blueGray-400">{selectedTravel?.origin}</p>

          <span className="block text-xl font-bold uppercase tracking-wide text-blueGray-600">
            Destino:
          </span>
          <span className="text-sm text-blueGray-400">{selectedTravel?.destination}</span>
        </div>

        <div className="w.aut mt-12 flex flex-col gap-8 text-center ">
          {selectedTravel ? (
            <>
              <h6 className=" w-auto  text-xl font-semibold leading-normal text-blueGray-700">
                {selectedTravel.travel}
              </h6>
              {/* render other details of selected user */}
            </>
          ) : (
            <p>No user selected</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CardSelectedTravel;
