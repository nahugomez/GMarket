/*
 _   _       _                _    ____                          
| \ | | __ _| |__  _   _  ___| |  / ___| ___  _ __ ___   ___ ____
|  \| |/ _` | '_ \| | | |/ _ \ | | |  _ / _ \| '_ ` _ \ / _ \_  /
| |\  | (_| | | | | |_| |  __/ | | |_| | (_) | | | | | |  __// / 
|_| \_|\__,_|_| |_|\__,_|\___|_|  \____|\___/|_| |_| |_|\___/___|

CURSO DE JAVASCRIPT - Optimizando el proyecto final
Explicación del código en caso de ser necesario en archivo CODE.md 
En la carpeta test hay un lote de prueba para probar el código

*/

/* =================== OBJETO ================= */
class Articulo {
    constructor(codigo, nombre, precio, stock) {
        this.codigo = codigo.toUpperCase();
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.totalVendido = 0;
    }
}
/* =================== OBJETO ================= */

/* =================== STORAGE ================= */
let articulos = JSON.parse(localStorage.getItem("articulosAlmacenados")) || [];

let actualizarStorage = () => {
    articulosJSON = JSON.stringify(articulos);
    localStorage.setItem("articulosAlmacenados", articulosJSON);
    return;
}
/* =================== STORAGE ================= */

/* =================== USER EXPERIENCE ================= */
let success = () => {
    let audio = document.getElementById("success");
    audio.setAttribute("src", "src/audio/success.mp3");
    audio.play();
}
/* =================== USER EXPERIENCE ================= */

/* =================== MUESTRA ARTICULOS ================= */

const muestraInventario = (array) => {

    let items = document.querySelector(".inventoryItems");

    items.innerHTML != "" && (items.innerHTML = "");
   
    for( let i=0 ; i<array.length ; i++ ){
  
      const {
        nombre,
        codigo,
        stock,
        precio,
        totalVendido: vendido
      } = array[i];
  
      let item = document.createElement('tr');
      item.innerHTML = `<th scope="row">${nombre}</th>
                        <td>${codigo}</td>
                        <td>${stock}</td>
                        <td>${precio}</td>
                        <td>${vendido}</td>`;

      items.appendChild(item);
      
    }
}

/* =================== MUESTRA ARTICULOS ================= */

/* =================== CARGA ARTICULOS ================= */

let appLoad = document.querySelector(".appLoad");
appLoad.addEventListener("submit", cargaArticulos);

function cargaArticulos(e) {

    e.preventDefault();

    let articulo;
    let codigo = document.getElementById("loadCode").value;
    let nombre = document.getElementById("loadName").value;
    let precio = document.getElementById("loadPrice").value;
    let stock = document.getElementById("loadStock").value;

    (codigo != "" && nombre != "" && precio > 0 && stock >= 0) ? (
        articulo = new Articulo(codigo, nombre, precio, stock),
        articulos.push(articulo),
        success(),
        actualizarStorage(),
        appLoad.reset(),
        muestraInventario(articulos)
    ) : (
        alert("Ingrese datos válidos")
    )

    console.log(articulos);

}

/* =================== CARGA ARTICULOS ================= */

/* =================== MODIFICA ARTICULOS ================= */

let appChange = document.querySelector(".appChange");
appChange.addEventListener("submit", modificaArticulos);

function modificaArticulos(e) {

    e.preventDefault();

    let code = document.getElementById("changeCode").value;
    let stock = document.getElementById("changeStock").value;
    let precio = document.getElementById("changePrice").value;
    let modificado = document.querySelector(".article");
    let index;

    modificado.innerHTML != "" && (modificado.innerHTML = "");

    if (stock == "" && precio == "" || code == "") {
        alert("Ingrese datos válidos");
        appChange.reset();
        return; //Se realizó con IF porque con operador ternario no se puede colocar return.
    }

    index = articulos.map((art) => art.codigo).indexOf(code.toUpperCase());
    index != -1 ? (
        stock != "" && (articulos[index].stock = stock),
        precio != "" && (articulos[index].precio = precio),

        success(),
        actualizarStorage(),
        muestraInventario(articulos),

        modificado.innerHTML = `<p class="fw-bold">Nombre del Artículo: ${articulos[index].nombre}</p>
                                <p>Código del Artículo: ${articulos[index].codigo}</p>
                                <p>Stock del Artículo: ${articulos[index].stock}</p>
                                <p>Precio del Artículo: $${articulos[index].precio}</p>
                                <p class="mb-0">Total Vendido: $${articulos[index].totalVendido}</p>`

    ) : (alert("No se encontro el articulo"))



    appChange.reset();

}

/* =================== MODIFICA ARTICULOS ================= */

/* =================== BUSCAR ARTICULOS ================= */

let appSearch = document.querySelector(".appSearch");
appSearch.addEventListener("submit", buscaArticulo);

function buscaArticulo(e) {

    e.preventDefault();

    let encontrado = document.querySelector(".article");
    let index;
    let articulo = document.createElement("div");
    let name = document.querySelector("#searchName").value;
    let code = document.querySelector("#searchCode").value;

    encontrado.innerHTML != "" && (encontrado.innerHTML = "");

    (name != "") ? (
        index = articulos.map((art) => art.nombre).indexOf(name.toUpperCase()),
        (index != -1) ? (
            articulo.innerHTML = `<p class="fw-bold">Nombre del Artículo: ${articulos[index].nombre}</p>
                                  <p>Código del Artículo: ${articulos[index].codigo}</p>
                                  <p>Precio del Artículo: ${articulos[index].precio}</p>
                                  <p>Stock del Artículo: ${articulos[index].stock}</p>
                                  <p class="mb-0">Total Vendido: ${articulos[index].totalVendido}</p>`,
            encontrado.append(articulo),
            success()
        ) : (alert("No se encontró el articulo"))
    ) : (
        index = articulos.map((art) => art.codigo).indexOf(code.toUpperCase()),
        (index != -1) ? (
            articulo.innerHTML = `<p class="fw-bold">Nombre del Artículo: ${articulos[index].nombre}</p>
                                  <p>Código del Artículo: ${articulos[index].codigo}</p>
                                  <p>Precio del Artículo: ${articulos[index].precio}</p>
                                  <p>Stock del Artículo: ${articulos[index].stock}</p>
                                  <p class="mb-0">Total Vendido: ${articulos[index].totalVendido}</p>`,
            encontrado.append(articulo),
            success()
        ) : (alert("No se encontró el articulo"))
    )

    appSearch.reset();

}

/* =================== BUSCAR ARTICULOS ================= */

/* =================== VENTA ARTICULOS ================= */

let appSell = document.querySelector(".appSell");
appSell.addEventListener("submit", ventaArticulos);

function ventaArticulos(e) {

    e.preventDefault();

    let code = document.getElementById("sellCode").value;
    let units = document.getElementById("sellUnits").value;
    let vendido = document.querySelector(".article");

    if (code == "" || units == "" || units <= 0) {
        alert("Ingrese datos validos");
        appSell.reset();
        return;
    }

    let index = articulos.map((art) => art.codigo).indexOf(code.toUpperCase());
    console.log(index);

    index != -1 && (
        articulos[index].totalVendido += articulos[index].precio * units,
        articulos[index].stock -= units,

        vendido.innerHTML != "" && (vendido.innerHTML = ""),
        vendido.innerHTML =`<p class="fw-bold">Nombre del Artículo: ${articulos[index].nombre}</p>
                            <p>Código del Artículo: ${articulos[index].codigo}</p>
                            <p>Precio del Artículo: ${articulos[index].precio}</p>
                            <p>Stock del Artículo: ${articulos[index].stock}</p>
                            <p class="mb-0">Total Vendido: ${articulos[index].totalVendido}</p>`,
    
        success(),
        muestraInventario(articulos)
    )

    
    appSell.reset();
}

/* =================== VENTA ARTICULOS ================= */