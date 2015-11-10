# JsTools

一些零散的JS小工具

## asyncFunc
管理异步函数的执行，降低多层异步函数及大量异步函数执行时的复杂度。

##### 用事件监听触发的机制代替异步函数的回调关系，简化多层异步函数的逻辑。
* `eventclass()` 获取一个控制器实例
* `listen` 监听事件
* `trigger` 触发事件
* `fnQueue` 函数队列控制器

```javascript
var evtFile = eventclass()//获取一个控制器实例
, fileQueue = evtFile.fnQueue(3); //初始化一个队列管理器，3 代表同时最多执行3个异步函数，不传默认为 1。

//监听一个事件，事件名为getFile。
evtFile.listen("getFile", function(data, id){
  /*
    data: 事件触发时给的参数，有且只有一个
    id: 第几次触发。
  */
  //body...
});

//给队列管理器添加一个异步任务
fileQueue.push(function(queue){//queue为队列管理器对象
  //geturl代表一个异步获取文件的函数。
  geturl("fileurl", function(data){
    evtFile.trigger("getFile", data);//异步执行完成后，触发getFile事件
    queue.end();//通知队列管理器当前任务完成。
  });
});
```
