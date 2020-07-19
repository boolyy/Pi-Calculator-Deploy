import React from "react";
import Plot from "react-plotly.js";
import Value from "./Value";

export default class PlotlyComp extends React.Component {
  state = {
    generating: false,
    inCirclePoints: 0,
    inSquarePoints: 0,
    x: [],
    y: [],
    layout: {
      hoverMode: false,
      xaxis: {
        range: [-0.1, 25.1],
        zeroline: false,
      },
      yaxis: {
        range: [-0.1, 25.1],
        zeroline: false,
      },
      datarevision: 0,
      shapes: [
        {
          //this adds a circle
          type: "circle",
          xref: "x",
          yref: "y",
          x0: 0,
          y0: 0,
          x1: 25,
          y1: 25,
        },
        //adds a square
        {
          type: "square",
          xref: "x",
          yref: "y",
          x0: 0,
          y0: 0,
          x1: 25,
          y1: 25,
        },
      ],
      width: 700,
      height: 700,
      title: "Calculate Pi Using the Monte Carlo Method!",
    },
    revision: 0,
  };

  componentDidMount() {
    setInterval(this.genPoints, 25);
  }

  inCircle(xCord, yCord) {
    let radius = 12.5;
    let xDiff = xCord - 12.5;
    let yDiff = yCord - 12.5;
    if (radius > Math.sqrt(xDiff * xDiff + yDiff * yDiff)) {
      //if point is in circle
      return true;
    }
    return false;
  }

  genX() {
    //generates a random x component
    return Math.random() * 25;
  }

  genY = () =>
    //generates a random y component
    {
      return Math.random() * 25;
    };

  toggleGen = () => {
    this.setState({
      generating: !this.state.generating,
    });
  };

  genPoints = () => {
    if (this.state.generating) {
      const { x, y, layout } = this.state;
      let randX = this.genY(); //this will still gen something in x
      let randY = this.genY();
      if (this.inCircle(randX, randY)) {
        //point is in circle and square
        this.setState({
          inCirclePoints: this.state.inCirclePoints + 1,
          inSquarePoints: this.state.inSquarePoints + 1,
        });
      } else {
        //point is not in circle
        this.setState({
          inSquarePoints: this.state.inSquarePoints + 1,
        });
      }
      x.push(this.genY());
      y.push(this.genY());
      this.setState({ revision: this.state.revision + 1 });
      layout.datarevision = this.state.revision + 1;
    }
  };
  render() {
    return (
      <div className="center">
        <Plot
          data={[
            {
              x: this.state.x,
              y: this.state.y,
              type: "pointcloud",
            },
          ]}
          layout={this.state.layout}
          revision={this.state.revision}
        />
        <Value
          inSquarePoints={this.state.inSquarePoints}
          inCirclePoints={this.state.inCirclePoints}
        />
        <button
          onClick={() => {
            this.toggleGen();
          }}
        >
          Start/Stop
        </button>
      </div>
    );
  }
}
