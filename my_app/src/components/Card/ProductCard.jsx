import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
const ProductCards = ({ image, category, title, price, id }) => {
  const theme = useContext(ThemeContext);
  return (
    <Link to={"/item/" + id}>
      <div
        className={
          theme
            ? "py-5 w-full shadow-md bg-slate-600 rounded-lg flex flex-col divide-y-4 divide-slate-400/25 gap-10 h-full"
            : "py-5 w-full shadow-md bg-slate-50 rounded-lg flex flex-col divide-y-4 divide-zinc-300/25 gap-10 h-full"
        }
      >
        <div className="rounded h-68 my-auto flex flex-row justify-center rounded-lg p-2 px-10">
          {" "}
          <img alt="ecommerce" className="w-100 h-64 rounded-lg " src={image} />
        </div>
        <div className="flex flex-col justify-center mt-auto p-3 h-44 ">
          <h2
            className={
              theme
                ? "text-zinc-100 text-center text-base font-semibold  mt-auto w-full"
                : "text-slate-800 text-center text-base font-semibold mt-auto"
            }
          >
            {title}
          </h2>
          <h3
            className={
              theme
                ? "text-violet-300 text-center text-xl font-semibold my-3"
                : "text-violet-600 text-center text-xl font-semibold my-3"
            }
          >
            $ {price}
          </h3>
          <button
            className={
              theme
                ? "w-full px-10 py-2 bg-slate-500 rounded-lg text-violet-300 font-semibold hover:bg-violet-600 hover:text-zinc-100 mt-auto"
                : "w-full px-10 py-2 bg-violet-600 rounded-lg text-zinc-50 font-semibold hover:bg-violet-700 mt-auto"
            }
          >
            Comprar
          </button>
        </div>
      </div>
    </Link>
  );
};
export default ProductCards;
