import { GetServerSideProps } from "next";
import Image from "next/image";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import Skeleton from "react-loading-skeleton";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
// import { LightningBoltIcon } from "@heroicons/react/24/solid";

function ProductDetails({ product }:any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const addItemToCart = () => {
    dispatch(
      addToBasket({
        ...product,
        qty: 1,
        toast: true,
      } as any)
    );

    router.push("/cart");
  };
  console.log("product", product);
  return (
    <div className="heightFix px-6 lg:py-32 md:py-28 py-12 pb-20">
      <div className="max-w-screen-xl flex items-center mx-auto">
        <div className="flex md:flex-row flex-col md:justify-between w-full md:gap-4 gap-8">
          <div className="mx-auto">
            <Image
              src={product?.image}
              alt=""
              width={400}
              height={400}
              // objectFit="contain"
            />
          </div>
          <div className="flex-grow xl:max-w-2xl lg:max-w-xl  md:max-w-md">
            <>
              <h3 className="font-bold xl:text-4xl  lg:text-3xl text-2xl mb-2 capitalize">
                {product?.title}
              </h3>
              <p className="text-blue-light capitalize mb-4 font-medium">
                {product?.category}
              </p>
              <p className="text-justify text-sm lg:text-base my-6">
                {product?.description}
              </p>
              <p className="text-2xl font-semibold text-gray-700">
                {product?.price}
              </p>
              <div className="mt-10 flex xs:flex-row flex-col sm:gap-8 gap-6">
                <button
                  className="button px-10  py-2 flex items-center justify-center"
                  onClick={addItemToCart}
                >
                  <ShoppingCartIcon className="w-4" />
                  <span className="ml-2">Add to Cart</span>
                </button>
                {/* <button
                    className=" button-green px-10   py-2 flex items-center justify-center"
                    onClick={buyNow}
                  >
                    <LightningBoltIcon className="w-4" />
                    <span className="ml-2">Buy Now</span>
                  </button> */}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

