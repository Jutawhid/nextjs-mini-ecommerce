import Image from "next/image";
// import Sidebar from './Sidebar';
import Logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Header(props: any) {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const items = useSelector(selectItems);
  // console.log('categories', categories);
  useEffect(() => {
    setAllCategories(props?.categories);
  }, []);
  console.log("props", props.categories);
  return (
    <>
      <header className="sticky top-0 inset-x-0 z-30 bg-white text-gray-900 glassmorphism px-6 md:block hidden">
        {/* Top Nav */}
        <div className="flex items-center w-full max-w-screen-xl py-2 xl:space-x-16 lg:space-x-12  space-x-7  mx-auto">
          <div className="flex items-center">
            <Image
              src={Logo}
              onClick={() => router.push("/")}
              alt="Amazon-Logo"
              className="cursor-pointer"
              width={250}
              objectFit="contain"
              height={200}
            />
          </div>

          {/* Custom center bar */}
          <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer"></div>
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCartIcon className="xl:w-10 lg:w-9 w-8 link" />
            <div className="absolute -top-2 -right-1 rounded-full text-white bg-blue-light p-1 flex items-center justify-center text-xs font-extrabold">
              {items?.length}
            </div>
          </div>
        </div>
      </header>

      <header className="sticky top-0 inset-x-0 z-30 bg-white text-gray-900 glassmorphism px-6 md:hidden block py-4 transition-all">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="ecommerce"
                className="cursor-pointer"
                width={275}
                objectFit="contain"
                height={135}
                onClick={() => router.push("/")}
              />
            </div>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCartIcon className="xl:w-10 w-9 link" />
            <div className="absolute -top-2 -right-1 rounded-full text-white bg-blue-light p-1 flex items-center justify-center text-xs font-extrabold">
              {items?.length}
            </div>
          </div>
        </div>
        <div>{/* <Search /> */}</div>
      </header>

      {/* {sidebar ? <Sidebar /> : null} */}
    </>
  );
}

export default Header;
