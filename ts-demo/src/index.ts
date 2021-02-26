import * as _ from 'lodash'
import test from 'xyz/bb.js'
function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    test()
    return element;
}

document.body.appendChild(component());
