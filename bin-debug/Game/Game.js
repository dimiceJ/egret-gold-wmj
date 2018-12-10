var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.count = 60;
        _this.timeT = new egret.Timer(1000, 60); /*60秒倒计时*/
        _this.timer = new egret.Timer(1000); /*下红包的计时*/
        console.log('start');
        _this.skinName = 'src/Game/GameSkin.exml';
        _this.complete();
        var self = _this;
        _this.kb = new KeyBoard();
        //添加监听事件
        _this.kb.addEventListener(KeyBoard.onkeydown, _this.onkeydown, _this);
        _this.score_num.text = '0';
        return _this;
        //移除事件监听
        //kb.removeEventListener(KeyBoard.onkeydown,this.onkeydown,this);
    }
    Game.Shared = function () {
        if (Game.shared == null) {
            Game.shared = new Game();
        }
        return Game.shared;
    };
    Game.prototype.complete = function () {
        // //创建一个计时器对象
        var that = this;
        this.timeT.addEventListener(egret.TimerEvent.TIMER, this.timeTFunc, this);
        this.timeT.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerTStop, this);
        this.time_label.text = '' + this.count;
        this.timeT.start();
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        // 开始计时
        this.timer.start();
        this.gold_arr = [];
    };
    Game.prototype.timeTFunc = function () {
        this.count--;
        this.time_label.text = '' + this.count;
    };
    Game.prototype.timerTStop = function () {
        this.timer.stop();
        this.time_label.text = '时间到';
    };
    Game.prototype.timeCount = function () {
    };
    Game.prototype.hitTestP = function (obj1, obj2) {
        var rect1 = obj1.getBounds(); //获取显示对象的测量边界
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);
    };
    Game.prototype.timerFunc = function () {
        var gold_icon = new gold();
        var that = this;
        this.com_group.addChild(gold_icon);
        gold_icon.y = 0;
        gold_icon.x = Math.floor((this.stage.width - gold_icon.width) * Math.random() - gold_icon.width);
        // gold y轴运动计时
        var timer = new egret.Timer(500, 5);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        var twGold = egret.Tween.get(gold_icon);
        // twGold.to({ y: that.stage.height }, 3000).call(this.gold_complete);
        egret.Tween.get(gold_icon, { onChange: funcChange, onChangeObj: gold_icon })
            .to({ y: that.stage.height }, 3000);
        function funcChange() {
            // console.log(this)
            var testB = that.hitTestP(gold_icon, that.basket);
            if (testB) {
                // this.parent.removeChild(this)
                // that.com_group.removeChild(gold_icon);
                gold_icon.x = 1000;
                gold_icon.y = 1000;
                console.log(gold_icon.parent);
                that.score_num.text = parseInt(that.score_num.text) + 1 + '';
                // console.log(that.score_num.text+1)
            }
        }
    };
    // 掉落到最底部的执行
    Game.prototype.gold_complete = function () {
        console.log(this);
        this.parent.removeChild(this);
    };
    Game.prototype.timerComFunc = function () {
    };
    // 按键事件
    Game.prototype.onkeydown = function (event) {
        //获取的按键数据为一个数组
        // console.log(this.basket.x);
        if (this.count == 0) {
            return;
        }
        if (event.data == 'left') {
            if (this.basket.x <= 0) {
                return;
            }
            this.basket.x = this.basket.x - 30;
        }
        else if (event.data == 'right') {
            if (this.basket.x >= 720 - this.basket.width) {
                console.log('大于720');
                return;
            }
            this.basket.x = this.basket.x + 30;
        }
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game");
