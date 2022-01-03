import express from "express";
import itemRoutes from "./routes/item-routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));

app.use("/api/cart-items", itemRoutes);
