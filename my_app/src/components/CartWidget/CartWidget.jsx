import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const CardWidget = ({ cantidad }) => {

  return (
    <button
    type="button"
    className=" relative rounded-full bg-gray-800 p-1 mx-5 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800">
    
    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
    <span className="absolute -top-2 -right-3 bg-white px-2 pt-0.5 rounded-full text-gray-700  text-xs focus:text-violet-300">{cantidad}</span>
  </button>

    
  );
};
export default CardWidget;
