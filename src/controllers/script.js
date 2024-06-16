
import Grafo from "./dependencies";

document.getElementById("addVertice").addEventListener("click", function() {
    let vertice = document.getElementById("numVertices").value;
    if (!vertice) {
        alert("Ingrese un nombre válido para el vértice");
    } else {
        if (!grafo) {
            grafo = new Grafo();
        }
        grafo.agregarVertice(vertice);
        alert("Vértice " + vertice + " agregado al grafo.");
    }
});

document.getElementById("addArista").addEventListener("click", function() {
    if (!grafo) {
        alert("Primero crea un grafo.");
        return;
    }
    let vertice1 = document.getElementById("vertice1").value;
    let vertice2 = document.getElementById("vertice2").value;
    let pesoArista = parseInt(document.getElementById("pesoArista").value);
    if (!vertice1 || !vertice2 || isNaN(pesoArista)) {
        alert("Ingrese valores válidos para los vértices y el peso de la arista");
    } else {
        grafo.agregarArista(vertice1, vertice2, pesoArista);
        alert("Arista agregada entre " + vertice1 + " y " + vertice2 + " con peso " + pesoArista);
    }
});

document.getElementById("botonImprimir").addEventListener("click", function() {
    if (!grafo) {
        alert("Primero crea un grafo.");
        return;
    }
    let contenedorMatriz = document.getElementById("imprimirGrafo");
    let listaAdyacencia = grafo.obtenerListaAdyacencia();
    let salida = "";

    listaAdyacencia.forEach((lista, indice) => {
        salida += grafo.obtenerVerticePorIndice(indice) + " => ";
        lista.forEach(({ vertice, peso }) => {
            salida += `${vertice}(${peso}) `;
        });
        salida += "<br>";
    });

    contenedorMatriz.innerHTML = salida;
});

document.getElementById("iniciarDFS").addEventListener("click", function() {
    if (!grafo) {
        alert("Primero crea un grafo.");
        return;
    }
    let verticeInicio = document.getElementById("dfsInicio").value;
    if (!verticeInicio || !grafo.obtenerIndiceVertice(verticeInicio)) {
        alert("Ingrese un vértice de inicio válido");
    } else {
        let visitCallback = (v1, v2) => console.log("Visitando la arista ${v1}-${v2}");
        let preVisitCallback = (v) => console.log("Visitando el vértice ${v}");
        let postVisitCallback = (v) => console.log("Terminando la visita del vértice ${v}");

        let resultado = DFS(verticeInicio, visitCallback, preVisitCallback, postVisitCallback);
        let contenedorResultado = document.getElementById("resultadoDFS");
        if (resultado.todasAristasVisitadas) {
            contenedorResultado.innerHTML = `Se visitaron todos los vértices: ${resultado.verticesVisitados.join(", ")}`;
        } else {
            contenedorResultado.innerHTML = `No se visitaron todos los vértices. Vértices visitados: ${resultado.verticesVisitados.join(", ")}`;
        }
    }
});
