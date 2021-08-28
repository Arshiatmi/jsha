let player = new gameObject("player");
let enemy = new gameObject("enemy");
let controller = new keyController();

// Set Location Of X & Y.
player.setL(100,400);
enemy.setL(50,400);

// Make X & Y Of Mouse To enemy X & Y.
controller.mouseMove(enemy,"B");

// You Can Make Smooth Animation With This Model.
// Here, In Every Frame, Player Is Looking At enemy. And Because FPS Set To 60,
// Animation Is Smooth.
function update(jshaEvent){
    player.lookAt(enemy);
}

// Set An Update Function That Runs In Every Frame. ( FPS Is Second Argument )
setUpdate(update,60);

// With This Way, You Can Play An Smooth Animation To Look At enemy.
// animation Attribute In CSS is animationLook 1s. If You Want To Customize It,
// Use Next Way.
player.lookAt(enemy,true);

// You Can Make An Animator Object To Customize It.
var animatorObject = new animator('Look');
animatorObject.loop = 'infinite';
animatorObject.seconds = '2s';
animatorObject.other = 'attr1 attr2 ...';
player.lookAt(enemy,true,animatorObject);