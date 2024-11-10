
import express from 'express'
import authRouter from './routers/authRouter.js'
import filme from './routers/filmeRouter.js'
import handler from './middlewares/errorHandler.js';
import { ENVIRONMENT, PORT, HOST } from './config.js';
import logger from './middlewares/logger.js';
import reviews from './controllers/reviews/reviewsController.js';
import cors from 'cors';


const app = express();

app.use(logger);
app.use(cors({}))

app.use(express.json());

app.use('/avalia' , reviews)

app.use('/filme' , filme)


app.use('/auth', authRouter)


app.use(handler)


app.listen(PORT, () => {

    console.log(`Servidor Rodando no Ambiente ${ENVIRONMENT} em ${ENVIRONMENT == 'production' ? HOST : HOST + ':' + PORT}`)

})