import Link from "next/link";
import React from "react";
import Search from "./Search";

type Props = {};

function Navbar({}: Props) {
  return (
    <nav>
      <div className="sticky top-0 z-10 ">
        <div className="container mx-auto max-w-screen-xl p-5">
          <div className="flex flex-row items-center justify-between align-middle sm:h-16 lg:pt-4">
            <h1 className="text-4xl font-bold italic tracking-tight text-harlequin-500 md:text-6xl">
              <Link href="/">albus</Link>
            </h1>

            <Search />
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="h-6 w-6  fill-current text-harlequin-500"
              >
                <path d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40zm152 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
