import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = () => {
  log();
}
