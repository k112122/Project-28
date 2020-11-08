
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var boyImg;
var ground, tree, stone;
var mango1, mango2, mango3, mango4;
var chain;

function preload()
{
	boyImg = loadImage("boy.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ground = new Ground(600,height,1200,20);
	tree = new Tree(600,50,400,400);
	stone = new Stone(58,620,30,30);

	mango1 = new Mango(530,400);
	mango2 = new Mango(450,460);
	mango3 = new Mango(650,460);
	mango4 = new Mango(600,360);

	chain = new Chain(stone.body,{x:58,y:615})

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("grey");

	image(boyImg, 30, 580, 150, 150);

	ground.display();
	tree.display();
	stone.display();

	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();

	chain.display();

	detectCollision(stone,mango1);
	detectCollision(stone,mango2);
	detectCollision(stone,mango3);
	detectCollision(stone,mango4);
 
}

function keyPressed(){
	if (keyCode === 114){
		Matter.Body.setPosition(stone.body, {x:235, y:420})
	}
}

function mouseDragged(){
    Matter.Body.setPosition(stone.body,{x: mouseX, y: mouseY});
}

function mouseReleased(){
    chain.fly()
}

function detectCollision(lstone, lmango){
	var mangopos = lmango.body.position;
	var stonepos = lstone.body.position;

	var distance = dist(stonepos.x, stonepos.y, mangopos.x, mangopos.y);

	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body, false);
	}
}