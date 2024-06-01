import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middleware/middleware'
import { userInfo } from 'os'
import notFound from './app/middleware/notFound'



const app: Application = express()
// const port = 3000

app.use(express.json())
app.use(cors())

//application route(formate:./api/v1/collection)

//./api/v1/students/create-student

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)

const getAControls = (req: Request, res: Response) => {
  res.send('server running')
}
app.get('/', getAControls)

app.use(globalErrorHandler)
app.use(notFound)

export default app
