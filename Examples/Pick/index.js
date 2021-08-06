var score = new number();
var current_obj = new number(-1);
var interval = "";
var score_object = new gameObject("score");
var last_score_type = new number(-1);

score_object.setX(getMiddle(score_object).x);

function clk(event){
    if(event.target.style.backgroundColor == "red"){
        score.increase();
        clearInterval(interval);
        interval = setInterval(change,1000 - score.number);
        last_score_type.set(+1);
        change();
    }
    else{
        score.decrease();
        clearInterval(interval);
        interval = setInterval(change,1000 - score.number);
        last_score_type.set(-1);
        change();
    }
}

var board = new boardObject("board",20,20,"30px","30px","white",clk);
setInMiddle(board);

function change(){
    if(current_obj.number == -1){
        current_obj.number = randInt(400);
    }
    else{
        $("cell_" + current_obj.number).style.backgroundColor = "black";
        current_obj.number = randInt(400);
    }
    $("cell_" + current_obj.number).style.backgroundColor = "red";
}

function update(event){
    score_object.object.innerHTML = "Score : " + score.number;
    if(score.number % 10 == 0 && last_score_type.number == +1){
        level.increase();
    }
}

setUpdate(update);
interval = setInterval(change,1000 - score.number);
