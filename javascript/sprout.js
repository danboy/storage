var Sprout = function(canvas){
  var soil = Raphael(canvas,200,400);
  var stalk = soil.path(this.randomPath(5,9))
  stalk.attr({stroke: "#000000",'stroke-width': 2});
}
Sprout.prototype = {
randomPath: function() {
  var path = "M 50 0";
  x = 10;
  y = 0;
  for (var i = 0; i < 10; i++) {
    rand = Math.round(Math.random() * 200);
    if (i) {
      path += "C" + [x + 10, (y += 20) - 10, x, y, (x= 20 - rand), y];
    }
  }
  return path;
  }
}
//m 0,0 c 0,0 294.28571,62.85714 197.14285,288.57143
