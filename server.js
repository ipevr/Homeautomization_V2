const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 5000;
const rawdata = fs.readFileSync("./db.json");
const data = JSON.parse(rawdata);

const getNextId = (type) => {
  if (!type || type.length === 0) {
    return 1;
  }

  const ids = type.map((item) => item.id);
  const highestId = Math.max(...ids);
  return highestId + 1;
};

const getData = (type) => {
  const rawdata = fs.readFileSync("./db.json");
  const data = JSON.parse(rawdata);
  if (!(type in data)) {
    data[type] = [];
  }
  return data;
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .route("/plugs")
  .get((req, res) => {
    res.send(getData("plugs").plugs);
  })
  .post((req, res) => {
    const newPlug = req.body;
    const data = getData("plugs");
    const newId = getNextId(data.plugs);
    newPlug.id = newId;
    data.plugs.push(newPlug);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(newPlug);
  });

app
  .route("/plug/:id")
  .get((req, res) => {
    const data = getData("plugs");
    const plug = data.plugs.find((plug) => {
      return plug.id.toString() === req.params.id;
    });
    res.send(plug);
  })
  .patch((req, res) => {
    const plugModified = req.body;
    plugModified.id = parseInt(req.params.id);
    const data = getData("plugs");
    data.plugs = data.plugs.map((plug) =>
      plug.id === plugModified.id ? plugModified : plug
    );
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(plugModified);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const data = getData("plugs");
    data.plugs = data.plugs.filter((plug) => plug.id.toString() !== id);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.plugs);
  });

app.post("/switch", (req, res) => {
  const { systemCode, unitCode } = req.body.plug;
  exec(
    `/home/pi/rcswitch-pi/send ${systemCode} ${unitCode} ${req.body.value}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log("Something went wrong: ", err);
        res.send(err);
      }
      if (stderr) {
        console.log("stderr: ", stderr);
        res.send(stderr);
      }
      console.log("stdout: ", stdout);
      res.send(stdout);
    }
  );
});

app
  .route("/categories")
  .get((req, res) => {
    res.send(getData("categories").categories);
  })
  .post((req, res) => {
    const newPlug = req.body;
    const data = getData("categories");
    const newId = getNextId(data.categories);
    newPlug.id = newId;
    data.categories.push(newPlug);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(newPlug);
  });

app
  .route("/category/:id")
  .get((req, res) => {
    const data = getData("categories");
    const category = data.categories.find((category) => {
      return category.id.toString() === req.params.id;
    });
    res.send(category);
  })
  .patch((req, res) => {
    console.log("patch category");
    const categoryModified = req.body;
    categoryModified.id = parseInt(req.params.id);
    const data = getData("categories");
    data.categories = data.categories.map((category) =>
      category.id === categoryModified.id ? categoryModified : category
    );
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(categoryModified);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const data = getData("categories");
    data.categories = data.categories.filter(
      (category) => category.id.toString() !== id
    );
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.categories);
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
