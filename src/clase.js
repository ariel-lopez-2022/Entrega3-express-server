const fs = require('fs');

const writeFile = (path, Products) =>
	fs.promises.writeFile(path, JSON.stringify({products: Products }));

const readFile = async (path) => {
    const GetProducts = await fs.promises.readFile(path);
    const Result = JSON.parse(GetProducts);
    return Result;
};

class ProductManager{
    constructor (path) {
        this.Product = [];
        this.path= path;
    }
    CreateFile = async()=> {
		const File = fs.existsSync(this.path);

		if (File) {
			console.log("Ya Existe Archivo");
			const { products } = await readFile(this.path);
			this.Product = products;
		} else {
			await writeFile(this.path, this.Product);
			console.log("Archivo Creado con exito!");
		}
	};

    addProduct = async ({title, description, price,thumbnail,code,stock})=>{
    
        if (title && description && price && thumbnail&& code && stock){
               const RepeatedCode = this.Product.map(code => code.code).includes(code) 
                if (RepeatedCode){
                    console.log("Codigo Repetido")
                } else{
                    this.Product.push({
                        id:this.Product.length,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock
                        
                    });
                    await writeFile(this.path, this.Product);
                    console.log("Producto Agregado con Exito");
                }
              
        }else {
            console.log ("Campo faltante")
        }
    }

    getProducts = async function(){
        const Data = await readFile(this.path);
        return Data;
    }

    getProductById = async (id)=>{
        const { products } = await readFile(this.path);
        const ProductId = products.find((product)=> product.id === id);
       
        if (ProductId){
              return ProductId
        } else{
            console.log("Producto no Encontrado")
            return null
        }
    }

    UpdateProduct = async (id, Data)=>{
        const FindIndex = this.Product.findIndex((element)=> element.id === id);
           if (FindIndex !== -1){
              const id= this.Product[FindIndex].id
              this.Product[FindIndex] ={
                 id,
                 ...Data,
              };
            await writeFile(this.path, this.Product)
            console.log("Actualización Correcta")
           }else{
              console.log("No se encontro Producto a Actualizar")      
          }
    } 

    deleteProduct =async (id)=>{
        const FindIndex = this.Product.findIndex((element)=> element.id === id);
        if (FindIndex !== -1) {
			const newArrayProducts = this.Product.filter(
				(product) => product.id !== id
			);
			await writeFile(this.path, newArrayProducts);
			console.log("Producto Eliminado correctamente");
		} else {
			console.log("No se encontro Producto");
		}
	};
}          

module.exports = ProductManager;

/*          
////////// Inicio //////////
const Inicio= async ()=>{

    const Product = new ProductManager("./assets/product.json")
    await Product.CreateFile();
    let products = await Product.getProducts();
    console.log(products)
   
   
    const Product1 = {
        title: "Titulo Prueba 1",
        description: "Descripcion Prueba 1",
        price: "Precio Prueba 1",
        thumbnail: "Enlase prueba 1",
        code: "Cod1",
        stock: "10"
    };
    const Product2 = {
        title: "Titulo Prueba 2",
        description: "Descripcion Prueba 2",
        price: "Precio Prueba 2",
        thumbnail: "Enlase prueba 2",
        code: "Cod2",
        stock: "10"
    };
    await Product.addProduct(Product1)
    await Product.addProduct(Product2)
    products = await Product.getProducts();
    console.log(products);
   
    await Product.getProductById(5)


    const ProductoUpgrade = {
        title: "Titulo Actualizado",
        description: "Descripcion Actualizado",
        price: "Precio Actualizado",
        thumbnail: "Enlase Actualizado",
        code: "Cod1",
        stock: "10 Actualizado"
    }
    await Product.UpdateProduct(1, ProductoUpgrade);
    products = await Product.getProducts();
    console.log(products);

    await Product.deleteProduct(1);
    products = await Product.getProducts();
    console.log(products);

}
Inicio()

*/







