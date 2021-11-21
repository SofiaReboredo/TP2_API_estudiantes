import assert from 'assert'
import { crearServidor } from '../src/server.js'
import ClienteHTTP from '../src/estudiante.js'

const estuValido = {
    nombre: 'mariano',
    apellido: 'aquino',
    edad: 34,
    dni: '123'
}

const estuValido2 = {
    nombre: 'juana',
    apellido: 'perez',
    edad: 35,
    dni: '456'
}

const servidor = crearServidor()

const conexion = await servidor.conectar()

const estudiante = new ClienteHTTP(`http://localhost:${conexion.address().port}/estudiantes`)

console.log('1) Alta de un estudiante, con nombre, apellido, dni, y edad, siempre y cuando no exista otro con el mismo dni. a) Estudiante que no existe')
console.log(await estudiante.agregar(estuValido))

console.log('1) Alta de un estudiante, con nombre, apellido, dni, y edad, siempre y cuando no exista otro con el mismo dni. a) Estudiante 2 que no existe')
console.log(await estudiante.agregar(estuValido2))

console.log('1) Alta de un estudiante, con nombre, apellido, dni, y edad, siempre y cuando no exista otro con el mismo dni. b) Estudiante que ya existe')
console.log(await estudiante.agregar(estuValido))

console.log('2) Busqueda de todos los estudiantes registrados.')
console.log(await estudiante.obtener())

console.log('3) Búsqueda de estudiantes por rango de edad.')

console.log('4) Búsqueda de un estudiante, identificándolo por su dni.')
console.log(await estudiante.obtener({dni: '456'}))

console.log('5) Modificación de un estudiante, identificándolo por id.')
console.log(await estudiante.actualizar(1, {nombre: 'Pamela', apellido: 'Garcia', edad: 20, dni: '487'}))

console.log('6) Baja de un estudiante, identificándolo por su id.')
console.log(await estudiante.borrar(1))
console.log(await estudiante.obtener())

await servidor.desconectar()

