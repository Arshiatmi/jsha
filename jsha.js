// Get Object Of An Specific id
function $(id) {
    return document.getElementById(id);
}

// Get All Objects Of An Specific name
function _(name) {
    return document.getElementsByName(name);
}

// Initialize Everything To Use The Object As gameObject.
function init(obj) {
    moveInit(obj);
    moveX(obj, 0);
    moveY(obj, 0);
}

// Inspect Collision Of Two Object
function collision(obj1, obj2) {
    let myobj = obj1;
    let minPlayer = parseInt(myobj.style.left);
    let maxPlayer = minPlayer + parseInt(myobj.style.width);
    let minRangey = parseInt(obj2.style.top);
    let maxRangey = minRangey + parseInt(obj2.height);
    let minPlayery = parseInt(myobj.style.top);
    let maxPlayery = minPlayery + parseInt(myobj.height);

    if (maxRangey > minPlayery && minRangey < maxPlayery) {
        let minRange = parseInt(obj2.style.left);
        let maxRange = minRange + parseInt(obj2.width);
        if (maxRange > minPlayer && minRange < maxPlayer) {
            return true;
        }
        return false;
    }
    return false;
}

// Set Image Source In One img Object
function setImg(obj1, img_src) {
    obj1.src = img_src;
}

// Count Something Like Level, Score And ...
function number(first_value = 0) {
    this.number = first_value;

    this.increase = function (how_many = 1) {
        this.number += how_many;
    }
    this.decrease = function (how_many = 1) {
        this.number -= how_many;
    }
}

// Sends Events Like Keypressed And ...
function sendEvent(which_event, func, id = "") {
    if (!id) {
        document.querySelector('body').addEventListener(which_event, func);
    }
    else {
        document.getElementById(id).addEventListener(which_event, func);
    }
}

// Gives You A Random Number Between 1 And [to] .
function randInt(to = 10) {
    return Math.floor(Math.random() * to) + 1;
}

// Initialize For Movement Functions .
function moveInit(obj1) {
    obj1.style.position = "absolute";
}

// Move An Element In [how_many] Pixel In X .
function moveX(obj1, how_many) {
    let num = parseInt(obj1.style.left);
    if (num) {
        obj1.style.left = (num + how_many) + "px";
    }
    else {
        obj1.style.left = (how_many) + "px";
    }
}

// Move An Element In [how_many] Pixel In Y .
function moveY(obj1, how_many) {
    let num = parseInt(obj1.style.top);
    if (num) {
        obj1.style.top = (num + how_many) + "px";
    }
    else {
        obj1.style.top = (how_many) + "px";
    }
}

// Remove An Object .
function remove(obj1) {
    obj1.remove();
}

// A Class To Have Easy Access To Everything .
function gameObject(id) {
    this.id = id;
    this.object = $(id);
    this.type = "gameObject";
    if (!this.object) {
        throw ReferenceError("Value With " + id + " ID Not Found !");
    }
    this.init = function () {
        return init(this.object);
    };
    this.moveInit = function () {
        return moveInit(this.object);
    };
    this.moveX = function (how_many) {
        return moveX(this.object, how_many);
    };
    this.moveY = function (how_many) {
        return moveY(this.object, how_many);
    };
    this.collisionTo = function (obj2) {
        return collision(this.object, obj2);
    };
    this.getLocation = function () {
        return getLocation(this);
    };
    this.setImg = function (src) {
        return setImg(this.object, src);
    };
    this.remove = function () {
        return remove(this.object);
    };
    this.init();
}

// Get Location Of An Object
function getLocation(obj1) {
    try {
        if (obj1.type == "gameObject") {
            var a = parseInt(obj1.object.style.left);
            var b = parseInt(obj1.object.style.top);
        }
        return { "x": a, "y": b };
    }
    catch{
        var a = parseInt(obj1.style.left);
        var b = parseInt(obj1.style.top);
        return { "x": a, "y": b };
    }
}

// Log Your Text !
function print(text) {
    console.log(text);
}

// Show A Notification Contains text .
function showNotification(text) {
    // It Will Be Completed !
}

// Add An Audio Player Event To An Objecct In Document.
function audioPlayer(id) {
    this.funcs = {};
    this.object = $(id);
    this.addPlayer = function (event, func) {
        return this.object.addEventListener(event,func);
    }
}

// Play An Audio With source src .
function playAudio(source) {
    let audio = new Audio(source);
    audio.play();
}

// A Function To Manage Keypressed Events .
function ctrl(e){
    for(i in keys){
        if(e.key == i){
            keys[i]();
            break;
        }
    }
}

// Reserve Keys And Function That Should Have Events .
var keys = {};

// A Class To Control The Key Pressed Better That Past .
function keyController(){
    this.addKey = function(key,func){
        keys[key] = func;
        return "Succussfully Added !";
    }
    this.control = function(){
        sendEvent("keydown",ctrl);
        return "Controlling ...";
    }
}

// Create A Menu In A Div Easily .
function menuCreator(id){
    this.id = id;
    this.object = $(id);
    this.addOption = function(name,func){
        let obj = document.createElement('p');
        obj.innerHTML = name;
        obj.setAttribute("name","menu");
        obj.onclick = func;
        obj.style.width = "fit-content";
        document.getElementById(id).appendChild(obj);
    }
    this.removeOption = function(name){
        let objs = _('menu');
        for(i in objs){
            if(objs[i].innerHTML == name){
                objs[i].remove();
                break;
            }
        }
    }
    this.addEvent = function(event,name,func){
        let objs = _('menu');
        for(i in objs){
            if(objs[i].innerHTML == name){
                objs[i].addEventListener(event,func);
            }
        }
    }

}