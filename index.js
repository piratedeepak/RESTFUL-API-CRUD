const express = require("express");
const { custom } = require("joi");
const Joi = require("joi");
const app = express();
app.use(express.json());

const customers = [
  { title: "Deepak", id: 1 },
  { title: "Rahul", id: 2 },
  { title: "Jatin", id: 3 },
  { title: "Deevanshu", id: 4 },
  { title: "Nikhil", id: 5 },
  { title: "DAshish", id: 6 },
];

app.get("/", (req, res) => {
  res.send("I am learning RESTAPI...");
});

app.get("/api/customers", (req, res) => {
  res.send(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) {
    res.status(404).send(`
    
    <h2 style="font-family: Malgun Gothic; color: darked">
      Ooops... Cant find what you
    </h2>
 

    `);
  }
  res.send(customer);
});

app.post("/api/customers", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = {
    id: customers.length + 1,
    title: req.body.title,
  };
  customers.push(customer);
  res.send(customer);
});

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) {
    res.status(404).send(`
      <h2 style="font-family: Malgun Gothic; color: darked">
      Ooops... Customer not existed
    </h2>
      `);
  }
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  customer.title = req.body.title;
  res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) {
    res.status(404).send(`
      <h2 style="font-family: Malgun Gothic; color: darked">
      Ooops... Customer not existed
    </h2>
      `);
  }
  const index = customers.indexOf(customer);
  customers.splice(index, 1);
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    title: Joi.string().min(3).required(),
  };
  return new Joi.ValidationError(customer, schema);
}

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
