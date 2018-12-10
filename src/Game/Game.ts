
class Game extends eui.Component {
    public static shared: Game
    public static Shared() {
        if (Game.shared == null) {
            Game.shared = new Game()
        }
        return Game.shared
    }


    private com_group: eui.Group
    public time_label: eui.Label;
    private score_num: eui.Label
    // 篮子
    public basket: eui.Image;
    public count: number = 60;
    public timeT: egret.Timer = new egret.Timer(1000, 60)   /*60秒倒计时*/
    public timer: egret.Timer = new egret.Timer(1000);      /*下红包的计时*/
    // 键盘插件
    private kb: KeyBoard;
    private gold_arr: Array<any>;

    public constructor() {
        super()
        console.log('start')
        this.skinName = 'src/Game/GameSkin.exml'
        this.complete();
        var self = this;

        this.kb = new KeyBoard();
        //添加监听事件
        this.kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
        this.score_num.text = '0'
        //移除事件监听
        //kb.removeEventListener(KeyBoard.onkeydown,this.onkeydown,this);
    }

    public complete() {
        // //创建一个计时器对象
        var that = this;
        this.timeT.addEventListener(egret.TimerEvent.TIMER, this.timeTFunc, this);
        this.timeT.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerTStop, this);
        this.time_label.text = '' + this.count
        this.timeT.start()
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        // 开始计时
        this.timer.start();
        this.gold_arr = []

    }


    public timeTFunc() {
        this.count--
        this.time_label.text = '' + this.count
    }

    public timerTStop() {
        this.timer.stop()
        this.time_label.text = '时间到'
    }

    public timeCount() {

    }



    public hitTestP(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界
        var rect2: egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);
    }


    public timerFunc() {
        var gold_icon = new gold();
        var that = this;
        this.com_group.addChild(gold_icon);
        gold_icon.y = 0;
        gold_icon.x = Math.floor((this.stage.width - gold_icon.width) * Math.random() - gold_icon.width);
        // gold y轴运动计时
        var timer: egret.Timer = new egret.Timer(500, 5);
        //注册事件侦听器
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        var twGold = egret.Tween.get(gold_icon);
        // twGold.to({ y: that.stage.height }, 3000).call(this.gold_complete);
        egret.Tween.get(gold_icon, { onChange: funcChange, onChangeObj: gold_icon })
            .to({ y: that.stage.height }, 3000);
            
        function funcChange() {
            // console.log(this)
            
            var testB = that.hitTestP(gold_icon, that.basket)
            
            if (testB) {
                // this.parent.removeChild(this)
                // that.com_group.removeChild(gold_icon);
                gold_icon.x = 1000;
                gold_icon.y = 1000;
                
                console.log(gold_icon.parent)
                that.score_num.text = parseInt(that.score_num.text) + 1 + ''
                // console.log(that.score_num.text+1)
            }
        }
    }





    // 掉落到最底部的执行
    public gold_complete() {
        console.log(this)
        this.parent.removeChild(this)
    }

    public timerComFunc() {

    }

    // 按键事件
    private onkeydown(event) {
        //获取的按键数据为一个数组
        // console.log(this.basket.x);

        if (this.count == 0) {
            return
        }

        if (event.data == 'left') {
            if (this.basket.x <= 0) {
                return
            }
            this.basket.x = this.basket.x - 30

        } else if (event.data == 'right') {
            if (this.basket.x >= 720 - this.basket.width) {
                console.log('大于720')
                return
            }
            this.basket.x = this.basket.x + 30;
        }

    }

}