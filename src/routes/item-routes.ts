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
		product: "Trimmer",
		price: 6,
		quantity: 8,
	},
	{
		id: 8,
		product: "Beanie Baby",
		price: 75,
		quantity: 1,
	},
];

let nextId: number = 9;

itemRoutes.get("/", function (req, res) {
	let maxPrice: number = parseInt(req.query.maxPrice as string);
	let prefix: string = req.query.prefix as string;
	let pageSize: number = parseInt(req.query.pageSize as string);
	let objectArray: Item[] = [];
	//   let input = req.query; // RETURNS OBJECT OF QUERY PARAMS

	if (prefix) {
		let filteredPrefix = items.filter((item) =>
			item.product.toLowerCase().startsWith(prefix.toLowerCase())
		);
		if (maxPrice) {
			let prefixMax = filteredPrefix.filter((item) => item.price <= maxPrice);
			prefixMax.forEach((i) => objectArray.push(i));
			//   objectArray.push(prefixMax); //PUSHES AN ARRAY INTO AN ARRAY CREATING SUB-ARRAYS IN ARRAY
		} else {
			filteredPrefix.forEach((i) => objectArray.push(i));
		}
	} else if (maxPrice) {
		let filteredMax = items.filter((item) => item.price <= maxPrice);
		filteredMax.forEach((i) => objectArray.push(i));
		// objectArray.push(filteredMax); // PUSHING SUB-ARRAY... NEED TO USE ABOVE LINE & RESOLVE ERROR
	} else {
		items.forEach((i) => objectArray.push(i));
	}

	if (pageSize) {
		let filteredPage = objectArray.filter(
			(item, index) => index <= pageSize - 1
		);
		res.json(filteredPage);
		// res.render("cart-items", { filteredPage });
	} else {
		res.json(objectArray);
		// res.render("cart-items", { objectArray });
	}
});

///// ORIGINAL //////
// itemRoutes.get("/", function (req, res) {
//   let maxPrice: number = parseInt(req.query.maxPrice as string);
//   let prefix: string = req.query.prefix as string;
//   let pageSize: number = parseInt(req.query.pageSize as string);
//   let input = req.query;

//   if (maxPrice) {
//     let filteredMax: Item[] = items.filter((item) => item.price <= maxPrice);
//     res.json(filteredMax);
//   } else if (prefix) {
//     let filteredPrefix = items.filter((item) =>
//       item.product.toLowerCase().startsWith(prefix.toLowerCase())
//     );
//     res.json(filteredPrefix);
//   } else if (pageSize) {
//     let filteredPage: Item[] = items.filter(
//       (item, index) => index <= pageSize - 1
//     );
//     res.json(filteredPage);
//   } else {
//     res.json(items);
//   }
// });

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
	res.json(`Item ID# ${itemIndex} Was Deleted.`);
});

export default itemRoutes;
