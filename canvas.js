var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
// c.fillStyle = 'rgba(255,0,0,0.5)';// c.fillRect(100,100,100,100);// c.fillStyle = 'rgba(0,255,0,0.5)';// c.fillRect(200,100,100,100);
// console.log(canvas);

//line
//  c.beginPath();// c.moveTo(100,100);// c.lineTo(200,200);// c.strokeStyle = "red";// c.stroke();

//arc/circle
// c.beginPath();// c.strokeStyle = "black";// c.arc(300,300,30,0, Math.PI * 2, false);// c.stroke();
// for(var i=0; i<20; i++){
//     var x = Math.random() * window.innerWidth;//     var y = Math.random() * window.innerHeight;
//     let color = ["red","blue","green","black","yellow"];//     c.beginPath();//     c.strokeStyle = color[i+2 % 4];//     c.arc(x,y,30,0, Math.PI * 2, false);//     c.stroke();
// }

// var x = Math.random() * innerWidth;// var y = Math.random() * innerHeight;// var dx = (Math.random() - 0.5) * 8 ;// var dy = (Math.random() - 0.5) * 8;// var radius = 30;
var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 100;
var minRadius = 2;

var colorArray = [
  "#a44464",
  "#7f6ff0",
  "#6dd3ce",
  "#ffa1f8",
  "#c8e9a0"
];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.dx = dx;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function() {
    c.beginPath();
    c.strokeStyle = "red";
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];

    c.fillStyle = this.color;
    c.stroke();
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //inneractivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}


var circleArray = [];

function init() {

  circleArray = [];
  
  for (var i = 0; i < 900; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 6;
    var dy = (Math.random() - 0.5) * 6;
    var radius = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
    // var circle = new Circle(200,200,6,8,30);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  // circle.update();
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
