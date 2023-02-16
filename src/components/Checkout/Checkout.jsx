import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext, ThemeContext } from "../../App";
import { collection, addDoc } from "firebase/firestore";

const Checkout = ({ db }) => {
  let [cart, setCart] = useContext(CartContext);
  let theme = useContext(ThemeContext);
  const [compraId, setCompraId] = useState("");
  const guardarCompra = async () => {
    const docRef = await addDoc(collection(db, "Compras"), { ...cart });
    setCompraId(docRef.id);
    setCart({
      userID: 1,
      products: [],
      total: 0,
    });
  };

  return (
    <div className="flex">
      <div className=" p-4 w-6/12">
        <form className="m-4 p-4 bg-white rounded shadow-xl w-10/12">
          <p className="text-slate-800 font-bold text-2xl">
            Formulario de Pago
          </p>
          <p className="text-slate-800 font-bold text-2xl">
            Compra nro: {compraId}
          </p>
          <div className="">
            <label className="block text-sm text-slate-600" for="nombre">
              Nombre
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="nombre"
              type="text"
              required=""
              placeholder="Tu nombre"
              aria-label="Name"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-slate-600" for="email">
              Correo Electrónico
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="email"
              name="email"
              type="text"
              required=""
              placeholder="Tu correo electrónico"
              aria-label="Email"
            />
          </div>
          <div className="mt-2">
            <label className=" block text-sm text-slate-600" for="direccion">
              Dirección
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="direccion"
              name="direccion"
              type="text"
              required=""
              placeholder="Tu direccion"
              aria-label="ciudad"
            />
          </div>
          <div className="mt-2">
            <label className="hidden text-sm block text-slate-600" for="ciudad">
              Ciudad
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="ciudad"
              name="ciudad"
              type="text"
              required=""
              placeholder="ciudad"
              aria-label="ciudad"
            />
          </div>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="hidden block text-sm text-slate-600" for="pais">
              País
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="pais"
              name="pais"
              type="text"
              required=""
              placeholder="Tu País"
              aria-label="pais"
            />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label
              className="hidden block text-sm text-slate-600"
              for="codigoPostal"
            >
              Código Postal
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="codigoPostal"
              name="codigoPostal"
              type="text"
              required=""
              placeholder="Código Postal"
              aria-label="codigoPostal"
            />
          </div>
          <p className="mt-4 text-slate-800 font-medium">Información de Pago</p>
          <div className="">
            <label className="block text-sm text-slate-600" for="tarjeta">
              Tarjeta
            </label>
            <input
              className="w-full px-2 py-2 text-slate-700 bg-slate-200 rounded-lg"
              id="tarjeta"
              name="tarjeta"
              type="text"
              required=""
              placeholder="Número de Tarjeta MM/YY CVC"
              aria-label="Name"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-slate-700 font-medium flex items-center">
              Total a pagar:
              <span className="ml-3 text-normal text-violet-600 text-xl">
                $ {cart.total}
              </span>
            </p>
            <Link to="/">
              <button
                className="px-4 py-1 text-white font-light tracking-wider bg-slate-900 rounded-lg"
                type="submit"
                onClick={guardarCompra}
              >
                Pagar
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="flow-root w-5/12 p-4 ">
        <h1
          className={
            theme
              ? " p-4 m-4 text-zinc-50 font-bold text-2xl"
              : " p-4 m-4  text-slate-500 font-bold text-2xl mt-5"
          }
        >
          Productos Agregados
        </h1>
        {cart.products.length !== undefined && cart.products.length !== 0 ? (
          <ul
            role="list"
            className="-my-6 divide-y divide-slate-200 shadow-lg p-5"
          >
            {cart.products.map((cartItem) => (
              <li key={cartItem.id} className="flex ">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-slate-200">
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-slate-900">
                      <Link
                        to={`/item/${cartItem.id}`}
                        className="text-slate-700 bg:text-violet-700"
                      >
                        {cartItem.title}
                      </Link>

                      <p className="ml-4">{`$${Number(
                        (cartItem.price * cartItem.quantity).toFixed(2)
                      )}`}</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {cartItem.category}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-slate-500">
                      Cantidad {cartItem.quantity}
                    </p>

                    <div className="flex">
                      <button
                        onClick={() => deleteFromCart(cartItem)}
                        type="button"
                        className="font-medium text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ml-10 text-slate-500">Aun no has agregado productos</p>
        )}
      </div>
    </div>
  );
};
export default Checkout;
