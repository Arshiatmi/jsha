let obj1 = new gameObject("myobj");
let page = new pageController();
let controller = new keyController();
function moveL(){
    obj1.moveX(-10);
}
function moveR(){
    obj1.moveX(10);
}
controller.addKey("a",moveL);
controller.addKey("d",moveR);
controller.control();
var mover;
obj1.setX(page.pageWidth / 2);
obj1.setY(page.pageHeight / 4);
function move(){
    let elem = document.getElementById('fire');
    elem.style.top = parseInt(elem.style.top) - 5 + "px";
    if(parseInt(elem.style.top) <= 2){
            elem.remove();
            clearInterval(mover);
    }
}
function update(event){
    let elem = document.createElement('img');
    elem.src = "test.jpg";
    elem.id = "fire";
    elem.style.top = $("myobj").style.top;
    elem.style.left = parseInt($("myobj").style.left) + 30 + "px";
    document.body.appendChild(elem);
    let fire = new gameObject('fire');
    mover = setInterval(move,5);
}
sendEvent("click",update);