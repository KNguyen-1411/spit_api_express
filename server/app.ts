import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import connectToDatabase from "./config/connectDB";
import router from "./src/routes";
import options from "./config/swagger";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Connect to database
connectToDatabase();

// Routes
app.use("/api/v1", router);

// Routes
app.get("/", (req: Request, res: Response) => {
  req;
  res.send("<div style='text-align:center;margin-top:40vh;'><h1>Hello World</h1></div>");
});
// Start server
app.listen(PORT, () => {
  console.log(`Restart server with port: ${PORT}`);
});
