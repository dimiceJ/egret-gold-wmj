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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'src/Game/SceneBeginSkin.exml';
        _this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.startFn, _this);
        _this.help_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.helpFn, _this);
        _this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.backFn, _this);
        return _this;
    }
    SceneBegin.Shared = function () {
        if (SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    // 开始按钮
    SceneBegin.prototype.startFn = function () {
        this.parent.addChild(Game.Shared());
        this.parent.removeChild(this);
    };
    // 返回按钮
    SceneBegin.prototype.backFn = function () {
        console.log('back');
        this.back_btn.visible = false;
        this.start_btn.visible = true;
        this.help_btn.visible = true;
        this.help_panel.visible = false;
    };
    // 帮助按钮
    SceneBegin.prototype.helpFn = function () {
        console.log('help');
        this.back_btn.visible = true;
        this.start_btn.visible = false;
        this.help_btn.visible = false;
        this.help_panel.visible = true;
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin");
