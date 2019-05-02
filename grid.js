///grid
var svgElement = "http://www.w3.org/2000/svg";
var Gap = 20, mass = 100, o1 = 0.05, o2 = 0.1 // o1&2 offset weight
var bX = [o1,o2,o2,o2,o1], bY = [o1,o2,o2,o2,o1];
var color = 'rgba(150,10,0,0.35)', width = 1.5, linesX = [], linesY = [];

function Line(){ //just creates an svg line element, no attributes given.
this.svg = document.createElementNS(svgElement, 'path');
universe.appendChild(this.svg);
}

Line.prototype.atts = function(arr){
for (var key in arr){
    this.svg.setAttribute(key, arr[key]);
}
}

Line.prototype.bend = function(isX,max,m,n,a,a2,arr,arr2){
var pathArr = this.svg.getAttribute('d').split(' ');
if (Math.abs(pathArr[a]-m) < max && m !== null){
  void(m < parseInt(pathArr[a]) && (max *= -1));
  var diff = max+(parseInt(pathArr[a])-m);
  for (var i = 0; i < arr[0].length; i++){//update arch points
    pathArr[arr[0][i]] = (parseInt(pathArr[a])-diff*arr[1][i]).toString();
  }
}
else if (pathArr[a] !== pathArr[a2]){//update old arcs out of range to straight
  for (var i = 0; i < arr[0].length; i++){
    pathArr[arr[0][i]] = (parseInt(pathArr[a])).toString();
  }
}
for (var i = 0; i < arr2.length; i++){//center oposite axi points
  pathArr[arr2[i]] = (n+(-100+(i*20))).toString();
}
pathArr = pathArr.join(' ');
this.atts({ 'd' : pathArr })
}

var buildLines; (buildLines = function(){
var uX = window.innerWidth, uY = window.innerHeight;
for (var i = 0; i < window.innerWidth/Gap+1; i++){
  linesX[i] = new Line(), x = i*Gap, x1 = x-mass, x2 = x-mass*2;
  linesX[i].atts({
    d : "M "+x+" 0 Q "+x+" 50 "+x+" 100"+" Q "+x+" 150 "+x1+" 200"+" Q "+x2+" 250 "+x2+
        " 300"+" Q "+x2+" 350 "+x1+" 400"+" Q "+x+" 450 "+x+" 500"+" T "+x+" "+(uY),
    stroke : color, 'stroke-width' : width, fill : 'none'
  });
}
for (var i = 0; i < uY/Gap+1; i++){
  linesY[i] = new Line(), y = i*Gap, y1 = y-mass, y2 = y-mass*2;
  linesY[i].atts({
    d : "M 0 "+y+" Q 50 "+y+" 100 "+y+" Q 150 "+y+" 200 "+y1+" Q 250 "+y2+" 300 "+y2+
        " Q 350 "+y2+" 400 "+y1+" Q 450 "+y+" 500 "+y+" T "+uX+" "+y,
    stroke : color, 'stroke-width' : width, fill : 'none'
  });
}
})();

var mouseTrack; (mouseTrack = function(e){
// e ? (x = e.clientX, y = e.clientY) : (x = null, y = null);
linesX.forEach(function(index){
  index.bend(true,mass,x,y,1,8,[[11,14,16,19,21],bX],[5,7,10,12,15,17,20,22,25,27]);
})
linesY.forEach(function(index){
  index.bend(false,mass,y,x,2,9,[[12,15,17,20,22],bY],[4,6,9,11,14,16,19,21,24,26]);
})
})();

document.onmouseleave = function(e) { mouseTrack(false); }
window.onresize = function(event) {
  while(universe.firstChild){ universe.removeChild(universe.firstChild); }
  buildLines(); mouseTrack(false);
};
