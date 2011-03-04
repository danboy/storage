var Sprout = function(canvas){
  var soil = Raphael(canvas,600,1200);
  var stalk = soil.path(this.randomPath(5,9))
  stalk.attr({stroke: "#000000",'stroke-width': 2});
}
Sprout.prototype = {
randomPath: function() {
  var path = "M 400 0";
  x = 10;
  y = 0;
  for (var i = 0; i < 10; i++) {
    rand = Math.round(Math.random() * 20);
    if (i) {
      path += "C" + [x + 10, (y += 20) - 10, x, y, (x= 20 - rand), y];
    }
  }
  return path;
  }
}
