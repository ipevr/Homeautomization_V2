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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
  .route("/plugs")
  .get((req, res) => {
    console.log("get plugs request");
    const rawdata = fs.readFileSync("./db.json");
    const data = JSON.parse(rawdata);
    res.send(data.plugs);
  })
  .post((req, res) => {
    const newPlug = req.body;
    const rawdata = fs.readFileSync("./db.json");
    const data = JSON.parse(rawdata);
    const newId = getNextId(data.plugs);
    newPlug.id = newId;
    data.plugs.push(newPlug);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(newPlug);
  });

app.post("/switch", (req, res) => {
  const { systemCode, unitCode } = req.body.plug;
  exec(
    `/home/pi/rcswitch-pi/send ${systemCode} ${unitCode} ${req.body.value}`,
    (err, stdout, stderr) => {
      if (err) {
        console.log("Something went wrong: ", err);
      }
      if (stderr) {
        console.log("stderr: ", stderr);
      }
      console.log("stdout: ", stdout);
    }
  );
  res.send("success");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
