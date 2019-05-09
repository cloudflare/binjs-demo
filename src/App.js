import React, { Component } from "react";
import "./App.css";
import BarChart from "./visualizations/BarChart";
import RadialChart from "./visualizations/RadialChart";
import Chart from "./visualizations/Chart";
import moment from "moment";
import { range } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import bluebird from "bluebird";
import jquery from "jquery";

window["$"] = jquery;
window.Promise = bluebird;

function log() {
  console.log("it's", moment().toString());

  range(1, 20).pipe(
    filter(x => x % 2 === 1),
    map(x => x + x)
  ).subscribe(x => console.log(x));
}

class App extends Component {
  state = {
    temps: {},
    city: "sf", // city whose temperatures to show
    range: [] // time range set by the brush
  };

  componentDidMount() {
    window.onload = () => {
      Promise.all([
        fetch(`${process.env.PUBLIC_URL || ""}/sf.json`),
        fetch(`${process.env.PUBLIC_URL || ""}/ny.json`)
      ])
        .then(responses => Promise.all(responses.map(resp => resp.json())))
        .then(([sf, ny]) => {
          sf.forEach(day => (day.date = new Date(day.date)));
          ny.forEach(day => (day.date = new Date(day.date)));

          this.setState({ temps: { sf, ny } });
        });
    };

    log();
  }

  updateCity = e => {
    this.setState({ city: e.target.value });
  };

  updateRange = range => {
    this.setState({ range });
  };

  render() {
    const data = this.state.temps[this.state.city];

    return (
      <div className="App">
        <h1>
          2017 Temperatures for
          <select name="city" onChange={this.updateCity}>
            {[
              { label: "San Francisco", value: "sf" },
              { label: "New York", value: "ny" }
              // {label: 'Amsterdam', value: 'am'},
            ].map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </h1>
        <p>
          *warning: these are <em>not</em> meant to be good examples of data
          visualizations,<br />
          but just to show the possibility of using D3 and React*
        </p>
        <BarChart
          data={data}
          range={this.state.range}
          updateRange={this.updateRange}
        />
        <RadialChart data={data} range={this.state.range} />
        <Chart data={data} />

        <p>
          (Weather data from{" "}
          <a href="wunderground.com" target="_new">
            wunderground.com
          </a>)
        </p>
      </div>
    );
  }
}

export default App;
