/**
 *  Created by daiwenjuan on 2021/1/16 10:41.
 */
import _ from "lodash";
import "./style.css";
import Icon from "./icon.jpeg";
import printMe from "./print.js";
function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me sdfdsf";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
