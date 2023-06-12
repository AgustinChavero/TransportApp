"use client";
import MapExample from "../../../../components/Maps/MapExample";
export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
            <MapExample />
          </div>
        </div>
      </div>
    </>
  );
}
