
import './App.css'
import products from '../public/products.json';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/NavBar';
import { Route, Routes } from 'react-router-dom';
import ItemDetail from './components/ItemDetail/ItemDetail';
function App() {

  return (
    
    <div className="w-full overflow-hidden">
      <Navbar logo="/up.png" Itemcount={0}/>
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
