import express from "express";
import itemRoutes from "./routes/item-routes";

const app = express();

app.use(express.json());

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));

app.use("/api/cart-items", itemRoutes);
