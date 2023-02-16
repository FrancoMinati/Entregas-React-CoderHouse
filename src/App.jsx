
import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import ItemDetail from './components/ItemDetail/ItemDetail';
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { createContext,useContext } from 'react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import {db} from '../db/dbConfig.js';
import Checkout from './components/Checkout/Checkout';


export const ThemeContext=createContext(null);
export const CartContext=createContext();

function App() {
//Products
const [products,setProducts]=useState([]);
//Cart
const [cart,setCart]=useState({ products: [] });
const itemsCollectionRef = collection(db, "products");
const [loading, setLoading] = useState(true);
const [darkmode, setDarkmode] = useState(false);
const getProducts=async ()=>{
  const querySnapshot = await getDocs(itemsCollectionRef)
  const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  setProducts(docs);
  setLoading(false);
  /*
  axios
  .get("http://localhost:3001/api/noticias/")
  .then((res)=>{
    
  })*/
}
const getCart=async ()=>{
  setCart({
    userID:1,
    products:[],
    total:0
  });
};
const saveItems=async ()=>{
  try{
    const productos=await axios.get("https://fakestoreapi.com/products");
    productos.data.map(async(producto)=>{
      const docRef=doc(db,"products",producto.id.toString());
      const docSnap=await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef,producto);
      }else{
        console.log("element already exists");
      }
    });

  }catch(e){
    console.log(e.message);
  }
 };
useEffect(()=>{
  getProducts();
  getCart();
},[])

const themeToggler=()=>{
  setDarkmode(!darkmode);
  darkmode? document.documentElement.style.background="white":
  document.documentElement.style.background="rgb(51,65,85)";
}

  return (
    
<>
    {loading ? (
      <div className='w-full flex flex-row justify-center items-center h-screen'>
       <DotLoader
       color="#36d7b7"
       loading={loading}
       size={150}
       aria-label="Loading content..."
       data-testid="loader"/>
      </div>
      ):(
  <>
      <ThemeContext.Provider value={darkmode}>
        <CartContext.Provider value={[cart,setCart]}>
      <div className={darkmode?"bg-slate-700":""}>
       <Navbar logo="/up.png" Itemcount={0} themeToggle={themeToggler} theme={darkmode}/>
        <Routes>
          <Route path='/' element={<ItemListContainer productos={products}/>} 
          theme={darkmode}/>
          <Route path="/category/:categoryId"
            element={<ItemListContainer productos={products} />}/>
          <Route path="/item/:itemId"
            element={<ItemDetail products={products}/>}/>
          <Route path="/checkout"  element={<Checkout/>}/>
        </Routes>
      </div> 
      </CartContext.Provider>
      </ThemeContext.Provider>
  </>
     )}
  </>
  );
}


export default App
