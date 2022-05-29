import express from 'express';
import bodyParser from 'body-parser';
import morgan from "morgan";
import clientsRouter from './resources/client/client.router';
import productsRouter from './resources/products/products.router';
import ordersRouter from './resources/orders/orders.router';
import { logger, errorHandler} from "./middleware";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(morgan('[:date[Europe/Minsk]] :method :url :status :response-time ms :body', {
  stream: { write: message => logger.http(message) }
}));
app.use(errorHandler);

process.on('Опа Ошибкочка!', (error: Error) => logger.error(error));
process.on('Опять ошика!', (error: Error) => logger.error(error));

app.use('/clients', clientsRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;