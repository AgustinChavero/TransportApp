"use client";
import Image from "next/image";
import { CardChauffeurProfileProps } from "@component/app/admin/dashboard/chauffeurs/page";

const CardChauffeurProfile: React.FC<CardChauffeurProfileProps> = ({ selectedChauffeur }) => {
  const containerStyles =
    "relative mb-6 mt-16 flex min-w-0 flex-col break-words rounded-lg bg-white shadow-xl";
  const pxStyles = "px-6";
  const flexWrapStyles = "flex flex-wrap justify-center";
  const imageContainerStyles = "flex w-full justify-center px-4";
  const imageStyles =
    "absolute -top-10 right-44 -m-16 h-auto w-48 overflow-hidden rounded-full border-none align-middle shadow-xl lg:-ml-16";
  const textCenterStyles = "mt-20 w-full px-4 text-center";
  const statisticsStyles = "flex justify-center py-4 pt-8 lg:pt-4";
  const statisticStyles = "mr-4 p-3 text-center";
  const nameStyles = "w-auto text-xl font-semibold leading-normal text-blueGray-700";
  const detailsStyles =
    "mb-2 mt-0 flex w-auto justify-center text-sm font-bold uppercase leading-normal text-blueGray-400";

  return (
    <>
      <div className={containerStyles}>
        <div className={pxStyles}>
          <div className={flexWrapStyles}>
            <div className={imageContainerStyles}>
              <div className="relative flex justify-center border-2">
                {selectedChauffeur ? (
                  <div>
                    <Image
                      src={selectedChauffeur.img}
                      alt="imagen de perfil"
                      className={imageStyles}
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <p>No chauffeur selected</p>
                )}
              </div>
            </div>
            <div className={textCenterStyles}>
              <div className={statisticsStyles}>
                <div className={statisticStyles}>
                  <span className="block text-xl font-bold uppercase tracking-wide text-blueGray-600">
                    22
                  </span>
                  <span className="text-sm text-blueGray-400">Viajes</span>
                </div>
                <div className={statisticStyles}>
                  <span className="block text-xl font-bold uppercase tracking-wide text-blueGray-600">
                    10
                  </span>
                  <span className="text-sm text-blueGray-400">Pedidos</span>
                </div>
                <div className="p-3 text-center lg:mr-4">
                  <span className="block text-xl font-bold uppercase tracking-wide text-blueGray-600">
                    89
                  </span>
                  <span className="text-sm text-blueGray-400">Car-pools</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w.auto mt-12 flex flex-col gap-8 text-center ">
            {selectedChauffeur ? (
              <>
                <h3 className={nameStyles}>{selectedChauffeur.displayName}</h3>
                {/* render other details of selected chauffeur */}
              </>
            ) : (
              <p>No chauffeur selected</p>
            )}

            {selectedChauffeur ? (
              <div className="flex justify-center">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-auto border-2 "
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z"
                    fill="gray"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0901 22.5958C11.2059 22.6753 11.2981 22.7366 11.3626 22.7788L11.4687 22.8472C11.7933 23.0504 12.2061 23.0508 12.5307 22.8476L12.6375 22.7788C12.7019 22.7366 12.7941 22.6753 12.9099 22.5958C13.1415 22.4367 13.4685 22.2041 13.8591 21.9041C14.6386 21.3054 15.6801 20.4322 16.7247 19.3336C18.7857 17.1661 21 13.9725 21 10.1818C21 7.75381 20.0571 5.42084 18.3719 3.69728C16.6859 1.97296 14.3943 1 12 1C9.60571 1 7.31415 1.97296 5.62814 3.69728C3.94288 5.42084 3 7.75381 3 10.1818C3 13.9725 5.21434 17.1661 7.27531 19.3336C8.31993 20.4322 9.36136 21.3054 10.1409 21.9041C10.5315 22.2041 10.8585 22.4367 11.0901 22.5958ZM12 3C10.1508 3 8.37273 3.75107 7.05815 5.09552C5.74283 6.44073 5 8.26992 5 10.1818C5 13.2007 6.78566 15.9162 8.72469 17.9554C9.68007 18.9602 10.6386 19.7646 11.3591 20.3179C11.6046 20.5065 11.8215 20.6651 12 20.7918C12.1785 20.6651 12.3954 20.5065 12.6409 20.3179C13.3614 19.7646 14.3199 18.9602 15.2753 17.9554C17.2143 15.9162 19 13.2007 19 10.1818C19 8.26992 18.2572 6.44073 16.9418 5.09552C15.6273 3.75107 13.8492 3 12 3Z"
                    fill="gray"
                  />
                </svg>
                <h2 className="flex w-auto justify-center">
                  {selectedChauffeur.nationality || "Nacionalidad"}
                </h2>
                {/* render other details of selected chauffeur */}
              </div>
            ) : (
              <p>No chauffeur selected</p>
            )}
          </div>
          <div className={detailsStyles}>
            {selectedChauffeur ? (
              <div className="flex justify-center">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-auto border-2 "
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6ZM12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z"
                    fill="gray"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0901 22.5958C11.2059 22.6753 11.2981 22.7366 11.3626 22.7788L11.4687 22.8472C11.7933 23.0504 12.2061 23.0508 12.5307 22.8476L12.6375 22.7788C12.7019 22.7366 12.7941 22.6753 12.9099 22.5958C13.1415 22.4367 13.4685 22.2041 13.8591 21.9041C14.6386 21.3054 15.6801 20.4322 16.7247 19.3336C18.7857 17.1661 21 13.9725 21 10.1818C21 7.75381 20.0571 5.42084 18.3719 3.69728C16.6859 1.97296 14.3943 1 12 1C9.60571 1 7.31415 1.97296 5.62814 3.69728C3.94288 5.42084 3 7.75381 3 10.1818C3 13.9725 5.21434 17.1661 7.27531 19.3336C8.31993 20.4322 9.36136 21.3054 10.1409 21.9041C10.5315 22.2041 10.8585 22.4367 11.0901 22.5958ZM12 3C10.1508 3 8.37273 3.75107 7.05815 5.09552C5.74283 6.44073 5 8.26992 5 10.1818C5 13.2007 6.78566 15.9162 8.72469 17.9554C9.68007 18.9602 10.6386 19.7646 11.3591 20.3179C11.6046 20.5065 11.8215 20.6651 12 20.7918C12.1785 20.6651 12.3954 20.5065 12.6409 20.3179C13.3614 19.7646 14.3199 18.9602 15.2753 17.9554C17.2143 15.9162 19 13.2007 19 10.1818C19 8.26992 18.2572 6.44073 16.9418 5.09552C15.6273 3.75107 13.8492 3 12 3Z"
                    fill="gray"
                  />
                </svg>
                <h2 className="flex w-auto justify-center">
                  {selectedChauffeur.address.state || "Direccion"}
                </h2>
                {/* render other details of selected chauffeur */}
              </div>
            ) : (
              <p>No chauffeur selected</p>
            )}
          </div>
          <div className=" flex justify-center text-blueGray-600"></div>
        </div>
      </div>
    </>
  );
};
export default CardChauffeurProfile;
