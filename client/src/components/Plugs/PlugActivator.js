import React from "react";
import { Button } from "react-bootstrap";
import plugs from "../../apis/plugs";

class PlugActivator extends React.Component {
  onButtonClick = async (event) => {
    await plugs.post("/switch", {
      plug: this.props.plug,
      value: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.onButtonClick}
          value="1"
          variant="success"
          size="lg"
          className="ml-3"
        >
          On
        </Button>
        <Button
          onClick={this.onButtonClick}
          value="0"
          variant="danger"
          size="lg"
          className="ml-3"
        >
          Off
        </Button>
      </div>
    );
  }
}

export default PlugActivator;
