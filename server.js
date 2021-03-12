const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 5000;
const rawdata = fs.readFileSync("./db.json");
const data = JSON.parse(rawdata);

const getNextNumber = (items, identifier) => {
  if (!items || items.length === 0) {
    return 1;
  }

  const numbers = items.map((item) => item[identifier]);
  return Math.max(...numbers) + 1;
};

const getData = (type) => {
  const rawdata = fs.readFileSync("./db.json");
  const data = JSON.parse(rawdata);
  if (!(type in data)) {
    data[type] = [];
  }
  return data;
};

const recalculatePositions = (items, pos) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].position > pos) {
      items[i].position--;
    }
  }
  return items;
};

const patchCategories = (id, changedData, categoriesData) => {
  if ("name" in changedData) {
    return categoriesData.map((category) => {
      if (category.id === id) {
        category.name = changedData.name;
      }
      return category;
    });
  } else if ("position" in changedData) {
    const positions = categoriesData.map((category) => category.position);
    const highestPos = Math.max(...positions);
    if (changedData.position > highestPos || changedData.position <= 0) {
      return categoriesData;
    }
    const index = categoriesData.findIndex((category) => category.id === id);
    if (categoriesData[index].position > changedData.position) {
      // category goes 1 position upwards
      categoriesData.find(
        (category) => category.position === changedData.position
      ).position++;
    } else {
      // category goes 1 position downwards
      categoriesData.find(
        (category) => category.position === changedData.position
      ).position--;
    }
    categoriesData[index].position = changedData.position;
  }
  return categoriesData;
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//************************* PLUGS *************************/

app
  .route("/plugs")
  .get((req, res) => {
    res.send(getData("plugs").plugs);
  })
  .post((req, res) => {
    const newPlug = req.body;
    const data = getData("plugs");
    const newId = getNextNumber(data.plugs, "id");
    newPlug.id = newId;
    newPlug.category = data.categories.find(
      (category) => category.name === newPlug.category
    ).id;
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
    const modifiedPlug = req.body;
    const data = getData("plugs");
    modifiedPlug.id = parseInt(req.params.id);
    modifiedPlug.category = data.categories.find(
      (category) => category.name === modifiedPlug.category
    ).id;
    data.plugs = data.plugs.map((plug) =>
      plug.id === modifiedPlug.id ? modifiedPlug : plug
    );
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(modifiedPlug);
  })
  .delete((req, res) => {
    const id = req.params.id;
    const data = getData("plugs");
    data.plugs = data.plugs.filter((plug) => plug.id.toString() !== id);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.plugs);
  });

//************************* CATEGORIES *************************/

app
  .route("/categories")
  .get((req, res) => {
    res.send(getData("categories").categories);
  })
  .post((req, res) => {
    const newCategory = req.body;
    const data = getData("categories");
    const newId = getNextNumber(data.categories, "id");
    newCategory.id = newId;
    newCategory.position = getNextNumber(data.categories, "position");
    data.categories.push(newCategory);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(newCategory);
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
    const data = getData("categories");
    data.categories = patchCategories(
      parseInt(req.params.id),
      req.body,
      data.categories
    );
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.categories);
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const data = getData("categories");
    const pos = data.categories.find((category) => category.id === id).position;
    data.categories = data.categories.filter((category) => category.id !== id);
    data.categories = recalculatePositions(data.categories, pos);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.categories);
  });

//************************* GROUPS *************************/

app
  .route("/groups")
  .get((req, res) => {
    res.send(getData("groups").groups);
  })
  .post((req, res) => {
    const newGroup = req.body;
    const data = getData("groups");
    const newId = getNextNumber(data.groups, "id");
    newGroup.id = newId;
    data.groups.push(newGroup);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(newGroup);
  });

app.route("/group/:id").get((req, res) => {
  const data = getData("groups");
  const category = data.groups.find((groups) => {
    return group.id.toString() === req.params.id;
  });
  res.send(category);
});

//************************* SWITCH *************************/

app.post("/switch", (req, res) => {
  const plugs = [];
  const error = [];
  const stderror = [];

  if (req.body.plug.plugs) {
    const data = getData("plugs");
    req.body.plug.plugs.map((plugId) => {
      const plug = data.plugs.find((plug) => plug.id.toString() === plugId);
      plugs.push({ systemCode: plug.systemCode, unitCode: plug.unitCode });
    });
  } else {
    const { systemCode, unitCode } = req.body.plug;
    plugs.push({ systemCode, unitCode });
  }

  for (let i = 0; i < plugs.length; i++) {
    console.log(
      `/home/pi/rcswitch-pi/send ${plugs[i].systemCode} ${plugs[i].unitCode} ${req.body.value}`
    );
    exec(
      `/home/pi/rcswitch-pi/send ${plugs[i].systemCode} ${plugs[i].unitCode} ${req.body.value}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log("Something went wrong: ", err);
          error.push(err);
        }
        if (stderr) {
          console.log("stderr: ", stderr);
          stderror.push(stderr);
        }
        console.log("stdout: ", stdout);
      }
    );
  }

  if (error.length > 0 || stderror.length > 0) {
    res.send("Finished with errors");
  }
  res.send("Finished");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
