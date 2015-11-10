# JsTools

一些零散的JS小工具

##asyncFunc
管理异步函数的执行，降低多层异步函数及大量异步函数执行时的复杂度。

*用事件监听触发的机制代替异步函数的回调关系，简化多层异步函数的逻辑。

var evtFile = eventclass();
evtFile.listen("getFile", function(data, id){
  /*
    data: 事件触发时给的参数，有且只有一个
    id: 第几次触发。
  */
  //body...
});
