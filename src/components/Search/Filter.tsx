import React from "react";
import { useStore } from "@store/app";

function Filter({}) {
  const setSearchFilter = useStore((state) => state.setSearchFilter);
  const searchFilter = useStore((state) => state.searchFilter);

  const filters = ["artist", "track", "album"];

  return (
    <div>
      <div className="flex gap-4 text-xl">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSearchFilter(filter)}
            className={`${
              searchFilter === filter ? "text-harlequin-500" : "text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="relative text-gray-600 ">refine you results</div>
    </div>
  );
}

export default Filter;
