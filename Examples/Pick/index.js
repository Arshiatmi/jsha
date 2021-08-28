// Declare Initialization Variables.
var score = new number();
var current_obj = new number(-1);
var interval = "";
var score_object = new gameObject("score");
var last_score_type = new number(-1);

// Set Score To Middle Of Page ( X-axis )
score_object.setX(getMiddle(score_object).x);

// This Function Runs After Each Click
function clk(event){
    if(event.target.style.backgroundColor == "red"){
        // Increase Score If Player Clicked A Red Part.
        score.increase();
        // Reset Interval
        clearInterval(interval);
        interval = setInterval(change,1000 - score.number);
        // Save Last Score.
        last_score_type.set(+1);
        // Set New Red Part.
        change();
    }
    else{
        // Decrease Score Because Red Does Not Clicked.
        score.decrease();
        // Reset Interval
        clearInterval(interval);
        interval = setInterval(change,1000 - score.number);
        // Save Last Score
        last_score_type.set(-1);
        // Set New Red Part.
        change();
    }
}

// Make New BoardObject.
// Argumets :
//   id             ->   id Of Board ( "board" )
//   vertical       ->   How Many Rows ( 20 )
//   Horizontal     ->   How Many Columns ( 20 )
//   cell_width     ->   How Many (Pixels,...) Each Cell Should Have ( Width ) ? ( "30px" )
//   cell_height    ->   How Many (Pixels,...) Each Cell Should Have ( Height ) ? ( "30px" )
//   line_color     ->   What Is The Color Of Board / Table ? ( "white" )
//   func           ->   The Function That Get Event Of Click On Board. ( clk )
var board = new boardObject("board",20,20,"30px","30px","white",clk);

// Set Board At Middle Of Page.
setInMiddle(board);

// Change Background Of Cells
function change(){
    if(current_obj.number == -1) { // Checks If Start Of Game Or Not.
        current_obj.number = randInt(400); // Select A Random 
    }
    else {
        $("cell_" + current_obj.number).style.backgroundColor = "black"; // Change Color Of Cell That Was Red To Black
        current_obj.number = randInt(400); // Select New Random
    }
    $("cell_" + current_obj.number).style.backgroundColor = "red"; // Change Color From Black To Red.
}

function update(event){ // Update Function That Runs Every Frame
    // Update Score And Level.
    score_object.object.innerHTML = "Score : " + score.number;
    if(score.number % 10 == 0 && last_score_type.number == +1){
        level.increase();
    }
}

// Set Update Function That Runs 60 Times Per Second. If You Want To Change FPS Use : 
//    setUpdate(update,fps);
setUpdate(update);

// Make Game Interval
interval = setInterval(change,1000 - score.number);
