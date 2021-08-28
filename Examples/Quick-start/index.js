// Declare Initialization Variables
let player = new gameObject("myobj");
let page = new pageController();
let controller = new keyController();
var speed = new number(10);
let mover = "";

let fire = new jshaObject('img','fires');
fire.setAttribute("src","test.jpg");
fire.addClass("fires");

// Make A New Raycast To Shoot A Fire
let f = new raycast(fire,player,speed);

// Set Mouse X To obj1 ( gameObject ) X.
controller.mouseMove(player,"X");
// Add Shoot Key ( Space )
controller.addKeys({" ":function(e){f.shoot();}})
// Start Controlling Keyboard And Mouse.
controller.control();

// Set X And Y Of obj1
player.setX(page.pageWidth / 2);
player.setY(page.pageHeight / 4);

// jshaObject Are Objects That Will Spawn Later.
// Arguments : 
//    type   ->  Type Of Object That Will Spawn Later.
//    name   ->  name Of Object.
let enemy = new jshaObject('img',"type1");

// Set HTML src Attribute
enemy.setAttribute("src","./Enemies/enemy1.png");

// Set Class Name
enemy.setClass("enemies");

// Specify A Function That Will Run After Collision To Specific Type Of Objects.
// For Example Here If "enemy" Have collision To Every Object That Have "fires" as 
// "name" HTML Attribute, function "remover" Will Run.
// Function Will Receive 2 Argument That Argument1 Is Current gameObject And
// Argument2 Is gameObject That Have Collision To This Object.
enemy.oncollision("fires",remover);

// pourX Will Spawn Enemy By Equal Distance In Page. For Example
// pourX(enemy,10,100) Will Spawn 10 Times Of enemy Object In y=100 (y is distance
// from top of screen)
pourX(enemy,10,200);
pourX(enemy,10,100);

// Function That Runs In Collision.
function remover(current,target){
    current.remove();
    target.remove();
}

// Make Treshold That If Each Fire Gets Out Of Screen, It Will Destroy.
// You Can Customize Function That It Will Do Something Else Like :
// setTreshold('fires',myfunc)
// You Can Customize Treshold Too. Like :
// setTreshold('fires',myfunc,[startX,endX],[startY,endY])
setTreshold('fires');