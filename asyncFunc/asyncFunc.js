~(function(global, undefined){
  'use strict';
  var EventClass = function () {
    this.queue = {};
  };
  EventClass.prototype.listen = function(eventName, callback){
    var list = this.queue[eventName];
    if(!list){
      list = this.queue[eventName] = [];
    }
    list.push(callback);
    return this;
  };
  EventClass.prototype.trigger = function(eventName, data){
    var list = this.queue[eventName];
    if(!list){
      list = this.queue[eventName] = [];
    }
    list.triggerId = (list.triggerId || 0) + 1;
    for(var i=0;i<list.length;i++){
      list[i].call(this, data, list.triggerId);
    }
    return this;
  };
  EventClass.prototype.fnQueue = function(len){
    len = len || 1;//同时运行几个线程
    var funs = []//线程队列
        ,runs = 0//当前运行的线程数
        ;
    return {
      push: function(fn){
        funs.push(fn);
        this.run();
      },
      run: function(){
        if(runs<len && funs.length){
          funs.shift()(this);
          runs++;
        }
      },
      end: function(){
        runs--;
        this.run();
      }
    };
  };
  global.eventclass = function(){
    return new EventClass();
  };
})(window, undefined)
