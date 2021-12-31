import express from "express";
import Item from "../models/Item";

const itemRoutes = express.Router();

const items: Item[] = [
  {
    id: 1,
    product: "Hammer",
    price: 5,
    quantity: 3,
  },
  {
    id: 2,
    product: "Drill",
    price: 15,
    quantity: 4,
  },
  {
    id: 3,
    product: "Saw",
    price: 10,
    quantity: 2,
  },
  {
    id: 4,
    product: "Shovel",
    price: 8,
    quantity: 10,
  },
  {
    id: 5,
    product: "Sander",
    price: 1,
    quantity: 8,
  },
  {
    id: 6,
    product: "Torch",
    price: 2,
    quantity: 15,
  },
  {
    id: 7,
    product: "Beanie Baby",
    price: 75,
    quantity: 1,
  },
];
let nextId: number = 8;

// itemRoutes.get("/", function (req, res) {
//   res.json(items);
// });

itemRoutes.get("/", function (req, res) {
  let maxPrice = parseInt(req.query.maxPrice as string);
  let prefix = req.query.prefix as string;
  let pageSize = parseInt(req.query.pageSize as string);

  if (maxPrice) {
    let filteredMax: Item[] = items.filter((item) => item.price <= maxPrice);
    res.json(filteredMax);
  } else if (prefix) {
    let filteredPrefix = items.filter((item) =>
      item.product.toLowerCase().startsWith(prefix.toLowerCase())
    );
    res.json(filteredPrefix);
  } else if (pageSize) {
    let filteredPage: Item[] = items.filter(
      (item, index) => index <= pageSize - 1
    );
    res.json(filteredPage);
  } else {
    res.json(items);
  }
});

itemRoutes.get("/:id", function (req, res) {
  const item = items.find((item) => item.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).send("ID Not Found");
});

itemRoutes.post("/", function (req, res) {
  let newItem: Item = req.body;
  newItem.id = nextId;
  nextId += 1;
  items.push(newItem);
  res.status(201);
  res.json(newItem);
});

itemRoutes.put("/:id", function (req, res) {
  let index = items.findIndex((item) => item.id === parseInt(req.params.id));

  if (index !== -1) {
    items[index] = req.body;
    res.json(items[index]);
  } else {
    res.status(404).send("ID Not Found");
  }
});

itemRoutes.delete("/:id", function (req, res) {
  let inputId = parseInt(req.params.id);
  let itemIndex = items.findIndex((item) => item.id === inputId);
  items.splice(itemIndex, 1);
  res.status(204);
  res.json("");
});

export default itemRoutes;
