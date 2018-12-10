class SceneBegin extends eui.Component {
    // 单例
    public static shared:SceneBegin
    public static Shared(){
        if( SceneBegin.shared == null){
            SceneBegin.shared = new SceneBegin()
        }
        return SceneBegin.shared
    }

    public start_btn: eui.Button
    public help_btn: eui.Button
    public help_panel: eui.Image
    public back_btn: eui.Button
    public btn_group:eui.Group
    public constructor() {
        super()
        this.skinName = 'src/Game/SceneBeginSkin.exml'
       
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startFn,this)
        this.help_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.helpFn,this);
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.backFn,this)
    }

    // 开始按钮
    public startFn(){
        this.parent.addChild(Game.Shared())
        this.parent.removeChild(this)
    }
    // 返回按钮
    public backFn(){
        console.log('back');
        this.back_btn.visible = false
        this.start_btn.visible = true
        this.help_btn.visible = true
        this.help_panel.visible = false
    }

    // 帮助按钮
    public helpFn(){
        console.log('help')
        this.back_btn.visible = true
        this.start_btn.visible = false
        this.help_btn.visible = false
        this.help_panel.visible = true
    }



}