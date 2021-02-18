import React from "react";
import { Button } from "react-bootstrap";
import execSh from "exec-sh";

const PlugActivator = (props) => {
  const onButtonClick = (event) => {
    console.log(
      `Send code ${props.plug.systemCode} ${props.plug.unitCode} ${event.target.value}`
    );
    execSh(
      "/home/pi/rcswitch-pi/send " +
        props.plug.systemCode +
        " " +
        props.plug.unitCode +
        " " +
        event.target.value,
      function (err, stdout, stderr) {
        if (err) {
          console.log("Something went wrong", err);
          return;
        }
        if (stderr) {
          console.log("stderr: " + stderr);
          return;
        }
        console.log("stdout: " + stdout);
      }
    );
  };

  return (
    <div>
      <Button
        onClick={onButtonClick}
        value="1"
        variant="success"
        size="lg"
        className="ml-3"
      >
        On
      </Button>
      <Button
        onClick={onButtonClick}
        value="0"
        variant="danger"
        size="lg"
        className="ml-3"
      >
        Off
      </Button>
    </div>
  );
};

export default PlugActivator;
