import authRoutes from "./routes/authRoutes";
import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes";
import {errorMiddleware} from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());

app.use(usuarioRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API funcionando!"
    });
});

app.use(errorMiddleware);

export default app;