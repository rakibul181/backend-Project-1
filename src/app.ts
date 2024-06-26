import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/router'

const app: Application = express()
// const port = 3000

app.use(express.json())
app.use(cors())

//application route(formate:./api/v1/collection)

//./api/v1/students/create-student

app.use('/api/v1', router)

const getAControls = (req: Request, res: Response) => {
  res.send('server running')
}
app.get('/', getAControls)

app.use(globalErrorHandler)
app.use(notFound)

export default app
