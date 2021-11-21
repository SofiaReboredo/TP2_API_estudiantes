import express from 'express'

let ultimoId = 0

function crearId() {
  const nuevoId = ultimoId + 1
  ultimoId = nuevoId
  return nuevoId
}

function crearServidor() {

  const app = express()

  app.use(express.json())

  const estudiantes = []

  app.get('/', (req, res) => {
    res.json({ msg: 'Bienvenido a express' })
  })

  app.post('/estudiantes', (req, res) => {
    // console.log(req.body)
    const estudiante = { ...req.body, id: crearId() }
    let existeEstudiante = estudiantes.find(e => e.dni === req.body.dni);
    if (!existeEstudiante) {
      estudiantes.push(estudiante)
      res.json(estudiante)
    } else {

      res.json({
        msg: `Estudiante con dni ${req.body.dni} ya existe`
      })
    }

  })

  app.get('/estudiantes', (req, res) => {

    if (req.query.dni) {
      const result = estudiantes.filter(p => p.dni.startsWith(req.query.dni))
      res.json(result)
    } else {
      res.json(estudiantes)
    }
  })

  app.get('/estudiantes/:idEstudiante', (req, res) => {
    // console.log(req.params)
    const { idEstudiante } = req.params

    // const idNumerico = parseInt(idEstudiante)

    const estudiante = estudiantes.find(p => p.id == idNumerico)

    if (estudiante) {
      res.json(estudiante)
    } else {
      res.status(404)
      res.json({
        msg: `estudiante con id ${idNumerico} no encontrado`
      })
    }
  })

  app.delete('/estudiantes/:idEstudiante', (req, res) => {
    // console.log(req.params)
    const { idEstudiante } = req.params

    const idNumerico = parseInt(idEstudiante)

    const estudiante = estudiantes.find(p => p.id == idNumerico)

    if (estudiante) {
      res.json(estudiante)
    } else {
      res.status(404)
      res.json({
        msg: `estudiante con id ${idNumerico} no encontrado`
      })
    }
  })

  app.put('/estudiantes/:idEstudiante', (req, res) => {
    const estudiante = { ...req.body }
    const { idEstudiante } = req.params
    const idNumerico = parseInt(idEstudiante)
    const indexEstudiante = estudiantes.find(p => p.id == idNumerico)

    estudiantes[indexEstudiante] = estudiante

    if (indexEstudiante != -1) {
      res.json(estudiante)
    } else {
      res.json({
        msg: `estudiante con id ${idNumerico} no encontrado`
      })

    }
  })

  app.patch('/estudiantes/:idEstudiante', (req, res) => {
    const campos = { ...req.body }

    const { idEstudiante } = req.params
    const idNumerico = parseInt(idEstudiante)
    const indexEstudiante = estudiantes.find(p => p.id == idNumerico)

    estudiantes[indexEstudiante] = { ...estudiantes[indexEstudiante], ...campos }

    if (indexEstudiante != -1) {
      res.json(estudiantes[indexEstudiante])
    } else {
      res.json({
        msg: `estudiante con id ${idNumerico} no encontrado`
      })
    }
  })

  let server

  return {
    conectar: (puerto = 0) => {
      return new Promise((resolve, reject) => {
        server = app.listen(puerto)
        server.on('request', request => { console.log(`${new Date().toLocaleString()}: ${request.method} ${request.url}`) })
        server.on('listening', () => { resolve(server) })
        server.on('error', error => { reject() })
      })
    },
    desconectar: () => {
      return new Promise((resolve, reject) => {
        server.close(error => {
          if (error) reject(error)
          else resolve()
        })
      })
    }
  }
}

export { crearServidor }