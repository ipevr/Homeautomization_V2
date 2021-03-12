import React from "react";
import data from "../../apis/data";
import ButtonGroup from "../ButtonGroup";

class PlugActivator extends React.Component {
  onButtonClick = async (event) => {
    console.log(this.props.plug);
    await data.post("/switch", {
      plug: this.props.plug,
      value: event.target.value,
    });
  };

  render() {
    const buttonProps = [
      { title: "On", value: "1", variant: "success" },
      { title: "Off", value: "0", variant: "danger" },
    ];

    return (
      <ButtonGroup
        onClick={this.onButtonClick}
        buttonProps={buttonProps}
      ></ButtonGroup>
    );
  }
}

export default PlugActivator;
