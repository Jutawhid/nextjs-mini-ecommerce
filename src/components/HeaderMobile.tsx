import { useState } from "react";
import Image from "next/image";
// import { MenuIcon } from "@heroicons/react/20/solid";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import Logo from "../assets/images/logo.png";
// import Search from "../Search/Search";

function HeaderMobile() {
  const router = useRouter();
  const items = useSelector(selectItems);
  const [showSideBar, setShowBar] = useState(false);

  return (
    <>
      <header className="sticky top-0 inset-x-0 z-30 bg-white text-gray-900 glassmorphism px-6 md:hidden block py-4 transition-all">
        <div className="flex items-center w-full justify-between  mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="ecommerce"
                className="cursor-pointer"
                width={75}
                objectFit="contain"
                height={35}
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
    </>
  );
}

export default HeaderMobile;
