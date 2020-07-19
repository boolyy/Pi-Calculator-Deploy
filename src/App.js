import React from "react";
import "./App.css";
import PlotlyComponent from "./Components/PlotlyComponent";
import Value from "./Components/Value";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [2, 3, 4],
      y: [2, 3, 4],
      updating: false,
      datarevision: 0,
    };
    this.genPoints = this.genPoints.bind(this);
    this.genX = this.genX.bind(this);
    this.genY = this.genY.bind(this);
  }

  genX() {
    //generates a random x component
    return Math.random() * 25;
  }

  genY() {
    //generates a random y component
    return Math.random() * 25;
  }

  genPoints() {
    //will start adding random points to graph
    this.state.x.push(this.genX()); //adds a random x cord
    this.state.y.push(this.genY()); //adds a random y cord
    this.state.updating = true;
    this.setState((prevState) => ({
      datarevision: prevState.datarevision + 1,
    }));
    console.log("x:" + this.state.x);
    console.log("y:" + this.state.y);
    console.log(this.state.datarevision);
  }

  render() {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.genPoints();
            }}
          >
            Start
          </button>
        </div>
        <div className="center">
          <PlotlyComponent
            datarevision={this.state.datarevision}
            x={this.state.x}
            y={this.state.y}
            updating={this.state.updating}
          />
          <Value />
        </div>
      </div>
    );
  }
}
