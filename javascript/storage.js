if (typeof Groupon == 'undefined') {
  Groupon = {};
};

if (typeof Groupon.storage == 'undefined') {
  Groupon.storage = {};
};
Groupon.storage = function(){

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
      console.log(key);
      localStorage.getItem(key);
    }

  },
  save: function(key,data){
    if(!this.supported){return;};
    if(typeof(data) == "object"){
      data = JSON.stringify(data)
    }
    localStorage.setItem(key,data);
    return key;
  },
  delete: function(key){

  }
};
