// The Sequense Of Images That Want To Change. You Are Free To Give Functions Too.
// If You Give Function, It Will Run That Function For That Level.
var seq = ["./Enemies/boss1.png",goright,goleft,"./Enemies/boss2.png","./Enemies/boss3.png","./Enemies/enemy1.jpg","./Enemies/enemy2.jpg","./Enemies/enemy3.jpg","./Enemies/enemy4.jpg","./Enemies/enemy5.jpg","./Enemies/enemy6.jpg","./Enemies/enemy7.jpg"];
var object = new gameObject("myobj");

// Make A New animation Object.
// Arguments : 
//     object          ->  The gameObject That You Want To Play Some Animation.
//     seq             ->  Sequense Of Images Or Functions For Play Animation.
//     intervalTime    ->  The Time In Miliseconds That Wait For Next Sequense.
//     name            ->  Name Of Animation.
var anim = new animation(object,seq,500,"enemy");

// Play The Animation.
anim.play();

// 2 Functions That Exists On Sequense.
function goleft(){
    object.moveX(-100);
}
function goright(){
    object.moveX(100);
}