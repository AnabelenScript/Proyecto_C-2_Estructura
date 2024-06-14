class Grafo {
    #map
    #listaAdyacencia
    #reverseMap
    constructor() {
        this.#map = new Map();
        this.#listaAdyacencia = [];
        this.#reverseMap = new Map();
    }

    agregarVertice(key) {
        if (this.#map.has(key)) {
            console.log(key + " Vertice existente");
            return false;
        } else {
            let listaEnlazada = new LinkedList();
            this.#listaAdyacencia.push(listaEnlazada);
            this.#map.set(key, this.#listaAdyacencia.length - 1);
            this.#reverseMap.set(this.#listaAdyacencia.length - 1, key);
            return true;
        }
    }

    agregarVertices(...vertices) {
        for (let value of vertices) {
            let listaAdyacencia = new LinkedList();
            this.#listaAdyacencia.push(listaAdyacencia);
            this.#reverseMap.set(this.#listaAdyacencia.length - 1, value);
            this.#map.set(value, this.#listaAdyacencia.length - 1);
        }
    }

    agregarArista(v1, v2, weight = 1) {
        if (this.#map.has(v1) && this.#map.has(v2)) {
            this.#listaAdyacencia[this.#map.get(v1)].add(v2, weight);
        } else {
            console.log("Algun vertice no existe en el grafo");
        }
    }

    obtenerListaAdyacencia() {
        return this.#listaAdyacencia;
    }

    obtenerVertices() {
        return Array.from(this.#map.keys());
    }

    obtenerIndiceVertice(key) {
        return this.#map.get(key);
    }

    obtenerVerticePorIndice(indice) {
        return this.#reverseMap.get(indice);
    }

    obtenerNumeroDeVertices() {
        return this.#listaAdyacencia.length;
    }
}
function DFS(verticeInicio, visitCallback, preVisitCallback, postVisitCallback) {
    const verticeVisitado = {};
    const verticesVisitados = [];
    let todasAristasVisitadas = true;

    const recorrerGrafo = (vertice) => {
        if (verticeVisitado[vertice]) return;
        verticeVisitado[vertice] = true;

        if (preVisitCallback) {
            preVisitCallback(vertice);
        }

        verticesVisitados.push(vertice);

        const indiceVertice = grafo.obtenerIndiceVertice(vertice);
        grafo.obtenerListaAdyacencia()[indiceVertice].forEach(verticeVecino => {
            if (!verticeVisitado[verticeVecino]) {
                if (visitCallback) {
                    visitCallback(vertice, verticeVecino);
                }
                recorrerGrafo(verticeVecino);
            }
        });

        if (postVisitCallback) {
            postVisitCallback(vertice);
        }
    };

    recorrerGrafo(verticeInicio);

    for (let i = 0; i < grafo.obtenerNumeroDeVertices(); i++) {
        if (!verticeVisitado[grafo.obtenerVerticePorIndice(i)]) {
            todasAristasVisitadas = false;
            break;
        }
    }

    return { verticesVisitados, todasAristasVisitadas };
}
function rutaMasCorta(grafo, inicio, destino) {
    const numeroDeVertices = grafo.obtenerNumeroDeVertices();
    const distancia = new Array(numeroDeVertices).fill(Infinity);
    const visitados = new Array(numeroDeVertices).fill(false);
    const previo = new Array(numeroDeVertices).fill(null);

    const inicioIndice = grafo.obtenerIndiceVertice(inicio);
    const destinoIndice = grafo.obtenerIndiceVertice(destino);
    distancia[inicioIndice] = 0;

    for (let i = 0; i < numeroDeVertices - 1; i++) {
        let u = minimaDistancia(distancia, visitados);

        visitados[u] = true;

        grafo.obtenerListaAdyacencia()[u].forEach(({ vertice: v, peso }) => {
            if (!visitados[v] && distancia[u] !== Infinity && distancia[u] + peso < distancia[v]) {
                distancia[v] = distancia[u] + peso;
                previo[v] = u;
            }
        });
    }

    const rutaIndices = [];
    let actual = destinoIndice;

    while (actual !== null) {
        rutaIndices.unshift(grafo.obtenerVerticePorIndice(actual));
        actual = previo[actual];
    }

    return { distancia: distancia[destinoIndice], rutaIndices };
}

function minimaDistancia(distancia, visitados) {
    let min = Infinity;
    let minimoNum = -1;

    for (let v = 0; v < distancia.length; v++) {
        if (!visitados[v] && distancia[v] <= min) {
            min = distancia[v];
            minimoNum = v;
        }
    }

    return minimoNum;
}

export default Grafo;