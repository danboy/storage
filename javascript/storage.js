if (typeof Groupon == 'undefined') {
  Groupon = {};
};

if (typeof Groupon.storage == 'undefined') {
  Groupon.storage = {};
};
Groupon.storage = function(){
  return true;
};
Groupon.storage.prototype = {
  supported: function(){
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  },
  get: function(key){
    
    if (this.supported()){
      return JSON.parse(localStorage.getItem(key));
    }

  },
  save: function(key,data){
    if(!this.supported){return;};
    if(typeof(data) == "object"){
      data.updated_at = new Date();
      data = JSON.stringify(data)
    }
    localStorage.setItem(key,data);
    return key;
  },
  isStale: function(key){
    data = this.get(key);
    updated_at = new Date(data.updated_at);
    updated_at.setDate(updated_at.getDate()+1)
    current_date = new Date();
    if (updated_at < current_date){
      console.log('date is stale',(updated_at.getDate()+1));
      this.ajaxGet();
    }else{
      console.log('date is fresh');
      return data;
    }
  }
};

Groupon.getGuide = function(){
  this.db = new Groupon.storage();
}

Groupon.getGuide.prototype = {
  ajaxGet: function(){
    var db = this.db;
    $.ajax({
      url:'http://205.186.166.43:8089/api/core/get_random_post/', 
      dataType: "jsonp", 
      crossDomain: true, 
      success: function(j){
        db.save("guide", j.posts[0]);
        return db.get("guide");
      }, 
      failure: function(f){console.log(f)}
    });
  },
  localGet: function(){
    guide = this.db.isStale("guide");
    updated_at = new Date(guide.updated_at);
    updated_at.setDate(updated_at.getDate()+1)
    current_date = new Date();
    if (updated_at < current_date){
      console.log('date is stale',(updated_at.getDate()+1));
      this.ajaxGet();
    }else{
      console.log('date is fresh');
      return guide;
    }
  }
}
