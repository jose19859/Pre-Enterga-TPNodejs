const argv = process.argv.slice(2); // slice extrae una porcion del array
const [metodo, recurso] = argv;

async function ejecutarComando() {
    try {
        switch (metodo) {
            case "GET":
                if (recurso === "products") {
                    await listaProductos();
                } else if (recurso.startsWith("products/")) {
                    const id = recurso.split("/")[1];
                    await obtenerProducto(id);

                }
                break;

            case "POST":
                const [, , title, price, category] = argv;
                if (title && price && category) {
                    await crearProducto({ title, price, category });
                } else {
                    console.log("faltan datos: Titulo,Precio o categoria");
                }
                break;

            case "DELETE":
                const idEliminar = recurso.split("/")[1]; // split divide una cadena de texto y convierte en array.
                await eleminarProducto(idEliminar);
                break;

            default:
                console.log("Comando erroneo, vuelve a porbar!");
                break;
        }

    } catch (error) {
        console.log("error en la ejecucion", error.message);

    }
}
async function listaProductos() {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    console.log(data);
}
async function obtenerProducto(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    console.log(data);
}

async function crearProducto(nuevoProd) {
    const response = await fetch('https://fakestoreapi.com/products' ,{
         method: "POST",
         headers: {
            "Content-Type":"application/json"
        },

        body: JSON.stringify(nuevoProd)
    });

    const data = await response.json();
    console.log("producto creado ");
    console.log(data);
}
async function eleminarProducto(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
        method: "DELETE"
    });
    const data = await response.json();
    console.log(data);
    
}

    

ejecutarComando();


// npm run start GET products : devuelve las lista de todos los productos.
// npm run start GET products/7 :  pide un producto especifico.
//npm run start POST products "prodNuevo" 1588 "Ropa" :crea un producto nuevo al final de la lista.
//npm run start DELETE products/7 :elimina el producto indicado 