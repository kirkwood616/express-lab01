import express from "express";
import itemRoutes from "./routes/item-routes";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("view options", { layout: "layouts/main" });
app.use(express.static(path.join(__dirname, "public")));

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));

app.get("/", (req, res) => {
	res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

app.use("/api/cart-items", itemRoutes);
