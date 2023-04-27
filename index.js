
const express = require("express");
const service = require("./service");
const validate = require("./validation");
const app = express();

const port = 3000;
app.use(express.json());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/product", async (req, res) => {
  let result = await service.getProduct();
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  try {
    const idp = req.params.id;
    if (!validate.validateId(idp))
      throw new Error("Invalid Product ID!!!!", 400);
    let result = await service.getProductbyId(idp);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
    // res.status(err.status);
    // console.log(err.status);
  }
});

app.post("/addProduct/:id", async (req, res) => {
  try {
    const idp = req.params.id;
    if (!validate.validateId(idp))
      throw new Error(
        "User is Not Valid To Post a Product,Please Give A Valid User ID "
      );
    const product = req.body;
    let result = await service.add(product, idp);
    res.status(201).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});
app.post("/createUser", async (req, res) => {
  try {
    const user = req.body;
    let result = await service.addUser(user);
    // console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

app.patch("/product/:id/upvote", async (req, res) => {
  try {
    // const idp=req.params.id
    let result = await service.addUpvote();
    res.send("added upvote succesfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/product/:id/", async (req, res) => {
  try {
    const idp = req.params.id;
    const id1 = req.body._id;
    console.log(id1);
    if (!(validate.validateId(idp) && validate.validateId(id1)))
      throw new Error("Invalid  ID!!!!!");
    let result = await service.deleteProductBYId(idp, id1);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
