let obj1 = new gameObject("myobj");
let page = new pageController();
let controller = new keyController();
controller.mouseMove(obj1,"x");
controller.addKeys({" ":shoot})
controller.control();
let mover = "";
let elem;
obj1.setX(page.pageWidth / 2);
obj1.setY(page.pageHeight / 4);
let enemy = new jshaObject('img',"type1");
enemy.setAttribute("src","./Enemies/enemy1.png");
enemy.setClass("enemies");
enemy.oncollision("fires",remover);
pourX(enemy,10,100);
pourX(enemy,10,200);

function remover(obj1,obj2){
    obj1.remove();
    obj2.remove();
}

function move(){
    let objs = _("fires");
    for(let i = 0 ; i < objs.length ; i++){
        objs[i].style.top = (parseInt(objs[i].style.top) - 5) + "px";
    }
}
function shoot(event){
    elem = new jshaObject('img','fires');
    elem.setAttribute("src","test.jpg");
    elem.addClass("fires");
    elem.setCSSAttribute("top",$("myobj").style.top);
    elem.setCSSAttribute("left",(parseInt($("myobj").style.left) + 30) + "px");
    elem.appendTo("body");
}
setTreshold('fires');
mover = (setInterval(move,1000/fps));