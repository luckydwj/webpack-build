import {test} from './smg/aa'
function component() {
    const element = document.createElement('div');
    element.innerHTML = 'hello-webpack';
    test()
    return element;
}
document.body.appendChild(component());
