
import React from "react";
import { Link } from "react-router-dom";
const ProductCards = ({image,category,title,price,id}) => {
  return (
    <Link to={"/item/"+id}>
    <div className="w-full shadow-md bg-slate-50 rounded-lg flex flex-col divide-y gap-10 h-full hover:bg-slate-200">
      <div className="rounded h-100 my-auto flex flex-row justify-center"> <img
          alt="ecommerce"
          className="w-72 p-5"
          src={image}
        /></div>
      <div className="flex flex-col justify-center mt-auto p-3 h-44 ">
      <h2 className="text-slate-800 text-center text-lg font-semibold  mt-auto w-full ">{title}</h2>
      <h3 className="text-green-800 font-bold text-center text-2xl mb-3">{price} USD</h3>
      <button className="w-full px-10 py-2 bg-violet-800 rounded-lg text-slate-100 hover:bg-violet-700 mt-auto">Comprar</button>
      </div>
      
    </div>
    </Link>
  );
};
export default ProductCards;
