class Grafo {
    constructor() {
        this.vertices = [];
        this.listaAdyacencia = [];
    }

    agregarVertice(nombre) {
        if (this.vertices.includes(nombre)) {
            return false;
        }
        this.vertices.push(nombre);
        this.listaAdyacencia.push([]);
        return true;
    }

    agregarArista(vertice1, vertice2, peso) {
        let indice1 = this.vertices.indexOf(vertice1);
        let indice2 = this.vertices.indexOf(vertice2);
        if (indice1 === -1 || indice2 === -1) {
            alert("Uno o ambos vértices no existen");
            return;
        }
        this.listaAdyacencia[indice1].push({ vertice: vertice2, peso });
        this.listaAdyacencia[indice2].push({ vertice: vertice1, peso });
    }

    obtenerIndiceVertice(vertice) {
        return this.vertices.indexOf(vertice);
    }

    obtenerVerticePorIndice(indice) {
        return this.vertices[indice];
    }

    obtenerListaAdyacencia() {
        return this.listaAdyacencia;
    }

    dfs(verticeInicio) {
        let visitados = new Set();
        let resultado = [];
        let indiceInicio = this.obtenerIndiceVertice(verticeInicio);

        const recorrer = (indice) => {
            if (visitados.has(indice)) return;
            visitados.add(indice);
            resultado.push(this.obtenerVerticePorIndice(indice));
            for (let { vertice } of this.listaAdyacencia[indice]) {
                recorrer(this.obtenerIndiceVertice(vertice));
            }
        };

        recorrer(indiceInicio);
        return resultado;
    }

    bfs(verticeInicio) {
        let visitados = new Set();
        let resultado = [];
        let cola = [this.obtenerIndiceVertice(verticeInicio)];

        while (cola.length) {
            let indice = cola.shift();
            if (visitados.has(indice)) continue;
            visitados.add(indice);
            resultado.push(this.obtenerVerticePorIndice(indice));
            for (let { vertice } of this.listaAdyacencia[indice]) {
                cola.push(this.obtenerIndiceVertice(vertice));
            }
        }
        return resultado;
    }

    
   
}

export default Grafo;
