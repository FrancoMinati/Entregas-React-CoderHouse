
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