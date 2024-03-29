/**
 * @file Aplicacion para la gestion de un almacen
 * @author Fernando Zunzunegui
 * @version 1.0
 */


/**
 * @class Almacen
 * @property {number} capacidad Número de elementos que puede haber en el almacen
 * @property {Array}  cds Lista de cds
 * @property {Array} dvds Lista de dvds
 */
class Almacen {
    //Constructor de la clase almacén, recibe la cantidad de elementos (cds o dvds) que puede haber. 
    /**
     * @param {number} capacidad Numero de elementos
     */
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cds = [];
        this.dvds = [];
    }
    //El método introducir recibe un objeto y si hay sitio, tras comprobar si es de tipo cd o dvd lo mete dentro de la colección (Array) correspondiente. Devuelve 0 si no puede meterlo o en caso contrario el número de unidades introducidas.
    /**
     * @description Añade un objeto a su array correspondiente y si no hay espacio returna 0
     * @param {object} objeto objeto de tipo cd o dvd
     * @return {number}  0 si el almacen esta lleno o el objeto no es del tipo adecuado, si no devuelve el numero de unidades
     */
    introducir(objeto) {
        if (this.capacidad == 0) {
            console.log("almacen lleno")
            return 0;
        }
        if (objeto.unidades <= this.capacidad) {
            if (objeto.tipo == "cd") {
                this.cds.push(objeto)
            } else if (objeto.tipo == "dvd") {
                this.dvds.push(objeto)
            } else {
                return 0;
            }
            this.capacidad = this.capacidad - objeto.unidades;
            return objeto.unidades
        } else {
            if (objeto.tipo == "cd") {
                objeto.unidades = this.capacidad;
                this.capacidad = 0
                this.cds.push(objeto)
            } else if (objeto.tipo == "dvd") {
                objeto.unidades = this.capacidad;
                this.capacidad = 0
                this.dvds.push(objeto)
            } else {
                return 0;
            }
            return objeto.unidades
        }
    }
    //Este método recibe una cadena de texto y busca dentro del almacén si existe un cd o dvd con ese título o ese autor, si lo encuentra devulve un objeto con el título, autor, unidades y precio. Si no lo encuentra devuelve null
    /**
     * @description buscar un cd o dvd por titulo o autor
     * @param {string} tituloautor cadena de caracteres de un titulo o autor
     * @return {object}  objeto con el título, autor, unidades y precio si lo encuentra
     * @return {null} si no encuentra el objeto
     */
    buscar(tituloautor) {
        for (let obj of this.cds) {
            if ((tituloautor == obj.titulo) || (tituloautor == obj.autor)) {
                let objDevuelto = {
                    titulo: obj.titulo,
                    autor: obj.autor,
                    unidades: obj.unidades,
                    precio: obj.precio
                };
                return objDevuelto;
            }
        }
        for (let obj of this.dvds) {
            if ((tituloautor == obj.titulo) || (tituloautor == obj.autor)) {
                let objDevuelto = {
                    titulo: obj.titulo,
                    autor: obj.autor,
                    unidades: obj.unidades,
                    precio: obj.precio
                };
                return objDevuelto;
            }
        }
        return null;
    }
    //El método comprar, recibe una cadena de texto con un título y la cantidad de dinero. Devuelve -1 si no puede comprarlo y la cantidad de dinero que le sobra si lo puede comprar.
    /**
     * @description compara una cantidad de dinero con el precio de un artículo
     * @param {string} titulo titulo del cd o dvd
     * @param {number} dinero cantidad de dinero
     * @return {number}  -1 si no puede comprarlo o la cantidad que sobra
     */
    comprar(titulo, dinero) {
        for (let obj of this.cds) {
            if (titulo == obj.titulo) {
                if (dinero >= obj.precio) {
                    this.capacidad++;
                    obj.unidades--;
                    return dinero - obj.precio;
                } else {
                    return -1;
                }
            }
        }
        for (let obj of this.dvds) {
            if (titulo == obj.titulo) {
                if (dinero >= obj.precio) {
                    this.capacidad++;
                    obj.unidades--;
                    return dinero - obj.precio;
                } else {
                    return -1;
                }
            }
        }
        return -1;
    }


}

/**************Empieza el Programa******************** */
let fs = require("fs");
let texto = fs.readFileSync("catalogo.json", "utf-8");
let catalogo = JSON.parse(texto);


let alm1 = new Almacen(150);
for (let elemento of catalogo) {
    console.log(elemento)
    console.log(alm1.introducir(elemento))
}

