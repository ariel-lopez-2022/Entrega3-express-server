const express = require('express');
const ProductManager = require("./clase");

const server = express();
server.use(express.urlencoded({extended:true}))

const Product = new ProductManager("./assets/product.json")


server.get("/product", async (req , res)=>{
    let product = await Product.getProducts();
    //const limit = req.query.limit 
     res.send(product)  
    
})

server.get("/product/:pid", async (req , res)=>{
    const pid = req.params.pid
    let product = await Product.getProductById(pid);
     if (product == null){
        res.send("product no encontrado")    
     } 
     res.send(product)  
    
})




server.listen(8080, ()=> {
    console.log('Servidor Listo en puerto 8080')
    
})


/* sin query

server.get("/",(req, res)=>{
     res.send(array)
})
*/
/*
server.get("/:usuarioID",(req, res)=>{
    const Id = req.params.usuarioID;
    const encontardo =array.find((elem)=> elem.id == Id);
    if (!encontardo){
        res.send ("Usuario Inexistente")
    }
        res.send(encontardo)
})
// con query
server.get("/", (req, res)=>{
    const genero = req.query.genero
    const encontrado = array.find(elem=> elem.genero == genero);
    if (!genero || (genero != "M" && genero !="F")){
        res.send (array)
    }else
        res.send(encontrado)
})


*/