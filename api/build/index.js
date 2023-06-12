"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const routers_1 = __importDefault(require("./routers"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const http_errors_1 = require("http-errors");
const swaggerOptions_1 = require("./swaggerOptions");
const compression_1 = __importDefault(require("compression"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
}));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions_1.swaggerSpec));
app.use((0, compression_1.default)());
app.use((_req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Origin", "https://urban-movi.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
    next();
});
app.use(express_1.default.json());
app.use((req, _res, next) => {
    // Recorrer el cuerpo de la solicitud y convertir los valores a minúsculas e ignora cualquier key que tenga Id para evitar problemas
    const convertToLowerCase = (obj) => {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "object") {
                convertToLowerCase(obj[key]);
            }
            else if (typeof obj[key] === "string" && !key.includes("Id") && !key.includes("id")) {
                obj[key] = obj[key].toLowerCase();
            }
        });
    };
    convertToLowerCase(req.body);
    next();
});
app.use("/", routers_1.default);
app.use((error, _req, res, _next) => {
    console.error(error);
    if (error instanceof http_errors_1.HttpError) {
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Ocurrió un error";
        const errorResponse = {
            error: {
                code: statusCode,
                message: errorMessage,
            },
        };
        return res.status(statusCode).json(errorResponse);
    }
    const errorResponse = {
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
