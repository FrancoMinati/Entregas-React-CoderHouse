import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { CartContext } from "../../App";
import { ThemeContext } from "../../App";
import { Link } from "react-router-dom";
import React, { useState, Fragment, useContext } from "react";

const CardWidget = () => {
  let [cart, setCart] = useContext(CartContext);
  let [isOpen, setIsOpen] = useState(false);
  let theme = useContext(ThemeContext);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function deleteFromCart(cartContent) {
    let newCart = { ...cart };
    if (cartContent.quantity <= 1) {
      newCart.products.splice(cart.products.indexOf(cartContent), 1);
    } else {
      newCart.products.splice(cart.products.indexOf(cartContent), 1, {
        ...cartContent,
        quantity: cartContent.quantity - 1,
      });
    }
    setCart({ ...newCart });
  }
  function getTotal() {
    cart.total= Number(
      cart.products
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    );
    

    return cart.total;
  }
  return (
    <>
      <button
        type="button"
        className={
          theme
            ? "relative rounded-full p-1 focus:ring-2 focus:outline-none focus:ring-offset-2 bg-zinc-50 text-gray-500 hover:text-gray-800 focus:ring-white  focus:ring-offset-slate-200"
            : "relative rounded-full p-1 focus:ring-2 focus:outline-none focus:ring-offset-2 bg-zinc-50 text-gray-500 hover:text-gray-800 focus:ring-black  focus:ring-offset-gray-800"
        }
        onClick={openModal}
      >
        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
        <span className="absolute -top-2 -right-3 bg-white px-2 pt-0.5 rounded-full text-gray-700  text-xs focus:text-violet-300">
          {cart.products.length !== undefined && cart.products.length !== 0
            ? cart.products.reduce(
                (acc, item) => acc + Number(item.quantity),
                0
              )
            : "0"}
        </span>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-slate-900"
                  >
                    Carrito
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-slate-500">
                      {cart.products.length !== undefined &&
                      cart.products.length !== 0
                        ? "Productos Agregados:"
                        : "Aun no has agregado productos."}
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {cart.products.map((cartItem) => (
                          <li key={cartItem.id} className="flex py-6">
                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={cartItem.image}
                                alt={cartItem.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-slate-900">
                                  <Link to={`/item/${cartItem.id}`} className="text-slate-700 bg:text-violet-700">
                                    {cartItem.title}
                                  </Link>

                                  <p className="ml-4">{`$${Number(
                                    (
                                      cartItem.price * cartItem.quantity
                                    ).toFixed(2)
                                  )}`}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {cartItem.category}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
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
                    </div>
                  </div>
                  {cart.products.length !== undefined &&
                      cart.products.length !== 0
                        ? (<div className="flex justify-between mt-4">
                          
                        <h3 className="font-medium text-slate-700">Total</h3>
                        <span className="font-medium text-violet-700">
                        ${getTotal()}
                      </span></div>)
                        : ""}
                  <hr className="mt-4" />
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    {cart.products.length !== undefined &&
                    cart.products.length !== 0 ? (
                
                        <Link to="/checkout">
                           <button
                        type="button"
                        className="justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-violet-700 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                        onClick={closeModal}>
                           Confirmar Compra
                        </button>
                        </Link>
                       
                      
                    ) : (
                      ""
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardWidget;
