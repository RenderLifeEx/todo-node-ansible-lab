import express from "express";
import todoRoutes from "./routes/todos";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;
const FRONT_PORT = 3001;

app.use(bodyParser.json());
app.use("/todos", todoRoutes);

app.use(cors({
    origin: `http://localhost:${FRONT_PORT}`,
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
