import React from "react";
import Plot from "react-plotly.js";

export default class PlotlyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: [],
      y: [],
      updating: false,
      datarevision: 0,
    };
    this.genX = this.genX.bind(this);
    this.genY = this.genY.bind(this);
    this.genPoints = this.genPoints.bind(this);
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

  componentDidMount() {
    setInterval(this.genPoints(), 500);
  }

  render() {
    return (
      <Plot
        revision={this.state.datarevision}
        datarevision={this.state.datarevision}
        data={[
          {
            x: this.state.x,
            y: this.state.y,
            type: "pointcloud",
          },
        ]}
        layout={{
          xaxis: {
            range: [-0.1, 25.1],
            zeroline: false,
            revision: this.state.datarevision,
            datarevision: this.state.datarevision,
          },
          yaxis: {
            range: [-0.1, 25.1],
            zeroline: false,
          },
          width: 700,
          height: 700,
          title: "Calculating Pi using the Monte Carlo Method!",
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
        }}
      />
    );
  }
}
