function init(){
   canvas=document.getElementById("mycanvas");
    H=canvas.height=1000;
    W=canvas.width=1000;
    game_over=false;
    cs=67;
    food=getRandomFood();
    score=5;
    pen=canvas.getContext('2d');


    // creat a Image object for food
    food_img=new Image();
    food_img.src="Assets/apple.png";

    trophy=new Image();
    trophy.src="Assets/trophy.png"
    snake={
    init_len:5,
    colour:"blue",
    cells:[],
    direction:"right",
    createSnake: function(){
        for(var i=this.init_len;i>0;i--){

            this.cells.push({x:i,y:0});
        }
    },
    drawSnake: function(){
        for(var i=0;i<this.init_len;i++){
            pen.fillStyle=this.colour;
             pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
    },
    updateSnake: function(){
        console.log("updating Snake according to the direction property");
        // poping out the last cell of the array (first in terms of x and y cordinates)
        // if the snake has eaten the food then length+1 and generate new food
        var headX=this.cells[0].x;
        var headY=this.cells[0].y;
        if(headX==food.x && headY==food.y){
            console.log("food eaten");
            food=getRandomFood();
            score++;
        } 
        else{
             this.cells.pop();
        }
        
        var nextX,nextY;
        if(this.direction=="right"){
            nextX=headX+1;
            nextY=headY
        }
        else if(this.direction=="left"){
            nextX=headX-1;
            nextY=headY;
        } else if(this.direction=="up"){
            nextX=headX;
            nextY=headY-1;
        }
        else if(this.direction=="down"){
            nextX=headX;
            nextY=headY+1;
        }
        
        this.cells.unshift({x:nextX,y:nextY});
        // write a logic that prevent the snake to go out
        var last_x=Math.round(W/cs);
        var last_y=Math.round(H/cs);
        if(this.cells[0].y<0 || this.cells[0].x<0  || this.cells[0].x>last_x || this.cells[0].y>last_y){
            game_over=true;
        }

    },

  };
  snake.createSnake();
  // Add a Event Listener on the Document Object
  function keyPressed(e){
    // conditional Statements
    if(e.key=="ArrowRight"){
        snake.direction="right";
    }
    else if(e.key=="ArrowLeft"){
        snake.direction="left";
    }
    else if(e.key=="ArrowDown"){
        snake.direction="down";
    }
    else if(e.key=="ArrowUp"){
        snake.direction="up";
    }
    console.log(snake.direction);
  }
  document.addEventListener('keydown',keyPressed);

}
function draw(){
    // every time you draw new snake erase the old frame

    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle="blue";
    pen.font="25px Roboto";
    pen.fillText(score,50,50);
   

}   


function update(){
    snake.updateSnake();
}
function getRandomFood(){
    var foodX=Math.round(Math.random()*((W-cs)/cs));
    var foodY=Math.round(Math.random()*((H-cs)/cs));
    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}
function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("game over");
    }
    draw();
    update();   
}
init();
console.log("fd");
var f=setInterval(gameloop,100);
