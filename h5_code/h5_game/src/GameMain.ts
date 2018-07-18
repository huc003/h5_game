/**
 * 游戏主界面
 */
class GameMain extends egret.Sprite{
	public constructor() {
		super();
	}

	public init(){
		var main = new egret.Sprite();
        main.width = this.stage.width;
        main.height = this.stage.height;
        main.name='main_sprite';
        main.graphics.beginFill(0xffffff);
        main.graphics.drawRect(0,0,main.width,main.height);
        main.graphics.endFill();
        this.addChild(main);

        var back:eui.Button = new eui.Button();
        back.label='游戏结束返回';
        back.width=200;
        back.height=50;
        main.addChild(back);

        back.x = (this.stage.width-back.width)/2;
        back.y = (this.stage.height-back.height)/2-200;
        back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameOver,this);
	}

	/**
     * 游戏结束
     */
    private gameOver(e:egret.TouchEvent){
        this.removeChild(this.getChildByName("main_sprite"));
    }

}