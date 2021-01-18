/**
 *  Created by daiwenjuan on 2021/1/16 10:41.
 */
import _ from "lodash";
// import Print from "./print";
import * as demoNumbers from '../../library-demo/dist/demo-numbers'
function getComponent() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");

  btn.innerHTML = "Click me sdfdsf";
  // element.onclick = Print.bind(null, "Hello webpack!");
  btn.onclick =  function () {
    // const { default: print } = await import(/*webpackPrefetch:true*/ "./print");
    // print();
    var a=demoNumbers.wordToNum('Two');
    console.log(a)
  };

  element.appendChild(btn);

  return element;
}

document.body.appendChild(getComponent());
