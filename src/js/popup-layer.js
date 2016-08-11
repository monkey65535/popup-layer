/**
 * Created by Artoria on 2016/8/11 0011.
 */

function PopupLayer(popJson) {
    if (!popJson || Object.prototype.toString.call(popJson) !== "[object Object]") {
        console.log("请传入正确参数");
        return;
    }
    var setting = {
        title: "这是一个title",
        content: "",
        choose: false
    };
    this.config = extened(setting, popJson);
    this.return = null;
    this.rand = false;
}
PopupLayer.prototype = {
    construct: PopupLayer,
    rander: function () {
        var body = document.querySelector("body");
        //创建背景
        var randerDom = document.createElement("div");
        randerDom.className = "g-popbg-mask";
        //创建popup-content
        var popCon = document.createElement("div");
        popCon.className = "popup-content move-animate";
        randerDom.appendChild(popCon);
        //创建内容
        var title = document.createElement("h4");
        title.className = "pop-title";
        title.innerHTML = this.config.title;
        //创建文案
        var text = document.createElement("p");
        text.className = "pop-text";
        text.innerHTML = this.config.content;
        //创建按钮
        var btnCon = document.createElement("div");
        btnCon.className = "pop-btns sure";
        btnCon.innerHTML = "";
        if (this.config.choose) {
            btnCon.innerHTML = '<button class="pop-button" data-bool="true">确认</button><button class="pop-button" data-bool="false">取消</button>';
        } else {
            btnCon.innerHTML = '<button>确认</button>';
        }
        var arr = [];
        arr.push(title, text, btnCon);
        arr.forEach(function (ele) {
            popCon.appendChild(ele);
        });
        body.appendChild(randerDom);
        this.rand = true;
        this.return = null;
    },
    active: function () {
        var _this = this;
        if (this.rand) {
            var body = document.querySelector("body");
            var randerBg = document.querySelector(".g-popbg-mask");
            var popCon = randerBg.querySelector(".popup-content");
            var btnCon = popCon.querySelector(".g-popbg-mask .popup-content .pop-btns");
            var btns = btnCon.children;
            if (this.config.choose) {
                //这个时候是两个按钮，点击要输出true或者false值
                for(var i=0;i<btns.length;i++){
                    btns[i].addEventListener('click',function () {
                        removeClass(popCon, "move-animate");
                        addClass(popCon, "leave-animate");
                        addClass(popCon,"block-animate");
                        _this.return = this.dataset.bool;
                        setTimeout(function () {
                            //动画完成之后删除这个节点
                            body.removeChild(randerBg);
                        }, 250);
                        //修改this.rand属性
                        _this.rand = false;
                        return _this.return;
                    });
                }
            } else {
                //这个时候是一个按钮，直接关闭就可以了
                for (var i = 0; i < btns.length; i++) {
                    btns[i].addEventListener('click', function () {
                        /*popCon.className += " leave-animate";*/
                        removeClass(popCon, "move-animate");
                        addClass(popCon, "leave-animate");
                        addClass(popCon,"block-animate");
                        setTimeout(function () {
                            //动画完成之后删除这个节点
                            body.removeChild(randerBg);
                        }, 250);
                        //修改this.rand属性
                        _this.rand = false;
                    });
                }
            }
        } else {
            return;
        }
    }
};
//深度继承
function extened(setting, obj) {
    var toString = Object.prototype.toString;
    if (obj && setting && toString.call(obj) === toString.call(setting)) {
        //判断obj的数据类型
        var json = toString.call(obj) === "[object Object]" ? {} : [];
        //先遍历obj，然后复值给setting
        for (var attr in obj) {
            if (toString.call(obj[attr]) === "[object Object]" || toString.call(obj[attr]) === "[object Array]") {

                setting[attr] = extened(setting, obj[attr]);
            } else {
                setting[attr] = obj[attr];
            }
        }
        //在遍历setting，把值赋给json
        for (var attr in setting) {
            json[attr] = setting[attr];
        }
        return json;
    }
}
//addClass
function addClass(obj, classN) {
    //console.log(obj);
    if (!obj) {
        return;
    }
    var objClass = obj.className;

    //判断class中是否已经存在这个classN了
    if (objClass.indexOf(classN) != -1) {
        return;
    }
    //判断这个obj是否有class，如果有，需要给classN前面加一个空格
    var newClass = objClass == "" ? classN : " " + classN;
    obj.className = objClass + newClass;
}

//removeClass
function removeClass(obj, classN) {
    var objClass = obj.className;
    if (objClass.indexOf(classN) == -1) {
        return;
    }
    //使用空格分隔字符串
    var classArr = objClass.split(" ");
    //循环数组，然后删除对应的className，在用空格去拼接字符串
    for (var i = 0; i < classArr.length; i++) {
        if (classArr[i] === classN) {
            classArr.splice(i, 1);
            i--;
        }
    }
    obj.className = classArr.join(" ");
}
