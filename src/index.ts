import express from 'express'; 

import { routes } from './routes/router'

const app = express();

app.use(express.json())
app.use('/', routes)

export { app }