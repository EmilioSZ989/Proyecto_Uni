// Clave de acceso para consultar las reservas
const CLAVE_DE_ACCESO = "1234";
let list_reserva = [];
let reservacion = {
    cedula: "",
    nombre: "",
    telefono: "",
    personas: "",
    fecha: "",
    hora: "",
    edades:0
};


function validarCedula(cedula) {
    const restriccion = /^\d+$/;
    return restriccion.test(cedula) && cedula.length <= 10;
}

function validarNombre(nombre) {
    const regexNombre = /^[a-zA-Z\s]*$/;
    return regexNombre.test(nombre);
}

function validarTelefono(telefono) {
    const regexTelefono = /^\d{10}$/;
    return regexTelefono.test(telefono);
}

function validarFecha(fecha) {
    const fechaActual = new Date();
    const fechaIngresada = new Date(fecha);
    return !isNaN(fechaIngresada) && fechaIngresada >= fechaActual;
}

function validarHora(hora) {
    const horaActual = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return hora >= horaActual;
}

function adicionar() {
    event.preventDefault();

    // Obtén los valores de los campos
    reservacion.cedula=document.getElementById("cedula").value;
    reservacion.nombre=document.getElementById("nombre").value;
    reservacion.telefono=document.getElementById("telefono").value;
    reservacion.personas=document.getElementById("personas").value;
    reservacion.fecha=document.getElementById("fecha").value;
    reservacion.hora=document.getElementById("hora").value;

    if (!validarCedula(reservacion.cedula)) {
        alert("La cédula debe contener hasta 10 dígitos numéricos.");
        return;
    }

    if (!validarNombre(reservacion.nombre)) {
        alert("El nombre no puede contener caracteres numéricos.");
        return;
    }

    if (!validarTelefono(reservacion.telefono)) {
        alert("El teléfono debe contener exactamente 10 dígitos numéricos.");
        return;
    }

    if (!validarFecha(reservacion.fecha)) {
        alert("La fecha debe ser la actual o una fecha futura.");
        return;
    }

    if (!validarHora(reservacion.hora)) {
        alert("La hora debe ser mayor o igual a la hora actual.");
        return;
    }

    // Agrega la reserva al arreglo list_reserva
    list_reserva.push(reservacion);

    alert("Registro exitoso");
    console.log(list_reserva);

    // Limpia los campos después de agregar la reserva
    reservacion = {
        cedula: "",
        nombre: "",
        telefono: "",
        personas: "",
        fecha: "",
        hora: ""
    };

    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("personas").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
}

function Mostrar() {
    const contraseña = document.getElementById("clave").value;
    if (contraseña === CLAVE_DE_ACCESO) {
        //document.getElementById("form").style.display="none";
        // Obtén la tabla
        const table = document.querySelector("table");

        // Limpia la tabla antes de mostrar los datos
        table.innerHTML = "";

        // Crea una fila para encabezados de columna
        const headerRow = document.createElement("tr");

        // Crea celdas de encabezado para cada columna
        const th1 = document.createElement("th");
        th1.textContent = "Cédula";

        const th2 = document.createElement("th");
        th2.textContent = "Nombre";

        const th3 = document.createElement("th");
        th3.textContent = "Teléfono";

        const th4 = document.createElement("th");
        th4.textContent = "Personas";

        const th5 = document.createElement("th");
        th5.textContent = "Fecha";

        const th6 = document.createElement("th");
        th6.textContent = "Hora";

        // Agrega las celdas de encabezado a la fila de encabezados
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        headerRow.appendChild(th3);
        headerRow.appendChild(th4);
        headerRow.appendChild(th5);
        headerRow.appendChild(th6);

        // Agrega la fila de encabezados a la tabla
        table.appendChild(headerRow);

        // Recorre los datos y agrega cada dato a su columna correspondiente
        for (const reserva of list_reserva) {
            const newRow = document.createElement("tr");

            const td1 = document.createElement("td");
            td1.textContent = reserva.cedula;

            const td2 = document.createElement("td");
            td2.textContent = reserva.nombre;

            const td3 = document.createElement("td");
            td3.textContent = reserva.telefono;

            const td4 = document.createElement("td");
            td4.textContent = reserva.personas;

            const td5 = document.createElement("td");
            td5.textContent = reserva.fecha;

            const td6 = document.createElement("td");
            td6.textContent = reserva.hora;

            newRow.appendChild(td1);
            newRow.appendChild(td2);
            newRow.appendChild(td3);
            newRow.appendChild(td4);
            newRow.appendChild(td5);
            newRow.appendChild(td6);

            // Agrega la fila de datos a la tabla
            table.appendChild(newRow);
        }
    } else {
        alert("Contraseña incorrecta");
    }
}

function buscarReservaPorFecha() {
    // Obtén la fecha ingresada por el usuario
    const fechaBuscada = document.getElementById("fechaBusqueda").value;

    // Obtén la tabla
    const table = document.querySelector("table");

    // Obtén todas las filas de la tabla (excepto la primera fila que contiene los encabezados)
    const filas = table.querySelectorAll("tr:not(:first-child)");

    // Recorre todas las filas y muestra solo las que coincidan con la fecha buscada
    for (const fila of filas) {
        const fechaCelda = fila.querySelector("td:nth-child(5)").textContent; // La columna de la fecha es la quinta (índice 4)

        if (fechaCelda === fechaBuscada) {
            fila.style.display = ""; // Muestra la fila si la fecha coincide
        } else {
            fila.style.display = "none"; // Oculta la fila si la fecha no coincide
        }
    }
}
let contador = 0;

function agregarycalcular() {
    const edadInput = parseInt(document.getElementById("edad").value);

    // Verifica si el valor ingresado es un número
    if (isNaN(edadInput)) {
        alert("Ingrese una edad válida.");
        return;
    }

    contador += 1;

    reservacion.edades += edadInput;

    const promedio = reservacion.edades / contador;
    alert("Promedio de edades: " + promedio.toFixed(2));
    document.getElementById("edad").value = ""; // Limpia el campo de entrada después de calcular el promedio
}
