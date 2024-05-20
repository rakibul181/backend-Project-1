import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/config/modules/students/student.route'
const app: Application = express()
// const port = 3000

app.use(express.json())
app.use(cors())

//application route(formate:./api/v1/collection)

//./api/v1/students/create-student

app.use('/api/v1/students', StudentRoutes)

const getAControls = (req: Request, res: Response) => {
  const a = 10

  res.send(a)
}
app.get('/', getAControls)

export default app
