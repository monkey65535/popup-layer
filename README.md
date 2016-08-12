# popup-layer
一个简单的弹出层插件，使用面向对象的写法，完全使用原生JS实现，无需任何依赖。

### 使用
`clone` 本项目到本地,然后引入 `popup-layer` 的CSS和JS。

### 调用：
````
var pop = new PopupLayer({
    title : String,
    content : String,
    choose : Boolean,
    fnSucc : Function,
    fnFail : Function
});

````
### 参数：
`title`(String):字符串，输出大标题

`content`(String):字符串，输入内容

`choose`(Boolean)：布尔值，如果为`true`，那么是两个按钮，会调用下方的回调函数，如果为`false`，那么只有一个按钮。

`fnSucc`(Function):回调函数,如果choose值为true，启用这个回调函数。必须传入一个参数，这个参数的值是字符串`true`。

`fnFail`(Function):回调函数,如果choose值为true，启用这个回调函数。必须传入一个参数，这个参数的值是字符串`false`。


### 问题1  面向对象中的this
在构造函数中，this一般指向他的构造函数，但是如果把它的`prtotype`修改为一个对象的时候，就会被修改为`Object`，这时候需要修改他的`construct`改为构造函数本身才行。
### 问题2  如何返会true和false
在实例化的时候，参数中设置两个回调函数，一个成功的回调函数和失败的回调函数。他们的参数就是`true`和`false`。然后点击成功的时候执行`fnSucc`中的内容，如果失败，就调用`fnFail`中的内容


