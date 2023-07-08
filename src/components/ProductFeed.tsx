import { useState } from "react";
import Product from "./Product";
import Image from "next/image";
// import { AdjustmentsIcon } from "@heroicons/react/24/outline";
interface ProductData {
  products?: any;
}
function ProductFeed({ products, categories }: any) {
  const [categoryActive, setCategoryActive] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  console.log("categories", categories);
  const activeCategoryHandler = (category: any) => {
    if (category == "all" || categoryActive == category) {
      setCategoryActive("all");
      return;
    }
    setCategoryActive(category);
    filterProducts(category);
  };

  const filterProducts = (category: any) => {
    setFilteredProducts(
      products.filter((product: any) => product?.category == category)
    );
  };
  return (
    <div className="w-full py-10 px-6 bg-gray-100 mt-10" id="products-feed">
      <div className="flex items-center w-full max-w-screen-xl sm:mb-10 mb-16 gap-4  mx-auto overflow-x-auto hideScrollBar capitalize text-sm font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>

        <div
          className={` py-2 px-6 bg-white text-center rounded hover:bg-blue-light hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow
          ${categoryActive == "all" ? "bg-blue-light text-black" : ""}`}
          onClick={() => activeCategoryHandler("all")}
        >
          All
        </div>
        {categories?.map((category: any, index: any) => (
          <div
            key={`category-${index}`}
            className={`py-2 px-6 bg-white text-center whitespace-nowrap rounded hover:bg-blue-light hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${
              categoryActive == category ? "bg-blue-light text-black" : ""
            }`}
            onClick={() => activeCategoryHandler(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 mx-auto max-w-screen-xl gap-x-6 gap-y-8">
        {(categoryActive === "all" ? products : filteredProducts)?.map(
          ({ id, title, price, description, category, image }: any) => (
            <Product
              key={`product-${id}`}
              _id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          )
        )}
      </div>
    </div>
  );
}
export default ProductFeed;
