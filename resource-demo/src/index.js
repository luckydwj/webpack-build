import mainImage from '../images/main.png'
function component() {
    const element = document.createElement('div');
    var img=new Image()
    img.src=mainImage
    element.appendChild(img)
    return element;
}
document.body.appendChild(component());
