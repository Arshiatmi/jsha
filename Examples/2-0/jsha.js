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

// Set X Of Element In [how_many] Pixel In X .
function setX(obj1, how_many) {
    obj1.style.left = how_many + "px";
}

// Move An Element In [how_many] Pixels .
function moveY(obj1, how_many) {
    let num = parseInt(obj1.style.top);
    if (num) {
        obj1.style.top = (num - how_many) + "px";
    }
    else {
        obj1.style.top = (-how_many) + "px";
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

function clearBoard(board){
    for(let i = 1 ; i <= board.vertical * board.horizontal ; i++){
        try{
            ($("cell_" + i + "_text")).parentElement.remove();
        }
        catch{}
        board.banned = [];
    }
}

function boardObject(id,vertical,horizontal,cell_width,cell_height,line_color,func) {
    this.id = id;
    this.object = $(id);
    this.type = "boardObject";
    this.banned = [];
    this.vertical = vertical;
    this.horizontal = horizontal;
    this.texts = [];
    this.htmls = [];
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
    }
    if (!this.object) {
        throw ReferenceError("Value With " + id + " ID Not Found !");
    }
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
    this.clickCounter = function(event){
        this.click_cell[event.target.id] += 1;
        func(event);
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
        if(typeof(func) == "object"){
            return func(this.makeStatusObject());
        }
        else if(typeof(func) == "string"){
            if(func == "xo"){
                return checkXO(this);
            }
        }
    };
    this.init();
}

function checkXO(board){
    let texts = board.getStatus()["texts"];
    print(texts);
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
    this.addPlayer = function (event, func) {
        return this.object.addEventListener(event, func);
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

// Reserve Keys And Function That Should Have Events .
var keys = {};

// A Class To Control The Key Pressed Better That Past .
function keyController() {
    this.addKey = function (key, func) {
        keys[key] = func;
        return "Succussfully Added !";
    }
    this.control = function () {
        sendEvent("keydown", ctrl);
        return "Controlling ...";
    }
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