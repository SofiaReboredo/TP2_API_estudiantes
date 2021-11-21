import { crearServidor } from './server.js'

const servidor = crearServidor()

const PORT = 5000;
const conexion = await servidor.conectar(PORT)

console.log(`servidor conectado en puerto ${conexion.address().port}`)
