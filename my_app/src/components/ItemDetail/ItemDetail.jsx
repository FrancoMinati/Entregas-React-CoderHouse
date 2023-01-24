import { useParams } from "react-router-dom";

const ItemDetail=({productos})=>{
    const { id } = useParams();
   
    return(
      <div className="flex justify-center m-10 lg:m-32 ">
       {productos
            .filter((product) => id == null || product.id.toString() === id)
            .map((producto) => (   
            <div className="rounded-lg p-10 shadow-md bg-slate-50 items-center flex gap-10 flex-col lg:flex-row lg:justify-center lg:px-24 lg:py-24">
                <div className="flex flex-row justify-start">
                    <img alt="ecommerce" className="w-72 h-full rounded-lg"
                     src={producto.image}/></div>
                <div className="flex flex-col items-center w-full lg:w-80 lg:ml-32">
                <h1 className="text-slate-800 text-center  text-3xl font-bold lg:text-left w-full" >{producto.title}</h1>
                <div className="w-full flex flex-row justify-between">
                    <span className="text-slate-400">{producto.category}</span>
                    <span className="text-slate-400">Rate: {producto.rating.rate}</span>
                </div>
                <p className="text-sm lg:text-base my-3">{producto.description}</p>

                <h3 className="text-green-800 font-bold text-center text-2xl mb-3">{producto.price} USD</h3>
                <div className="w-full border-b my-3 border-zinc-300 lg:hidden"></div>
                <button className="w-full px-10 py-2 bg-violet-800 rounded-lg text-slate-100 hover:bg-violet-700">Comprar</button>
            </div>
            </div>
            
            ))}

      </div>  
    );

}
export default ItemDetail;