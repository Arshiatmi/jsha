// Variables
var fps=60;
jshaObject.allInstances = [];
boardObject.allInstances = [];
gameObject.allInstances = [];
number.allInstances = [];
keyController.allInstances = [];
pageController.allInstances = [];
audioPlayer.allInstances = [];

// Set Update Function For A Function That Runs In Every Frame.
function setUpdate(func,targetFPS){
    let jsonResponse = {};
    fps = (typeof(targetFPS) == "undefined") ? fps : targetFPS;
    jsonResponse["jshaObjects"] = jshaObject.allInstances;
    jsonResponse["boardObjects"] = boardObject.allInstances;
    jsonResponse["gameObjects"] = gameObject.allInstances;
    jsonResponse["numbers"] = number.allInstances;
    jsonResponse["keyControllers"] = keyController.allInstances;
    jsonResponse["pageControllers"] = pageController.allInstances;
    jsonResponse["audioPlayers"] = audioPlayer.allInstances;
    jsonResponse["fps"] = fps;
    setInterval(function(){func(jsonResponse)},1000/fps);
}

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
    let maxPlayer = minPlayer + parseInt(myobj.width);
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
    number.allInstances.push(this);
    this.number = first_value;

    this.increase = function (how_many = 1) {
        this.number += how_many;
    };
    this.decrease = function (how_many = 1) {
        this.number -= how_many;
    };
    this.set = function(target){
        this.number = target;
    };
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

// Javascript Sleep Function !
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Move An Element In [how_many] Pixel In X .
async function moveX(obj1, how_many, animation) {
    if(typeof(animation) == "undefined"){
        let num = parseInt(obj1.style.left);
        if (num) {
            obj1.style.left = (num + how_many) + "px";
        }
        else {
            obj1.style.left = (how_many) + "px";
        }
    }
    else{
        let num = parseInt(obj1.style.left);
        if (num) {
            // obj1.style.left = (num + how_many) + "px";
            let counter = 1;
            if(how_many > 0){
                for(let i = num ; i < (num + how_many) ; i++){
                    await sleep(counter);
                    obj1.style.left = i + "px";
                    counter += 12/(how_many);
                }
            }
            else{
                for(let i = num ; i > (num + how_many) ; i--){
                    await sleep(counter);
                    obj1.style.left = i + "px";
                    counter += 12/(Math.abs(how_many));
                }
            }
        }
        else {
            let counter = 1;
            if(how_many > 0){
                for(let i = 0 ; i < (how_many) ; i++){
                    await sleep(counter);
                    obj1.style.left = i + "px";
                    counter += 12/(how_many);
                }
            }
            else{
                for(let i = 0 ; i > (how_many) ; i--){
                    await sleep(counter);
                    obj1.style.left = i + "px";
                    counter += 12/(Math.abs(how_many));
                }
            }
        }
        
    }
}

// Set X Of Element In [how_many] Pixel In X .
function setX(obj1, how_many) {
    obj1.style.left = how_many + "px";
}

// Move An Element In [how_many] Pixels .
async function moveY(obj1, how_many, animation) {
    if(typeof(animation) == "undefined"){
        let num = parseInt(obj1.style.top);
        if (num) {
            obj1.style.top = (num - how_many) + "px";
        }
        else {
            obj1.style.top = (-how_many) + "px";
        }
    }
    else{
        let num = parseInt(obj1.style.top);
        if (num) {
            // obj1.style.left = (num + how_many) + "px";
            let counter = 1;
            if(how_many > 0){
                for(let i = num ; i > (num - how_many) ; i--){
                    await sleep(counter);
                    obj1.style.top = i + "px";
                    counter += 120/Math.abs(how_many);
                }
            }
            else{
                for(let i = num ; i < (num - how_many) ; i++){
                    await sleep(counter);
                    obj1.style.top = i + "px";
                    counter += 120/(Math.abs(how_many));
                }
            }
        }
        else {
            let counter = 1;
            if(how_many > 0){
                for(let i = 0 ; i < (-how_many) ; i++){
                    await sleep(counter);
                    obj1.style.top = i + "px";
                    counter += 120/Math.abs(how_many);
                }
            }
            else{
                for(let i = 0 ; i > (-how_many) ; i--){
                    await sleep(counter);
                    obj1.style.top = i + "px";
                    counter += 120/(Math.abs(how_many));
                }
            }
        }
    }
}

// Set Y Of Element In [how_many] Pixels .
function setY(obj1, how_many) {
    obj1.style.top = (window.innerHeight - how_many) + "px";
}

// Set X,Y Of Element In [how_many] Pixels .
function setL(obj1, x, y) {
    if (obj1.style.height) {
        obj1.style.top = (window.innerHeight - y - parseInt(obj1.style.height)) + "px";
        obj1.style.left = x + "px";
    }
    else {
        obj1.style.top = (window.innerHeight - y) + "px";
        obj1.style.left = x + "px";
    }
}

// Remove An Object .
function remove(obj1) {
    obj1.remove();
}

// Remove An Object .
function destroy(obj1) {
    obj1.remove();
}

// Get Direction Of Two Objects .
function getDirection(obj1, obj2) {
    if (obj1.type == "gameObject") {
        if (obj2.type == "gameObject") {
            let x = obj2.getLocation().x - obj1.getLocation().x;
            let y = obj2.getLocation().y - obj1.getLocation().y;
            return { "x": x, "y": y };
        }
        else {
            let x = getLocation(obj2).x - obj1.getLocation().x;
            let y = getLocation(obj2).y - obj1.getLocation().y;
            return { "x": x, "y": y };
        }
    }
    else {
        if (obj2.type == "gameObject") {
            let x = obj2.getLocation().x - getLocation(obj1).x;
            let y = obj2.getLocation().y - getLocation(obj1).y;
            return { "x": x, "y": y };
        }
        else {
            let x = getLocation(obj2).x - getLocation(obj1).x;
            let y = getLocation(obj2).y - getLocation(obj1).y;
            return { "x": x, "y": y };
        }
    }
}

// Set An Object ( gameObject OR boardObject )
function setInMiddle(object){
    object.setX(window.innerWidth / 2 - (object.object.offsetWidth / 2));
    object.setY(window.innerHeight / 2 + (object.object.offsetHeight / 2));
}

// Get Middle Of Page. If You Pass An Object, It Will Give You Center 
// Depends On Object Width And Height.
// Object Must Be gamObject, boardObject Or A Simple HTML Object.
// If mode is "object" It Will Return Center Of Object.
// If mode is "page" It Will Return Center Of Page Depends On Object.
function getMiddle(object,mode){
    mode = (typeof(mode) == "undefined") ? "page" : mode;
    if(typeof(object) == "undefined"){
        return {"x":window.innerWidth / 2,"y":window.innerHeight / 2};
    }
    else{
        if(mode == "page"){
            if(object.type == "gameObject" || object.type == "boardObject"){
                return {"x":window.innerWidth / 2 - (object.object.offsetWidth / 2),"y":window.innerHeight / 2 - (object.object.offsetHeight / 2)};
            }
            else{
                return {"x":window.innerWidth / 2 - (object.offsetWidth / 2),"y":window.innerHeight / 2 - (object.offsetHeight / 2)};
            }
        }
        else if(mode == "object"){
            if(object.type == "gameObject" || object.type == "boardObject"){
                return {"x":object.getLocation().x + (object.object.offsetWidth / 2),"y":object.getLocation().y + (object.object.offsetHeight / 2)};
            }
            else{
                return {"x":getLocation(object).x + (object.offsetWidth / 2),"y":getLocation(object).y + (object.offsetHeight / 2)};
            }
        }
    }
}

// Get String Direction Of Two Objects .
function getDirectionS(obj1, obj2) {
    let dirs = getDirection(obj1, obj2);
    if (dirs.x > 0) {
        if (dirs.y > 0) {
            return "UR";
        }
        else if (dirs.y == 0) {
            return "R";
        }
        else {
            return "DR";
        }
    }
    else if (dirs.x == 0) {
        if (dirs.y > 0) {
            return "U";
        }
        else if (dirs.y == 0) {
            return "";
        }
        else {
            return "D";
        }
    }
    else {
        if (dirs.y > 0) {
            return "UL";
        }
        else if (dirs.y == 0) {
            return "L";
        }
        else {
            return "DL";
        }
    }
}

// Get Geographical Direction Of Two Objects .
function getDirectionG(obj1, obj2) {
    let dirs = getDirection(obj1, obj2);
    if (dirs.x > 0) {
        if (dirs.y > 0) {
            return "NE";
        }
        else if (dirs.y == 0) {
            return "E";
        }
        else {
            return "SE";
        }
    }
    else if (dirs.x == 0) {
        if (dirs.y > 0) {
            return "N";
        }
        else if (dirs.y == 0) {
            return "";
        }
        else {
            return "S";
        }
    }
    else {
        if (dirs.y > 0) {
            return "NW";
        }
        else if (dirs.y == 0) {
            return "W";
        }
        else {
            return "SW";
        }
    }
}

// Add A Text To A cell Of Board
function addText(board,cell,text,css_class,center){
    if(typeof(cell) == "number"){
        cell = "cell_" + cell;
    }
    center = (typeof(center) == "undefined") ? true : center;
    let obj = document.createElement("jshaText");
    let textNode = document.createTextNode(text);
    obj.appendChild(textNode);
    if(typeof(cell) == "string"){
        obj.id = cell + "_text";
    }
    else{
        obj.id = cell.id + "_text";
    }
    if(typeof (css_class) == "object"){
        for(let i = 0 ; i < css_class.length ; i++){
            obj.classList.add(css_class[i]);
        }
    }
    else{
        obj.classList.add(css_class);
    }
    if(center){
        var center_object = document.createElement("center");
        center_object.appendChild(obj);
        if(typeof(cell) == "object"){
            cell.appendChild(center_object);
        }
        else{
            $(cell).appendChild(center_object);
        }
    }
    else{
        if(typeof(cell) == "object"){
            cell.appendChild(obj);
        }
        else{
            $(cell).appendChild(obj);
        }
    }
}

// Get Text Of A Cell In A Board
function getText(board,cell){
    if(typeof(cell) == "number"){
        cell = "cell_" + cell;
    }
    let target_id = "";
    if(typeof(cell) == "string"){
        target_id = cell + "_text";
    }
    else{
        if(!cell.id){
            cell = cell.firstChild;
            target_id = cell.id;
        }
        else{
            target_id = cell.id + "_text";
        }
    }
    if ($(target_id) == null){
        return "";
    }
    else{
        return $(target_id).innerHTML;
    }
}

// Set Text Of A Cell In A Board
function setText(board,cell,text,css_class){
    if(typeof(cell) == "number"){
        cell = "cell_" + cell;
    }
    if(typeof(cell) == "object"){
        if(board.banIndex(cell) !== -1){
            throw 'valueError : This Cell Is Read Only. You Cant Change It.';
        }
    }
    else{
        if(board.banIndex($(cell)) !== -1){
            throw 'valueError : This Cell Is Read Only. You Cant Change It.';
        }
    }
    if(typeof(cell) == "object"){
        if(cell.firstChild == null){
            addText(board,cell,text,css_class,true);
            return;
        }
        if(cell.firstChild.nodeName == "CENTER"){
            cell.firstChild.firstChild.innerHTML = text;
        }
        else{
            cell.firstChild.innerHTML = text;
        }
        if(typeof (css_class) == "object"){
            for(let i = 0 ; i < css_class.length ; i++){
                cell.classList.add(css_class[i]);
            }
        }
        else{
            cell.classList.add(css_class);
        }
    }
    else{
        if($(cell).firstChild == null){
            addText(board,cell,text,css_class,true);
            return;
        }
        if($(cell).firstChild.nodeName == "CENTER"){
            $(cell).firstChild.firstChild.innerHTML = text;
        }
        else{
            $(cell).firstChild.innerHTML = text;
        }
        if(typeof (css_class) == "object"){
            for(let i = 0 ; i < css_class.length ; i++){
                $(cell).classList.add(css_class[i]);
            }
        }
        else{
            $(cell).classList.add(css_class);
        }
    }
}

// A Class To Have Easy Access To Everything .
function gameObject(id) {
    this.id = id;
    this.object = $(id);
    this.type = "gameObject";
    gameObject.allInstances.push(this);
    this.src = this.object.src;
    if (!this.object) {
        throw ReferenceError("Value With " + id + " ID Not Found !");
    }
    this.init = function () {
        return init(this.object);
    };
    this.moveInit = function () {
        return moveInit(this.object);
    };
    this.moveX = function (how_many, animation) {
        return moveX(this.object, how_many,animation);
    };
    this.moveY = function (how_many, animation) {
        return moveY(this.object, how_many, animation);
    };
    this.collisionTo = function (obj2) {
        return collision(this.object, obj2);
    };
    this.getLocation = function () {
        return getLocation(this);
    };
    this.setImg = function (src) {
        this.src = src;
        return setImg(this.object, src);
    };
    this.remove = function () {
        gameObject.allInstances.splice(gameObject.allInstances.indexOf(this),1);
        return remove(this.object);
    };
    this.x = function () {
        return this.getLocation().x;
    };
    this.y = function () {
        return this.getLocation().y;
    };
    this.setX = function (x) {
        return setX(this.object, x);
    };
    this.setY = function (y) {
        return setY(this.object, y);
    };
    this.setL = function (x, y) {
        return setL(this.object, x, y);
    }
    this.getDirection = function (obj2) {
        return getDirection(this, obj2);
    };
    this.getDirectionS = function (obj2) {
        return getDirectionS(this, obj2);
    };
    this.getDirectionG = function (obj2) {
        return getDirectionG(this, obj2);
    };
    this.init();
}

// Set A Cell Of Board Uneditable.
function canEdit(board,cell,can){
    if(typeof(cell) == "number"){
        cell = "cell_" + cell;
    }
    if(typeof(cell) == "object"){
        if(!can){
            board.banCell(cell);
        }
        else{
            board.openCell(cell);
        }
    }
    else{
        if(!can){
            board.banCell($(cell));
        }
        else{
            board.openCell($(cell));
        }
    }
}

// Clears The Board If It Has Any Text.
function clearBoard(board){
    for(let i = 1 ; i <= board.vertical * board.horizontal ; i++){
        try{
            ($("cell_" + i + "_text")).parentElement.remove();
        }
        catch{}
        board.banned = [];
    }
}

// Collision Checker
function collisionCheck(mainobject,name,func){
    let objs = _(name);
    mainobject = $(mainobject);
    if(mainobject && objs){
        for(let i = 0 ; i < objs.length ; i++){
            if(collision(mainobject,objs[i])){
                func(mainobject,objs[i]);
            }
        }
    }
}

// Pouring An Object In Specific X In how_many Count .
function pourX(obj,how_many,y){
    xc = window.innerWidth / (how_many);
    let all_jsha_objects = [];
    for(let i = 1 ; i < how_many ; i++){
        let newobj = new jshaObject(obj.type,obj.name);
        if(obj.getAttribute("style")){
            newobj.setCSS(obj.getAttribute("style"));
        }
        newobj.setCSSAttribute("position","absolute");
        newobj.setCSSAttribute("top",y + "px");
        newobj.setCSSAttribute("left",(xc - obj.object.width) * i + "px");
        newobj.innerHTML = obj.innerHTML;
        newobj.oncollision = obj.oncollision;
        newobj.object.className = obj.object.className;
        for(let j = 0 ; j < obj.attributes.length ; j++){
            newobj.setAttribute(obj.attributes[j],obj.getAttribute(obj.attributes[j]));
        }
        newobj.setAttribute("id",obj.getAttribute("id") + i);
        document.getElementsByTagName("body")[0].appendChild(newobj.create());
        newobj.oncollision(obj.colArgs.name,obj.colArgs.func);
        all_jsha_objects.push(newobj);
    }
    return all_jsha_objects;
}

// Just A Helper For setTreshold Function.
function tresholdHelper(name,func,x,y){
    let objs = _(name);
    for(let i = 0 ; i < objs.length ; i++){
        if(getLocation(objs[i]).x < x[0] || getLocation(objs[i]).x > x[1]){
            func(objs[i]);
            return "X Treshold !";
        }
        else if(getLocation(objs[i]).y < y[0] || getLocation(objs[i]).y > y[1]){
            func(objs[i]);
            return "Y Treshold !";
        }
    }
}

function restart(){
    location.reload(true);
}

// Make Treshold For A Type Of Object. If Its Pass From Treshold It Will Remove
// That Objects.
function setTreshold(object_name,func,x,y){
    func = (typeof(func) == "undefined") ? remove : func;
    if(typeof(x) == "undefined"){
        x = [0,window.innerWidth];
    }
    if(typeof(y) == "undefined"){
        y = [0,window.innerHeight];
    }
    return setInterval(function(){tresholdHelper(object_name,func,x,y)},1000/fps);
}

//  That Is jsha Object. Some Thing Are Not Possible In gameObject, But You
// Have Them Here !
function jshaObject(type,name){
    this.name = name;
    this.type = "jshaObject";
    this.tp = type;
    this.object = document.createElement(this.type);
    this.object.name = this.name;
    this.colArgs = {"name":"","func":""};
    jshaObject.allInstances.push(this);
    this.animation = function(interval,func){
        let mode = 1;
        if (func == "move"){
            setInterval(function(){
                let objs = _(this.name);
                for(let i = 0 ; i < objs ; i++){
                    moveX(objs[i],mode * 100);
                    mode = (mode == 1) ? -1 : 1;
                }
            },interval);
        }
        else if(typeof (func) == "function"){
            setInterval(func,interval);
        }
    }
    this.moveInit = function () {
        this.setCSSAttribute("position","absolute");
    };
    this.appendTo = function(where,mode,index){
        if(typeof(mode) == "string"){
            index = (typeof(index) == "undefined") ? 0 : index;
            if(mode == "tag"){
                document.getElementsByTagName(where)[index].appendChild(this.object);
            }
            else if(mode == "id"){
                $(where).appendChild(this.object);
            }
            else if(mode == "name"){
                _(where)[index].appendChild(this.object);
            }
            else if(mode == "class"){
                document.getElementsByClassName(where)[index].appendChild(this.object);
            }
        }
        else{
            document.getElementsByTagName(where)[0].appendChild(this.object);
        }
    };
    this.setCSSAttribute = function(key,value){
        let temp_text = this.getCSSAttribute(key);
        if(temp_text)
            this.removeCSSAttribute(key);
        this.object.style[key] = value;
    };
    this.removeCSSAttribute = function(key){
        this.object.style[key] = "";
    };
    this.getLocation = function () {
        return getLocation(this);
    };
    this.x = function () {
        return this.getLocation().x;
    };
    this.y = function () {
        return this.getLocation().y;
    };
    this.setCSS = function(str){
        let string = this.object.getAttribute("style");
        if(string){
            this.object.setAttribute("style",string + ";" + str);
        }
        else{
            this.object.setAttribute("style",str);
        }
    };
    this.addClass = function(className){
        this.object.classList.add(className);
    };
    this.setAttribute = function(key, value){
        this.object.setAttribute(key,value);
    };
    this.getAttribute = function(key){
        return this.object.getAttribute(key);
    };
    this.getCSSAttribute = function(key){
        return this.object.style[key];
    };
    this.setClass = function(className){
        this.object.className = className;
    };
    this.setEvery = function(){
        this.object.innerHTML = this.innerHTML;
    };
    this.create = function(){
        this.object.innerHTML = this.innerHTML;
        return this.object;
    };
    this.remove = function(){
        if(this.object){
            jshaObject.allInstances.splice(jshaObject.allInstances.indexOf(this),1);
            destroy(this.object);
        }
        else{
            print("Object Not Found !");
        }
    };
    this.oncollision = function(name,func){
        this.colArgs.name = name;
        this.colArgs.func = func;
        let mainobject = this.object.id;
        setInterval(function(){collisionCheck(mainobject,name,func)},1);
    };
    this.moveInit();
}

// Thats boardObject Uses For All Kind Of Boards.
//   id             ->   id Of Board
//   vertical       ->   How Many Rows
//   Horizontal     ->   How Many Columns
//   cell_width     ->   How Many (Pixels,...) Each Cell Should Have ( Width ) ?
//   cell_height    ->   How Many (Pixels,...) Each Cell Should Have ( Height ) ?
//   line_color     ->   What Is The Color Of Board / Table ?
//   func           ->   The Function That Get Event Of Click On Board.
function boardObject(id,vertical,horizontal,cell_width,cell_height,line_color,func) {
    this.id = id;
    this.object = $(id);
    this.type = "boardObject";
    if (!this.object) {
        throw ReferenceError("Value With " + id + " ID Not Found !");
    }
    this.banned = [];
    this.vertical = vertical;
    this.horizontal = horizontal;
    this.texts = [];
    this.htmls = [];
    boardObject.allInstances.push(this);
    for(let i = 0 ; i < horizontal * vertical ; i++){
        this.texts[i] = "";
        this.htmls[i] = "";
    }
    image = (typeof image === 'undefined') ? '' : image;
    this.object.style.display = "grid";
    cell_width = (typeof cell_width === 'undefined') ? "100px" : cell_width;
    cell_height = (typeof cell_height === 'undefined') ? "100px" : cell_height;
    line_color = (typeof line_color === 'undefined') ? "#333333" : line_color;
    this.object.style.gridTemplate = "repeat(" + horizontal + "," + cell_width + ") / repeat(" + vertical + "," + cell_width + ")";
    let counter = 1;
    for(let i = 0 ; i < horizontal ; i++){
        for(let j = 0; j < vertical ; j++){
            obj = document.createElement("div");
            obj.id = "cell_" + counter;
            obj.name = "cell";
            obj.style.boxShadow="0 0 0 1px " + line_color;
            obj.style.border="1px solid " + line_color;
            obj.style.cursor="pointer";
            obj.style.lineHeight="100px";
            $(id).appendChild(obj);
            sendEvent("click",func);
            document.getElementById("cell_" + counter).style.width = cell_width;
            document.getElementById("cell_" + counter).style.height = cell_height;
            counter += 1;
        }
    };
    this.banCell = function(cell){
        if(typeof(cell) == "object"){
            if(cell.nodeName == "CENTER")
                cell = cell.firstChild;
            if(this.banned.indexOf(cell.id) === -1)
                this.banned.push(cell.id);
            if(!cell.id.endsWith("_text"))
                this.banned.push(cell.id + "_text");
        }
    };
    this.openCell = function(cell){
        if(typeof(cell) == "object")
            if(cell.nodeName == "CENTER")
                cell = cell.firstChild;
        this.banned.splice(this.banned.indexOf(cell.id),1);
        if(!cell.id.endsWith("_text"))
            this.banned.splice(this.banned.indexOf(cell.id + "_text"),1);
        else
            this.banned.splice(this.banned.indexOf(cell.id.substr(0,cell.id.length - 5)),1);
    };
    this.banIndex = function(cell){
        if(typeof(cell) == "object")
            if(cell.nodeName == "CENTER")
                cell = cell.firstChild;
        return this.banned.indexOf(cell.id);
    };
    this.releaseBans = function(){
        this.banned = [];
    };
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
        boardObject.allInstances.splice(boardObject.allInstances.indexOf(this),1);
        return remove(this.object);
    };
    this.x = function () {
        return this.getLocation().x;
    };
    this.y = function () {
        return this.getLocation().y;
    };
    this.setX = function (x) {
        return setX(this.object, x);
    };
    this.setY = function (y) {
        return setY(this.object, y);
    };
    this.setL = function (x, y) {
        return setL(this.object, x, y);
    }
    this.getDirection = function (obj2) {
        return getDirection(this, obj2);
    };
    this.getDirectionS = function (obj2) {
        return getDirectionS(this, obj2);
    };
    this.getDirectionG = function (obj2) {
        return getDirectionG(this, obj2);
    };
    this.updateData = function(){
        for(let i = 0 ; i < this.horizontal * this.vertical ; i++){
            this.texts[i] = this.getText(i + 1);
            this.htmls[i] = $("cell_" + (i+1));
        }
    };
    this.addText = function (cell_number,text,css_class,center) {
        addText(this,cell_number,text,css_class,center);
        this.updateData();
        return;
    };
    this.setText = function (cell_number,text,css_class) {
        setText(this,cell_number,text,css_class);
        this.updateData();
        return;
    };
    this.getText = function (cell_number) {
        return getText(this,cell_number);
    };
    this.canEdit = function(cell_number,can){
        return canEdit(this,cell_number,can);
    };
    this.clear = function(){
        return clearBoard(this);
    };
    this.clearBoard = function(){
        return clearBoard(this);
    };
    this.makeStatusObject = function(){
        return {"banned":this.banned,"width":vertical,"height":horizontal,"texts":this.texts,"htmls":this.htmls};
    }
    this.getStatus = function(func){
        if(typeof(func) == "undefined")
            return this.makeStatusObject();
        return func(this.makeStatusObject());
    };
    this.finishCondition = function(func){
        this.updateData();
        if(typeof(func) == "object" || typeof(func) == "function"){
            return func(this.makeStatusObject());
        }
        else if(typeof(func) == "string"){
            if(func == "xo"){
                return checkXO(this);
            }
        }
    };
    this.setCellCSS = function(cell_number,str){
        $("cell_" + cell_number).style = str;
    }
    this.init();
}

// Thats A Helper If You Want To Make A XO Game, Thats Just A Checker For Who Won The Game.
function checkXO(board){
    let texts = board.getStatus()["texts"];
    if(texts[0] == texts[1] && texts[1] == texts[2] && (texts[0].toUpperCase() == "X" || texts[0].toUpperCase() == "O")){
        return texts[0];
    }
    if(texts[3] == texts[4] && texts[4] == texts[5] && (texts[3].toUpperCase() == "X" || texts[3].toUpperCase() == "O")){
        return texts[3];
    }
    if(texts[6] == texts[7] && texts[7] == texts[8] && (texts[6].toUpperCase() == "X" || texts[6].toUpperCase() == "O")){
        return texts[6];
    }
    if(texts[0] == texts[3] && texts[3] == texts[6] && (texts[0].toUpperCase() == "X" || texts[0].toUpperCase() == "O")){
        return texts[0];
    }
    if(texts[1] == texts[4] && texts[4] == texts[7] && (texts[1].toUpperCase() == "X" || texts[1].toUpperCase() == "O")){
        return texts[1];
    }
    if(texts[2] == texts[5] && texts[5] == texts[8] && (texts[2].toUpperCase() == "X" || texts[2].toUpperCase() == "O")){
        return texts[2];
    }
    if(texts[0] == texts[4] && texts[4] == texts[8] && (texts[0].toUpperCase() == "X" || texts[0].toUpperCase() == "O")){
        return texts[0];
    }
    if(texts[2] == texts[4] && texts[4] == texts[6] && (texts[2].toUpperCase() == "X" || texts[2].toUpperCase() == "O")){
        return texts[2];
    }
    return;
}

// Get Location Of An Object
function getLocation(obj1) {
    try {
        if (obj1.type == "gameObject") {
            var a = parseInt(obj1.object.style.left);
            var b = parseInt(obj1.object.style.top);
        }
        else if(obj1.type == "jshaObject" && obj1.object){
            var a = parseInt(obj1.object.style.left);
            var b = parseInt(obj1.object.style.top);
        }
        else {
            throw "Nothing !";
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
    audioPlayer.allInstances.push(this);
    this.addPlayer = function (event, func) {
        return this.object.addEventListener(event, func);
    }
}

// It Will Make A gameObject Go To Left With Specific Speed.
function left(object,speed){
    if(typeof(speed) == "object"){
        object.moveX(-speed.number * 10);
    }
    else{
        object.moveX(-speed * 10);
    }
}

// It Will Make A gameObject Go To Right With Specific Speed.
function right(object,speed){
    if(typeof(speed) == "object"){
        object.moveX(speed.number * 10);
    }
    else{
        object.moveX(speed * 10);
    }
}

// It Will Make A gameObject Go UP With Specific Speed.
function up(object,speed){
    if(typeof(speed) == "object"){
        object.moveY(speed.number * 10);
    }
    else{
        object.moveY(speed * 10);
    }
}

// It Will Make A gameObject Go DOWN With Specific Speed.
function down(object,speed){
    if(typeof(speed) == "object"){
        object.moveY(-speed.number * 10);
    }
    else{
        object.moveY(-speed * 10);
    }
}

// Play An Audio With source src .
function playAudio(source) {
    let audio = new Audio(source);
    audio.play();
}

// A Function To Manage Keypressed Events .
function ctrl(e) {
    for (i in keys) {
        if (e.key == i) {
            keys[i]();
            break;
        }
    }
}

// A Helper For Setting An Object X To Mouse X .
function set_object_x_mouse(event,object){
    if(typeof(object) == "object" && (object.type == "gameObject" || object.type == "boardObject"))
        if(event.isTrusted)
            object.setX(event.clientX - (object.object.offsetWidth / 2));
    else
        if(event.isTrusted){
            moveInit(object);
            setX(object,event.clientX - (object.object.offsetWidth / 2));
        }
}

// A Helper For Setting An Object Y To Mouse Y .
function set_object_y_mouse(event,object){
    if(typeof(object) == "object" && (object.type == "gameObject" || object.type == "boardObject"))
        if(event.isTrusted)
            object.setY(event.clientY - (object.object.offsetHeight / 2));
    else
        if(event.isTrusted){
            moveInit(object);
            setY(object,event.clientY - (object.object.offsetHeight / 2));
        }
}

// A Helper For Setting An Object X And Y To Mouse X And Y .
function set_object_b_mouse(event,object){
    if(typeof(object) == "object" && (object.type == "gameObject" || object.type == "boardObject"))
        if(event.isTrusted){
            object.setX(event.clientX - (object.object.offsetWidth / 2));
            object.setY(event.clientY - (object.object.offsetHeight / 2));
        }    
    else
        if(event.isTrusted){
            moveInit(object);
            setY(object,event.clientY - (object.object.offsetHeight / 2));
            setX(object,event.clientX - (object.object.offsetWidth / 2));
        }
}

// Reserve Keys And Function That Should Have Events .
var keys = {};

// A Class To Control The Key Pressed Better That Past .
function keyController() {
    keyController.allInstances.push(this);
    this.initMovement = function(obj,speed,key){
        // Order In key Array => left button,right button,down button,up button
        if(typeof(key) == "undefined"){
            keys["a"] = function(){left(obj,speed)};
            keys["d"] = function(){right(obj,speed)};
            keys["s"] = function(){down(obj,speed)};
            keys["w"] = function(){up(obj,speed)};
            return "Movements Initialized. {'left':'a','right':'d','down':'s','up':'w'}";
        }
        else{
            if(typeof(speed) != "undefined" && typeof(obj) != "undefined"){
                if(key.length != 4){
                    throw "valueError : key Array length Must Be 4 ( left, right, down, up ) ."
                }
                if(key.constructor == Object){
                    if(keys[key["left"]])
                        keys[key["left"]] = function(){left(obj,speed)};
                    if(keys[key["right"]])
                        keys[key["right"]] = function(){right(obj,speed)};
                    if(keys[key["down"]])
                        keys[key["down"]] = function(){down(obj,speed)};
                    if(keys[key["up"]])
                        keys[key["up"]] = function(){up(obj,speed)};
                }
                else{
                    if(key[0])
                        keys[key[0]] = function(){left(obj,speed)};
                    if(key[1])
                        keys[key[1]] = function(){right(obj,speed)};
                    if(key[2])
                        keys[key[2]] = function(){down(obj,speed)};
                    if(key[3])
                        keys[key[3]] = function(){up(obj,speed)};
                }
                return "Movements Initialized.";
            }
            else{
                throw "valueError : object And speed Are Required."
            }
        }
    };
    this.addKey = function (key, func) {
        keys[key] = func;
        return "Succussfully Added !";
    };
    this.mouseMove = function(object,mode){
        if(mode.toUpperCase() == "X"){
            sendEvent("mousemove",function(event){set_object_x_mouse(event,object)});
            return "Sending Event...";
        }
        else if(mode.toUpperCase() == "Y"){
            sendEvent("mousemove",function(event){set_object_y_mouse(event,object)});
            return "Sending Event...";
        }
        else if(mode.toUpperCase() == "B"){
            sendEvent("mousemove",function(event){set_object_b_mouse(event,object)});
            return "Sending Event...";
        }
        else{
            throw "valueError: mode Should Be 'X' Or 'Y'.";
        }
    };
    this.addKeys = function (jsonObject) {
        for(let key in jsonObject){
            keys[key] = jsonObject[key];
        }
        return "Succussfully Added !";
    };
    this.control = function () {
        sendEvent("keydown", ctrl);
        return "Controlling ...";
    };
}

// Create A Menu In A Div Easily .
function menuCreator(id) {
    this.id = id;
    this.object = $(id);
    this.addOption = function (name, func) {
        let obj = document.createElement('p');
        obj.innerHTML = name;
        obj.setAttribute("name", "menu");
        obj.onclick = func;
        obj.style.width = "fit-content";
        document.getElementById(id).appendChild(obj);
    }
    this.removeOption = function (name) {
        let objs = _('menu');
        for (i in objs) {
            if (objs[i].innerHTML == name) {
                objs[i].remove();
                break;
            }
        }
    }
    this.addEvent = function (event, name, func) {
        let objs = _('menu');
        for (i in objs) {
            if (objs[i].innerHTML == name) {
                objs[i].addEventListener(event, func);
            }
        }
    }
    this.addEventAll = function (event, func) {
        let objs = _('menu');
        for (let i = 0; i < objs.length; i++) {
            objs[i].addEventListener(event, func);
        }
    }
    this.destroy = function () {
        this.object.remove();
    }
    this.setAttribute = function (elem_text, what, attribute) {
        let objs = _('menu');
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].innerHTML == elem_text) {
                objs[i].setAttribute(what, attribute);
            }
        }
    }
    this.setCSS = function(elem_text,cmd){
        let objs = _('menu');
        for (let i = 0; i < objs.length; i++) {
            if (objs[i].innerHTML == elem_text) {
                objs[i].setAttribute("style", cmd);
            }
        }
    }
    this.setL = function (x, y) {
        init(this.object);
        return setL(this.object, x, y);
    }
}

// Helps You To Manage Page Better
function pageController() {
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    pageController.allInstances.push(this);
    this.getMiddleWidth = function(){
        return this.pageWidth;
    }
    this.getMiddleHeight = function(){
        return this.pageHeight;
    }
    this.getOpacity = function(){
        return parseFloat(document.getElementsByTagName("body")[0].style.opacity) * 100;
    }
    this.changeOpacity = function (percent) {
        document.getElementsByTagName("body")[0].style.opacity = percent / 100;
    }
    this.changeElementOpacity = function (id, percent) {
        $(id).style.opacity = percent / 100;
    }
    this.changeElementsOpacity = function (name, percent) {
        let d = _(name);
        for (i in d) {
            d[i].style.opacity = percent / 100;
        }
    }
    this.backcolor = function (color) {
        document.getElementsByTagName("body")[0].style.backgroundColor = color;
    }
}

// Try To Play Next Animation In Sequense
function playAnimation(object,sequense){
    let ind = sequense.indexOf(object.src);
    ind = (ind == -1) ? 0 : ind;
    ind = (ind == sequense.length - 1) ? 0 : ind;
    object.setImg(sequense[ind+1]);
}

// Handle 2d Animations
function animation(object,sequense,delay,name){
    this.object = object;
    this.name = "animation";
    this.animationName = name;
    this.sequense = [];
    this.delay = delay;
    this.animationInterval = null;

    this.play = function(){
        this.animationInterval = setInterval(function(){playAnimation(object,sequense)},delay);
    }

    this.stop = function(){
        clearInterval(this.animationInterval);
        this.animationInterval = null;
    }
}