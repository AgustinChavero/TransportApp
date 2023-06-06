import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import dotenv from "dotenv";
import router from "./routers";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { HttpError } from "http-errors";
import { swaggerSpec } from "./swaggerOptions";
import compression from "compression";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(compression());

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  // res.header("Access-Control-Allow-Origin", "https://urban-movi.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  next();
});

app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  // Recorrer el cuerpo de la solicitud y convertir los valores a minúsculas e ignora cualquier key que tenga Id para evitar problemas
  const convertToLowerCase = (obj: any) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        convertToLowerCase(obj[key]);
      } else if (typeof obj[key] === "string" && !key.includes("Id") && !key.includes("id")) {
        obj[key] = obj[key].toLowerCase();
      }
    });
  };

  convertToLowerCase(req.body);
  next();
});

app.use("/", router);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  if (error instanceof HttpError) {
    const statusCode: number = error.statusCode || 500;
    const errorMessage: string = error.message || "Ocurrió un error";
    const errorResponse: object = {
      error: {
        code: statusCode,
        message: errorMessage,
      },
    };
    return res.status(statusCode).json(errorResponse);
  }
  const errorResponse: object = {
    error: {
      code: 500,
      message: "Ocurrió un error",
    },
  };
  return res.status(500).json(errorResponse);
});

app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
});
