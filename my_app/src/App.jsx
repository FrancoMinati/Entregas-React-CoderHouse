
import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card/Card';
import products from '../public/products.json';
import axios from "axios";
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import ProductCards from './components/Card/ProductCard';
import ItemDetail from './ItemDetail';
function App() {
/*const [products,setProducts]=useState([]);
const  [categories,setCategories]=useState([]);
const urlProducts="https://fakestoreapi.com/products"
const getProductos=()=>{
  axios
  .get(urlProducts)
  .then((response)=>{setProducts(response.data)});
}
const getCategories=()=>{
  axios
  .get("https://fakestoreapi.com/products/categories")
  .then((response)=>{setCategories(response.data)});
}
useEffect(() => {
  getProductos();
  getCategories();
}, []);*/

  return (
    
    <div className="w-full overflow-hidden">
      <Navbar logo="../images/up.png" Itemcount={0}/>
      <Routes>
        <Route path='/' element={<ItemListContainer productos={products}/>}/>
        <Route
          path="/category/:categoryName"
          element={<ItemListContainer productos={products} />}
        />
        <Route 
        path="/item/:id"
        element={<ItemDetail productos={products}/>}/>
        
      </Routes>
      
      {/*<button onClick={()=>setCount(count+1)}>Click me {count}</button>
      {count ? <Card user={user}/> : null}
  */}
    </div>
    
    
  );
}

export default App
