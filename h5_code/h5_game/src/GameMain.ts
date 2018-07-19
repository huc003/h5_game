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

		var button:egret.Sprite = new egret.Sprite();
		button.graphics.beginFill(0x52B4F2);
		button.graphics.drawRect(0,this.stage.height-100,20,100);
		button.graphics.endFill();
		button.width=20;
		button.height=100;
		button.name = 'button';
		this.addChild(button);

        //棍子变长
		this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,start,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,end,this);

		function start(e:egret.TouchEvent):void{
			this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onStick, this); 
		}

		function end(e:egret.TouchEvent):void{
			this.stage.removeEventListener(egret.Event.ENTER_FRAME,this.onStick,this);
			this.onStickDirection();
		}


        //柱子
	}

	/**
	 * 改变棍子的长度
	 */
	private onStick(e:egret.TouchEvent){
		console.log('棍子长度 --> '+(this.getChildByName('button').height+3));
		var height = this.getChildByName('button').height+3;
		this.removeChild(this.getChildByName('button'));
		var b:egret.Sprite = new egret.Sprite();
		b.graphics.beginFill(0x52B4F2);
		b.graphics.drawRect(0,this.stage.height-height,20,height);
		b.graphics.endFill();
		b.name = 'button';
		this.addChild(b);
	}

	/**
	 * 改变棍子方向
	 */
	private onStickDirection(e:egret.TouchEvent):void{
		
		console.log('改变棍子方向');
		var b = this.getChildByName('button');
		// b.width = b.height;
		// b.height = b.width;
		// egret.Tween.get( b ).to({x:0}, 300, egret.Ease.sineIn )
		// .call( ()=>{ b.rotation = -10 ;  } ).wait( 200 );
		// this.addEventListener(egret.Event.ENTER_FRAME,()=>{
		// 	// console.log('img.rotation = '+img.rotation);
		// 	b.rotation -= 3;
		// },this);
		console.log(this.stage.height);
		// b.anchorOffsetX=0;
		// b.anchorOffsetY=800;
		// b.skewX=0;
		// b.skewY=180;
		b.anchorOffsetX =0;
        b.anchorOffsetY = 0;
        b.x = 0;
        b.y = 960;
		console.log(b.anchorOffsetX);
		console.log(b.anchorOffsetY);
		console.log(b.x);
		console.log(b.y);
		b.touchEnabled = false;
		// egret.Tween.get(b,{loop:true}).
        // to({rotation:3},2000,egret.Ease.sineIn);
		//白鹭小鸟不停旋转
        this.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
            b.rotation += 3;
        }, this ); 

	}

	/**
     * 游戏结束
     */
    private gameOver(e:egret.TouchEvent){
        // this.removeChild(this.getChildByName("main_sprite"));
		// this.removeChild(this.getChildByName("button"));
		this.removeChildren();
    }

}