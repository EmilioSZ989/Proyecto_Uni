const apiUrlBase = 'https://www.thecocktaildb.com/api/json/v1/1';

// Función genérica para buscar y mostrar bebidas
async function buscarYMostrarBebidas(apiUrl, mensajeError, tipoBusqueda) {
    try {
        const respuesta = await fetch(apiUrl);

        if (respuesta.status === 200) {
            const data = await respuesta.json();
            console.log(data);

            // Verificar si se encontraron resultados
            if (data.drinks) {
                mostrarBebidas(data.drinks, tipoBusqueda);
            } else {
                alert(mensajeError);
            }
        } else {
            alert("Error al buscar bebidas. Código de estado: " + respuesta.status);
        }
    } catch (error) {
        console.error("Error al buscar bebidas:", error);
    }
}

// Función para mostrar las bebidas en la página
function mostrarBebidas(bebidas, tipoBusqueda) {
    var resultadosSection = document.getElementById("resultados");
    resultadosSection.innerHTML = ""; // Limpiar resultados anteriores

    bebidas.forEach(function (bebida) {
        var bebidaHTML = '';

        if (tipoBusqueda === 'nombre') {
            bebidaHTML = `
                <div class="bebida">
                    <h3 class ="titulo_bebida">${bebida.strDrink}</h3>
                    <img class = "img_bebida"src="${bebida.strDrinkThumb}" alt="${bebida.strDrink}">
                    <p class ="i_bebida">Ingredientes: ${obtenerIngredientes(bebida)}</p>
                </div>
            `;
        } else {
            bebidaHTML = `
                <div class="bebida">
                    <h3 class="titulo_bebida">${bebida.strDrink}</h3>
                    <img class = "img_bebida" src="${bebida.strDrinkThumb}" alt="${bebida.strDrink}">
                </div>
            `;
        }

        resultadosSection.innerHTML += bebidaHTML;
    });
}

// Función para obtener todos los ingredientes de una bebida
function obtenerIngredientes(bebida) {
    var ingredientes = [];

    // Iterar a través de los ingredientes del 1 al 15
    for (var i = 1; i <= 15; i++) {
        var ingrediente = bebida[`strIngredient${i}`];
        if (ingrediente) {
            ingredientes.push(ingrediente);
        }
    }

    return ingredientes.join(', '); // Unir los ingredientes con comas
}

// Función para buscar bebidas por nombre
async function filtrarPorNombre() {
    var nombre = document.getElementById("buscarNombre").value;

    if (nombre.trim() === "") {
        alert("Por favor, ingrese un nombre para buscar.");
        return;
    }

    var apiUrl = `${apiUrlBase}/search.php?s=${nombre}`;
    buscarYMostrarBebidas(apiUrl, "No se encontraron bebidas con ese nombre.", "nombre");
}

// Función para buscar bebidas por ingrediente
async function filtrarPorIngrediente() {
    var ingrediente = document.getElementById("buscarIngrediente").value;

    if (ingrediente.trim() === "") {
        alert("Por favor, ingrese un ingrediente para buscar.");
        return;
    }

    var apiUrl = `${apiUrlBase}/filter.php?i=${ingrediente}`;
    buscarYMostrarBebidas(apiUrl, "No se encontraron bebidas con ese ingrediente.", "ingrediente");
}

// Función para buscar bebidas por tipo
async function filtrarPorTipo() {
    var tipoSeleccionado = document.getElementById("filtrarTipo").value;
    var apiUrl = `${apiUrlBase}/filter.php?a=${tipoSeleccionado}`;
    buscarYMostrarBebidas(apiUrl, `No se encontraron bebidas de tipo ${tipoSeleccionado}.`, "tipo");
}

// Función para buscar bebidas por categoría
async function filtrarPorCategoria() {
    var categoriaSeleccionada = document.getElementById("filtrarCategoria").value;
    var apiUrl = `${apiUrlBase}/filter.php?c=${categoriaSeleccionada}`;
    buscarYMostrarBebidas(apiUrl, `No se encontraron bebidas de categoría ${categoriaSeleccionada}.`, "categoria");
}
