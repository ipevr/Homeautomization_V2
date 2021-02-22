const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const port = process.env.PORT || 5000;
const rawdata = fs.readFileSync("./db.json");
const data = JSON.parse(rawdata);

const getNextId = (data) => {
  const ids = data.map((item) => item.id);
  const highestId = Math.max(...ids);
  return highestId + 1;
};

const getData = () => {
  const rawdata = fs.readFileSync("./db.json");
  const data = JSON.parse(rawdata);
  return data;
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .route("/plugs")
  .get((req, res) => {
    res.send(getData().plugs);
  })
  .post((req, res) => {
    const newPlug = req.body;
    const data = getData();
    const newId = getNextId(data.plugs);
    newPlug.id = newId;
    data.plugs.push(newPlug);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(newPlug);
  });

app
  .route("/plugs/:id")
  .get((req, res) => {
    const data = getData();
    const plug = data.plugs.find((plug) => {
      return plug.id.toString() === req.params.id;
    });
    res.send(plug);
  })
  .patch((req, res) => {
    const plugModified = req.body;
    plugModified.id = parseInt(req.params.id);
    const data = getData();
    data.plugs = data.plugs.map((plug) => {
      return plug.id === plugModified.id ? plugModified : plug;
    });
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(plugModified);
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
      res.send(sdtout);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
