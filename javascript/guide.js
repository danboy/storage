Groupon.getGuide = function(){
  this.db = new Groupon.storage();
}

Groupon.getGuide.prototype = {
  ajaxGet: function(){
    var db = this.db;
    self = this;
    $.ajax({
      url:'http://205.186.166.43:8089/api/core/get_random_post/', 
      dataType: "jsonp", 
      crossDomain: true, 
      success: function(j){
        //console.log(j.posts[0].post_content);
        db.save("guide", j.posts[0]);
        self.drawGuide( db.get("guide") );
      }, 
      failure: function(f){console.log(f)}
    });
  },
  localGet: function(){
    guide = this.db.isStale("guide");
    if (guide == 'no data'){
      this.ajaxGet();
    }else{
      this.drawGuide( guide );
    }
    return ;
  },
  drawGuide: function(guide){
    content = $('<div/>',{
      'class':'groupon_guide',
      text: guide.post_content
    });

    title = $('<h2/>',{
      'class':'groupon_guide_title',
      text: guide.post_title
    });
    $('#sprout').append(title,content)
    return guide;
  }
}
g = new Groupon.getGuide();
d = g.localGet();
