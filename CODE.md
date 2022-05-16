# OBJETO
Se crea la estructura de un objeto que contendra las propiedades correspondientes de los artículos, siendo dichas propiedades
- Codigo
- Nombre
- Precio
- Stock 
- Total Vendido (Que se ira cargando con ayuda de la función ventaArticulos)

---

# STORAGE
En caso de que el contenido de la "key" **articulosAlmacaenados** del localStorage tenga un "value" vacío, entonces la variable **articulos** se inicializará como un array vacío. Caso contrario, se cargará con un array que contiene los artículos cargados anteriormente.

### En caso de que la key articulosAlmacenados no tenga un "value" nulo...
- Se hace un **localStorage.getItem("articulosAlmacenados")** para obtener el valor de dicha clave.
- Se hace un **JSON.parse()** de lo anterior, para transformar la cadena JSON en un array, y cargarselo a la variable articulos

---

# USER EXPERIENCE: SUCCESS
Se encarga de reproducir un sonido, para indicar que los datos fueron cargados exitosamente.
- Se referencia al elemento con ID **"success"**
- Se le da un atributo **src**, cuyo valor será la ruta del sonido **src/audio/success.mp3"**
- Se reproduce el sonido

---

# MUESTRA ARTICULOS
Esta función se encarga de cargar la lista que se encuentra al final de la web.
- Se referencia al elemento con CLASS **inventoryItems**
- Se vacía su contenido con la siguiente porción de código
```
    items.innerHTML != "" && (items.innerHTML = "");
```
- Se hace un bucle for, que por cada iteración (Se repite en base a la cantidad de articulos cargado en el array articulos) va a cargar una fila con los datos correspondientes al artículo.

---

# CARGA ARTICULOS
Esta funcion se encarga de cargar el array articulos.
- Se referencia al FORM **appLoad**
- Se le asigna un evento cuando se realiza un **submit**, que va a ejecutar la funcion cargaArticulos
- Se previene el comportamiento por defecto con... (Este codigo se repite en todos los forms)
```
    e.preventDefault();
```
- Se obtienen los valores de los inputs del FORM
- Si el valor del input **codigo, nombre** no están vacíos, el **precio** es mayor a 0, y **stock** es mayor/igual a 0, se crea un objeto Articulo, que va a ser añadido al array articulos (Además de ejecutar las funciones success, actualizarStorage, resetear los inputs del FORM y actualizar la lista del final de la web.)
```
    articulos.push(articulo)
```
- En caso que no se cumpla lo anterior, se muestra una alerta

---

# MODIFICA ARTICULOS
Esta funcion modifica los articulos ya cargados.
- Se crea un evento **submit** para el FORM **appChange**, ejecutando la funcion modificaArticulos.
- Se toman los valores de los inputs, y se referencia a una porción de la web que mostrará los articulos manipulados (Por modificaciones, ventas o busqueda)
- Se borra el contenido de la web que muestra los articulos manipulados con...
```
    modificado.innerHTML != "" && (modificado.innerHTML = "");
```
- Si **stock y precio** están vacíos, o **code (Codigo del articulo a modificar)** estan vacíos, se mostrará una alerta para cargar datos válidos, y se interrumpe la ejecución de la función
- Se obtiene el index del artículo buscado (Esta parte se ve repetida en las demas funciones, con algunos cambios)
```
    index = articulos.map((art) => art.codigo).indexOf(code.toUpperCase());
```
- Se hace un articulos.map() para quedarnos unicamente con los códigos del array, y luego con .indexOf() obtener el indice del codigo buscado (Caso que no se encuentre devuelve -1)
- Si el articulo se encuentra, se modifica el stock o el precio según corresponda, y se muestran los datos en la web. Caso contrario, muestra una alerta

---

# BUSCAR ARTICULOS
Esta función se encarga de buscar en el array de artículos según el código o nombre suministrado
- El proceso es similar a la anterior función, por lo que se explicará la parte en la que se distinguen
- Si el value de **name** no es vacío, es decir que se busca por nombre. Si encuentra el artículo, lo muestra en la web.
- Si el value de **name** es vacío, es decir que se busca por código. Si se encuentra el artículo, lo muestra en la web.
- Si no encuentra ela artículo, muestra una alerta

---

# VENTA ARTICULOS
Esta funcion permite cargar las ventas realizadas de los articulos cargados en el array.
- Si **code o units** están vacíos, o **units** es menor/igual a 0, se muestra una alerta pidiendo ingresar datos validos
- Si no se cumple lo anterior, se busca el artículo. En caso de encontarlo, se actualiza el **totalVendido** del artículo, y el stock.



