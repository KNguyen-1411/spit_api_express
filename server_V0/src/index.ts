import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';
import 'dotenv/config';
import connectToDatabase from './config/db';
import options from './utils/swagger';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const specs = swaggerJsdoc(options);

app.get('/', (req: Request, res: Response) => {
  res.send(
    '<div style="text-align:center; margin-top:30vh"> <h1>Hello world!</h1> <h3>API docs: /api-docs/ </h3> </div>'
  );
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
