import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../App";
import { CartContext } from "../../App";

const ItemDetail = ({ products }) => {
  const { itemId } = useParams();
  const item = products.find((item) => item.id == itemId);

  let [cart, setCart] = useContext(CartContext);

  function reducirCantidad(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let cantidad = Number(target.value);
    return cantidad===0 ? null:(cantidad--,target.value = cantidad);
    
  }

  function incrementarCantidad(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let cantidad = Number(target.value);
    return  (cantidad++,target.value = cantidad);
  }

  function agregarAlCarrito(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    if (value === 0) {
      return;
    }

    let itemEnCarrito = cart.products.find((item) => item.id == itemId);
    let newCart = { ...cart };

    if (itemEnCarrito) {
      itemEnCarrito.quantity = Number(itemEnCarrito.quantity) + Number(value);
      newCart.products.splice(
        cart.products.indexOf(itemEnCarrito),
        1,
        itemEnCarrito
      );
    } else {
      newCart.products.push({ ...item, quantity: value });
    }
    setCart({ ...newCart });
  }

  const theme = useContext(ThemeContext);
  return (
    <div className="flex justify-center m-10 lg:m-14 ">
      <div
        className={
          theme
            ? "rounded-lg p-10 shadow-md bg-slate-600 items-center flex gap-10 flex-col lg:flex-row lg:justify-center lg:px-24 lg:py-24"
            : "rounded-lg p-10 shadow-md bg-slate-50 items-center flex gap-10 flex-col lg:flex-row lg:justify-center lg:px-24 lg:py-24"
        }
      >
        <div className="flex flex-row justify-start">
          <img
            alt="ecommerce"
            className="w-72 h-full rounded-lg"
            src={item.image}
          />
        </div>
        <div className="flex flex-col items-center w-full lg:w-80 lg:ml-32">
          <h1
            className={
              theme
                ? "text-slate-100 text-center  text-3xl font-bold lg:text-left w-full"
                : "text-slate-800 text-center  text-3xl font-bold lg:text-left w-full"
            }
          >
            {item.title}
          </h1>
          <div className="w-full flex flex-row justify-between">
            <span className={theme ? "text-slate-400" : "text-slate-400"}>
              {item.category}
            </span>
            <span className={theme ? "text-slate-400" : "text-slate-400"}>
              Rate: {item.rating.rate}
            </span>
          </div>
          <p
            className={
              theme
                ? "text-slate-200 text-sm lg:text-base my-3"
                : "text-slate-600 text-sm lg:text-base my-3"
            }
          >
            {item.description}
          </p>
          <div className="flex items-center justify-between w-full my-2">
            <h3
              className={
                theme
                  ? "text-md font-normal text-slate-100"
                  : "text-md font-normal text-slate-500"
              }
            >
              Precio:
            </h3>
            <h3
              className={
                theme
                  ? "text-violet-300  text-3xl font-semibold "
                  : "text-violet-600  text-3xl font-semibold "
              }
            >
              $ {item.price}
            </h3>
          </div>

          <div className="flex items-center justify-between w-full mb-2">
            <div>
              <h3 className={theme ? "text-slate-400" : "text-slate-500"}>
                Cantidad
              </h3>
            </div>
            <div className="ml-0 mt-2 flex h-10 w-28 rounded border-0 md:ml-auto md:mt-0">
            <button
                onClick={reducirCantidad}
                data-action="decrement"
                className={
                  theme
                    ? "h-full w-1/3 cursor-pointer rounded-l bg-slate-500 text-zinc-100 outline-none hover:bg-violet-700 hover:text-zinc-50"
                    : "h-full w-1/3 cursor-pointer rounded-l bg-violet-500 text-zinc-100 outline-none hover:bg-violet-700 hover:text-zinc-50"
                }
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
              <input
                type="number"
                className="flex w-1/3 items-center bg-gray-300 text-center font-semibold text-gray-700  outline-none hover:text-black focus:text-black  focus:outline-none"
                name="item-buy-quantity"
                defaultValue={0}
              />
              <button
                onClick={incrementarCantidad}
                data-action="increment"
                className={
                  theme
                    ? "h-full w-1/3 cursor-pointer rounded-r bg-slate-500 text-zinc-100 outline-none hover:bg-violet-700 hover:text-zinc-50"
                    : "h-full w-1/3 cursor-pointer rounded-r bg-violet-500 text-zinc-100 outline-none hover:bg-violet-700 hover:text-zinc-50"
                }
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
          <div className="w-full border-b my-3 border-zinc-300 lg:hidden"></div>
          <button
            className={
              theme
                ? "w-full px-10 py-2 bg-slate-500 rounded-lg text-violet-300 font-semibold hover:bg-violet-600 hover:text-zinc-100 mt-auto"
                : "w-full px-10 py-2 bg-violet-600 rounded-lg text-zinc-50 font-semibold hover:bg-violet-700 mt-auto"
            }
            onClick={agregarAlCarrito}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemDetail;
