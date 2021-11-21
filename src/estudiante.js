import axios from 'axios'

class ClienteHTTP {
    constructor(url) {
        this.url = url
    }

    async agregar(recurso) {
        try {
            // console.log(recurso)
            const respuesta = await axios.post(this.url, recurso)
            return respuesta.data
        } catch (error) {
            throw error.response
        }
    }

    async obtener(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${this.url}${queryString ? '?' + queryString : ''}`
        try {
            const respuesta = await axios.get(url)
            return respuesta.data
        } catch (error) {
            throw error.response
        }
    }

    async actualizar(id){
        try {
            const respuesta = await axios.put(`${this.url}/${id}`)
            return respuesta.data
        } catch (error) {
            throw error.response
        }
    }

    async borrar(id) {
        try {
            const respuesta = await axios.delete(`${this.url}/${id}`)
            return respuesta.data
        } catch (error) {
            throw error.response
        }
    }
}

export default ClienteHTTP
